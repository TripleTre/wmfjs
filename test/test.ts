import { loadWMFFile } from "./help";
import { JSDOM } from "jsdom";
import { parser } from "../src/parser";
import { SvgPlayback } from "../src/playbacks/SvgPlayback";

const dom = new JSDOM();

global.document = dom.window.document;

(async function main() {
    const arrBuf = await loadWMFFile("shape");
    parser(arrBuf, new SvgPlayback());
})();
