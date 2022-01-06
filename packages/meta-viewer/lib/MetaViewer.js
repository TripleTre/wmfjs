import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import { parser, MetafileType, MetafileVersion } from "@wmfjs/core";
import styled from "styled-components";
import { ObjectEditor } from "./components/ObjectEditor";
import { ViewerLine } from "./components/ViewerLine";
import * as recordEditorMap from "./RecordEditMap";
const ViewerLayout = styled.div `
  height: 100vh;
  background: rgb(43, 43, 43);
  overflow-x: scroll;
`;
export function MetaViewer(props) {
    const [records, setRecords] = useState(null);
    useEffect(() => {
        if (props.src.byteLength > 0) {
            setRecords(parser(props.src));
        }
    }, [props.src.byteLength]);
    console.log(records);
    return (_jsxs(ViewerLayout, { children: [(records === null || records === void 0 ? void 0 : records.placeable) && _jsx(ViewerLine, Object.assign({ offset: 0, header: "WMF Placeable Header" }, { children: _jsx(ObjectEditor, { value: records.placeable, config: {
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
                    } }, void 0) }), void 0), _jsx(ViewerLine, Object.assign({ offset: (records === null || records === void 0 ? void 0 : records.placeable) ? 22 : 0, header: "WMF Header" }, { children: _jsx(ObjectEditor, { value: records === null || records === void 0 ? void 0 : records.header, config: {
                        type: { type: "enum", editable: false, enum: MetafileType },
                        version: { type: "enum", editable: false, enum: MetafileVersion },
                        size: { type: "number", editable: false },
                        numberOfObjects: { type: "number", editable: false },
                        maxRecord: { type: "number", editable: false }
                    } }, void 0) }), void 0), records === null || records === void 0 ? void 0 : records.records.map(record => {
                console.log(record.fn);
                console.log(record.payload);
                console.log("   ");
                let editor = null;
                const isEscape = record.fn === "META_ESCAPE";
                const editorCfg = recordEditorMap[isEscape ? `${record.fn}_${record.payload.escapeFn}` : record.fn];
                if (editorCfg) {
                    editor = React.createElement(editorCfg.component, editorCfg.props(record));
                }
                return (_jsx(ViewerLine, Object.assign({ subHeader: isEscape ? record.payload.escapeFn : undefined, offset: record.offset, header: record.fn }, { children: editor }), record.offset));
            })] }, void 0));
}
