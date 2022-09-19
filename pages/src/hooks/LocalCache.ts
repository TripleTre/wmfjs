import localForage from "localforage";
import { useEffect, useState } from "react";

export const cache = localForage.createInstance({
    name: "wmfjs",
    storeName: "files",
    driver: localForage.INDEXEDDB,
    version: 1,
});

export interface FileData {
    name: string;
    buffer: ArrayBuffer;
}

export function putCachedFile(file: FileData): Promise<ArrayBuffer> {
    return cache.setItem(file.name, file.buffer);
}

export function useFileBuffer(fileName: string): ArrayBuffer {
    const [buf, setBuf] = useState(new ArrayBuffer(0));

    useEffect(() => {
        cache.getItem<ArrayBuffer>(fileName).then((buf) => {
            if (buf) {
                setBuf(buf);
            }
        });
    }, [fileName]);

    return buf;
}

export async function getFileList(): Promise<FileData[]> {
    const fileNames = await cache.keys();
    const files = [];
    for (const name of fileNames) {
        const buf = await cache.getItem<ArrayBuffer>(name);
        if (buf) {
            files.push({
                name,
                buffer: buf,
            });
        }
    }
    return files;
}

export function useFileList(updateId: number): FileData[] {
    const [files, setFiles] = useState<FileData[]>([]);

    useEffect(() => {
        getFileList().then(files => {
            setFiles(files)
        });
    }, [updateId]);

    return files;
}
