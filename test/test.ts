import * as fs from "fs";
import * as path from "path";
import { JSDOM } from "jsdom";
import { loadWMFFile } from "./help";
import { parser } from "../src/parser";
import { SvgPlayback } from "../src/playbacks/SvgPlayback";

const dom = new JSDOM();

global.document = dom.window.document;

(async function main() {
    const playback = new SvgPlayback();
    const arrBuffers = await loadWMFFile("hello");

    fs.rmSync(path.resolve(__dirname, `./output`), { recursive: true, force: true });
    fs.mkdirSync(path.resolve(__dirname, `./output`));

    for (let [file, buf] of arrBuffers) {
        parser(buf, playback);
        const svg = playback.svgElement.outerHTML;
        fs.writeFileSync(path.resolve(__dirname, `./output/${file}.svg`), svg, { encoding: "utf8" });
    }
})();
