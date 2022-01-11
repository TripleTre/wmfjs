"use strict";
const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "./index.ts");
fs.writeFileSync(filePath, "");
function importFolder(folderPath) {
    const files = fs.readdirSync(folderPath);
    files.forEach(v => {
        if (/\.(ts|js)$/.test(v) && /^META_/.test(v)) {
            const p = path.relative(__dirname, path.resolve(folderPath, `./${v}`)).toString().replace(".ts", "");
            if (!/gen.js/.test(p) && !/instances/.test(p)) {
                fs.appendFileSync(filePath, `export * from "./${p}";\n`, {
                    encoding: "utf8",
                });
            }
        }
        else {
            const stat = fs.lstatSync(path.resolve(folderPath, v));
            if (stat.isDirectory()) {
                importFolder(path.resolve(folderPath, v));
            }
        }
    });
}
importFolder(__dirname);
