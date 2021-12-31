import path from "path";
import { readFile } from "fs/promises";

const assetsRoot = path.resolve(__dirname, "./assets");

export type TEXT_FILE_NAME =
    "empty" | "shape";

export function nodeBuf2ArrayBuffer(buf: Buffer) {
    const ab = new ArrayBuffer(buf.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}

export async function loadWMFFile(name: TEXT_FILE_NAME) {
    const buf = await readFile(path.resolve(assetsRoot, `${name}.wmf`));
    return nodeBuf2ArrayBuffer(buf);
}
