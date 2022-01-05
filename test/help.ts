import path from "path";
import { readFile, readdir } from "fs/promises";
import * as buffer from "buffer";

const assetsRoot = path.resolve(__dirname, "./assets");

export function nodeBuf2ArrayBuffer(buf: Buffer) {
    const ab = new ArrayBuffer(buf.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}

export async function loadWMFFile(name?: string): Promise<[string, ArrayBuffer][]> {
    const files = await readdir(assetsRoot);
    let wmfFiles = files.filter(f => /wmf$/.test(f)).map(v => v.replace(".wmf", ""));
    const result: [string, ArrayBuffer][] = [];
    if (name) {
        wmfFiles = [name];
    }
    for (const file of wmfFiles) {
        const buf = await readFile(path.resolve(assetsRoot, `${file}.wmf`));
        result.push([file, nodeBuf2ArrayBuffer(buf)]);
    }
    return result;
}
