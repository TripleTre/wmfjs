import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { parser } from "@wmfjs/core";
import styled from "styled-components";
const ViewerLayout = styled.div `
  height: 100vh;
  background: rgb(43, 43, 43);
  overflow-x: scroll;
`;
const Header = styled.div `
  display: flex;
  justify-content: flex-end;
  margin: 2px 4px;
`;
const Operation = styled.div `
  color: rgb(153, 164, 178);
  cursor: pointer;
  user-select: none;
`;
export function MetaViewer(props) {
    const [recordsData, setRecordsData] = useState(null);
    useEffect(() => {
        if (props.src.byteLength > 0) {
            console.log(parser(props.src));
            // setRecordsData(parser(props.src));
        }
    }, [props.src.byteLength]);
    return (_jsx(ViewerLayout, {}, void 0));
}
