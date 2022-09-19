import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Preview } from "./Preview";
import { useFileBuffer } from "../hooks/LocalCache";

interface IFileItemProps {
    name: string;
}

const FileItemLayout = styled.div`
  width: 92px;
  height: 120px;
  padding: 24px;
  background-clip: content-box;
  cursor: pointer;
`;

const FileName = styled.div`
  text-align: center;
  width: 100%;
  font-style: oblique;
  font-weight: bold;
  color: #fff;
  font-size: 14px;
`;

const StyledPreview = styled(Preview)`
  background: aliceblue;
`;

const StyledLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export function FileItem(props: IFileItemProps) {

    const fileBuffer = useFileBuffer(props.name);

    return (
        <FileItemLayout>
            <StyledLink to={`/meta-viewer/${props.name}`}>
                <StyledPreview src={fileBuffer} playback={"svg"} />
                <FileName>
                    {props.name.replace(".wmf", "")}
                </FileName>
            </StyledLink>
        </FileItemLayout>
    );
}
