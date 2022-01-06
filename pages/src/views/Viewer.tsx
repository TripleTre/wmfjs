import React from "react";
import { useParams } from "react-router-dom";
import { MetaViewer } from "@wmfjs/meta-viewer";
import styled from "styled-components";
import { useFileBuffer } from "../hooks/LocalCache";

const RecordFrame = styled.div`
`;

export function Viewer() {

    const params = useParams<{ fileName: string }>();
    const fileBuffer = useFileBuffer(params.fileName);

    return (
        <RecordFrame>
            <MetaViewer src={fileBuffer} />
        </RecordFrame>
    );
}
