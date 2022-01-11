import React, { useEffect, useState } from "react";
import { parser, MetafileType, MetafileVersion, Placeable, Header } from "@wmfjs/core";
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

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 2px 4px;
`;

const Operation = styled.div`
  color: rgb(153, 164, 178);
  cursor: pointer;
  user-select: none;
`;

export function MetaViewer(props: IMetaViewerProps) {
    const [recordsData, setRecordsData] = useState<null>(null);

    useEffect(() => {
        if (props.src.byteLength > 0) {
            console.log(parser(props.src));
            // setRecordsData(parser(props.src));
        }
    }, [props.src.byteLength]);

    return (
        <ViewerLayout>
            {/*<Header>*/}
            {/*    <Operation>[save]</Operation>*/}
            {/*</Header>*/}
            {/*{recordsData?.placeable && <ViewerLine offset={0} header={"WMF Placeable Header"}>*/}
            {/*    <ObjectEditor*/}
            {/*        value={recordsData.placeable}*/}
            {/*        config={{*/}
            {/*            boundingBox: {*/}
            {/*                type: "object", editable: true, config: {*/}
            {/*                    left: {type: "number", editable: true},*/}
            {/*                    top: {type: "number", editable: true},*/}
            {/*                    right: {type: "number", editable: true},*/}
            {/*                    bottom: {type: "number", editable: true},*/}
            {/*                }*/}
            {/*            },*/}
            {/*            checksum: {type: "number", editable: false},*/}
            {/*            inch: {type: "number", editable: true},*/}
            {/*        }}*/}
            {/*        editable={true}*/}
            {/*        onChange={(next: Placeable) => {*/}
            {/*            if (recordsData) {*/}
            {/*                setRecordsData({*/}
            {/*                    ...recordsData,*/}
            {/*                    placeable: next,*/}
            {/*                });*/}
            {/*            }*/}
            {/*        }}*/}
            {/*    />*/}
            {/*</ViewerLine>}*/}
            {/*<ViewerLine offset={recordsData?.placeable ? 22 : 0} header={"WMF Header"}>*/}
            {/*    <ObjectEditor*/}
            {/*        value={recordsData?.header}*/}
            {/*        editable={true}*/}
            {/*        config={{*/}
            {/*            type: {type: "enum", editable: false, enum: MetafileType},*/}
            {/*            version: {type: "enum", editable: false, enum: MetafileVersion},*/}
            {/*            size: {type: "number", editable: false},*/}
            {/*            numberOfObjects: {type: "number", editable: false},*/}
            {/*            maxRecord: {type: "number", editable: false}*/}
            {/*        }}*/}
            {/*        onChange={(next: Header) => {*/}
            {/*            if (recordsData) {*/}
            {/*                setRecordsData({*/}
            {/*                    ...recordsData,*/}
            {/*                    header: next,*/}
            {/*                });*/}
            {/*            }*/}
            {/*        }}*/}
            {/*    />*/}
            {/*</ViewerLine>*/}
            {/*{recordsData?.records.map(record => {*/}
            {/*    let editor = null;*/}
            {/*    const isEscape = record.fn === "META_ESCAPE";*/}
            {/*    const editorCfg = (recordEditorMap as any)[ isEscape ? `${record.fn}_${record.payload.escapeFn}` : record.fn ];*/}
            {/*    if (editorCfg) {*/}
            {/*        editor = React.createElement(editorCfg.component, {*/}
            {/*            ...editorCfg.props(record),*/}
            {/*            onChange: (value: any) => {*/}
            {/*                if (recordsData?.records) {*/}
            {/*                    const index = recordsData.records.findIndex(v => v === record);*/}
            {/*                    if (index >= 0) {*/}
            {/*                        if (record.fn === "META_ESCAPE") {*/}
            {/*                            recordsData.records[ index ] = {*/}
            {/*                                ...record,*/}
            {/*                                payload: {*/}
            {/*                                    ...record.payload,*/}
            {/*                                    escapePayload: value,*/}
            {/*                                },*/}
            {/*                            };*/}
            {/*                        } else {*/}
            {/*                            recordsData.records[ index ] = {*/}
            {/*                                ...record,*/}
            {/*                                payload: value,*/}
            {/*                            };*/}
            {/*                        }*/}
            {/*                        setRecordsData({*/}
            {/*                            placeable: recordsData.placeable,*/}
            {/*                            header: recordsData.header,*/}
            {/*                            records: recordsData.records,*/}
            {/*                        });*/}
            {/*                    }*/}
            {/*                }*/}
            {/*            },*/}
            {/*        });*/}
            {/*    }*/}
            {/*    return (*/}
            {/*        <ViewerLine*/}
            {/*            subHeader={isEscape ? record.payload.escapeFn : undefined}*/}
            {/*            offset={record.offset} key={record.offset} header={record.fn}*/}
            {/*        >*/}
            {/*            {editor}*/}
            {/*        </ViewerLine>*/}
            {/*    )*/}
            {/*})}*/}
        </ViewerLayout>
    )
}
