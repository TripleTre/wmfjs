import React, { useEffect, useState } from "react";
import { parser, RecordsData, MetafileType, MetafileVersion } from "@wmfjs/core";
import styled from "styled-components";
import { ObjectEditor } from "./components/ObjectEditor";
import { ViewerLine } from "./components/ViewerLine";
import * as recordEditorMap from "./RecordEditMap";

export interface IMetaViewerProps {
    src: ArrayBuffer;
}

const ViewerLayout = styled.div`
  height: 100vh;
  background: rgb(43, 43, 43);
  overflow-x: scroll;
`;

export function MetaViewer(props: IMetaViewerProps) {
    const [records, setRecords] = useState<RecordsData | null>(null);

    useEffect(() => {
        if (props.src.byteLength > 0) {
            setRecords(parser(props.src));
        }
    }, [props.src.byteLength]);
    console.log(records);
    return (
        <ViewerLayout>
            {records?.placeable && <ViewerLine offset={0} header={"WMF Placeable Header"}>
                <ObjectEditor
                    value={records.placeable}
                    config={{
                        boundingBox: {
                            type: "object", editable: false, config: {
                                left: { type: "number", editable: false },
                                top: { type: "number", editable: false },
                                right: { type: "number", editable: false },
                                bottom: { type: "number", editable: false },
                            }
                        },
                        checksum: { type: "number", editable: false },
                        inch: { type: "number", editable: false },
                    }}
                />
            </ViewerLine>}
            <ViewerLine offset={records?.placeable ? 22 : 0} header={"WMF Header"}>
                <ObjectEditor
                    value={records?.header}
                    config={{
                        type: {type: "enum", editable: false, enum: MetafileType},
                        version: {type: "enum", editable: false, enum: MetafileVersion},
                        size: {type: "number", editable: false},
                        numberOfObjects: {type: "number", editable: false},
                        maxRecord: {type: "number", editable: false}
                    }}
                />
            </ViewerLine>
            {records?.records.map(record => {
                console.log(record.fn);
                console.log(record.payload);
                console.log("   ");
                let editor = null;
                const isEscape = record.fn === "META_ESCAPE";
                const editorCfg = (recordEditorMap as any)[isEscape ? `${record.fn}_${record.payload.escapeFn}` : record.fn];
                if (editorCfg) {
                    editor = React.createElement(editorCfg.component, editorCfg.props(record));
                }
                return (
                    <ViewerLine
                        subHeader={isEscape ? record.payload.escapeFn : undefined}
                        offset={record.offset} key={record.offset} header={record.fn}
                    >
                        {editor}
                    </ViewerLine>
                )
            })}
        </ViewerLayout>
    )
}
