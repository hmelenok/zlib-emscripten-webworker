import { expose } from "comlink";
import zipWasm from "./wasm/zip.wasm";
import zipJs from "./wasm/zip.js";

const zip = async (fileName, uint8_view, originHref) =>
  new Promise(async (resolve) => {
    try {
      const wasm = await fetch(`${originHref || location.origin}${zipWasm}`);
      const buffer = await wasm.arrayBuffer();
      const { ccall, FS } = await zipJs({
        wasmBinary: buffer,
      });
      const TEMP_ZIP_PATH = "temp.zip";

      FS.writeFile(fileName, uint8_view);

      ccall(
        "myFunction",
        "number",
        ["string", "string"],
        [fileName, TEMP_ZIP_PATH]
      );

      resolve(FS.readFile(TEMP_ZIP_PATH));
    } catch (e) {
      console.warn({ zipWasm, e });
    }
  });

expose(zip);
