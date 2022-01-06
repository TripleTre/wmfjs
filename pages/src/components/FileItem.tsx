import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

const Preivew = styled.div`
  background: #fff;
  width: 92px;
  height: 98px;
  border-radius: 9px;
`;

export class FileItem extends React.Component<IFileItemProps, any> {

    public render() {
        const { name } = this.props;
        return (
            <FileItemLayout>
                <Link to={`/meta-viewer/${name}`}>
                    <Preivew />
                    <FileName>
                        {name.replace(".wmf", "")}
                    </FileName>
                </Link>
            </FileItemLayout>
        );
    }
}
