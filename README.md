# zlib-emscripten-webworker
Emscripten + ZLib = JS Zip Tool

# Demo

# Usage 
IDK yet, seems simple as:
```javascript
import { wrap } from "comlink";
import WasmWorker from "./wasm.worker";
const wasmWorker = wrap(new WasmWorker());

function offerFileAsDownload(content, filename, mime) {
  mime = mime || "application/octet-stream";

  console.log(
    `Offering download of "${filename}", with ${content.length} bytes...`
  );

  var a = document.createElement("a");
  a.download = filename;
  a.href = URL.createObjectURL(new Blob([content], { type: mime }));
  a.style.display = "none";

  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }, 2000);
}

document.querySelector(".mybutton").addEventListener("click", function () {
  let reader = new FileReader();
  const files = document.querySelector('[name="files"]').files;
  const firstFile = files[0];
  console.warn({ files, reader });
  reader.addEventListener("loadend", async (e) => {
    let result = reader.result;
    const uint8_view = new Uint8Array(result);

    const zip = await wasmWorker(firstFile.name, uint8_view);
    console.warn({ files, zip });
    offerFileAsDownload(zip, `${firstFile.name}.zip`, "application/zip");
  });
  reader.readAsArrayBuffer(firstFile);
});

```
