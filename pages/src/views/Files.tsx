import React, { FormEvent, useCallback, useEffect, useState } from "react";
import * as localForage from "localforage";
import styled from "styled-components";
import fileAddPng from "../assets/file-add.png";
import { FileItem } from "../components/FileItem";
import { putCachedFile, useFileList } from "../hooks/LocalCache";

const Layout = styled.div`
  height: 100vh;
  background: rgb(43, 43, 43);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FileGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
  width: 92%;
  height: 88%;
`;

const AddFile = styled.label`
  background: url(${fileAddPng});
  background-size: 36px 36px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  position: absolute;
  bottom: 22px;
  right: 22px;
  outline: none;

  & > input {
    display: none;
  }
`;

const WMFjs = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgb(43, 43, 43);

  & > span:nth-child(1) {
    font-size: 172px;
    font-style: oblique;
    font-weight: bold;
    text-shadow: 0px 2px 0px rgba(255, 255, 255, .3), 0px -2px 0px rgba(0, 0, 0, .7);
  }

  & > span:nth-child(2) {
    font-size: 112px;
    font-style: oblique;
    font-weight: bold;
    text-shadow: 0px 1px 0px rgba(255, 255, 255, .3), 0px -1px 0px rgba(0, 0, 0, .7);
  }
`;

export interface FileData {
    name: string;
    buffer: ArrayBuffer;
}

export interface IFilesState {
    files: FileData[]
}

export function Files() {

    const [updateId, setUpdateId] = useState(0);
    const files = useFileList(updateId);

    const onFileSelected = useCallback((evt: FormEvent<HTMLInputElement>) => {
        const selectedFiles = evt.currentTarget.files || [];
        for (let i = 0, len = selectedFiles.length; i < len; i++) {
            const file = selectedFiles[ i ];
            if (files.some(f => f.name === file.name)) {
                console.warn(`File named ${file.name} already exists`)
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setUpdateId(updateId + 1);
                    putCachedFile({
                        name: file.name,
                        buffer: event.target.result as ArrayBuffer,
                    }).catch(() => {
                        // ignore
                    });
                }
            };
            reader.readAsArrayBuffer(file);
        }
    }, [updateId]);

    return (
        <Layout>
            <FileGroup>
                {files.map(file => <FileItem key={file.name} name={file.name}/>)}
            </FileGroup>
            <WMFjs><span>WMF</span><span>js</span></WMFjs>
            <AddFile htmlFor={"add-file"}>
                <input accept={".wmf"} onChange={onFileSelected} type={"file"} id={"add-file"}/>
            </AddFile>
        </Layout>
    );
}
