import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useFileBuffer } from "../hooks/LocalCache";
import { Preview } from "../components/Preview";
import { RecordEditor } from "../components/RecordEditor";

const RecordFrame = styled.div`
`;

export function Viewer() {

    const params = useParams<{ fileName: string }>();
    const fileBuffer = useFileBuffer(params.fileName);

    return (
        <RecordFrame>
            <Preview src={fileBuffer} playback={"svg"} />
            <RecordEditor src={fileBuffer} />
        </RecordFrame>
    );
}
