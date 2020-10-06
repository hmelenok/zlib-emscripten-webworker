# zlib-emscripten-webworker
Emscripten + ZLib = JS Zip Tool

# Demo

# Usage 
IDK yet, seems simple as:
```javascript
  //File from file input
  let reader = new FileReader();
  const files = document.querySelector('[name="files"]').files;
  const firstFile = files[0];//For now only one file 
  //Converting to Uint8Array
  reader.addEventListener("loadend", async (e) => {
    let result = reader.result;
    const uint8_view = new Uint8Array(result);
    //Magic request to wasm worker
    const zip = await wasmWorker(firstFile.name, uint8_view);
    //Usual convertation to file on browser (returns Uint8Array)
    offerFileAsDownload(zip, `${firstFile.name}.zip`, "application/zip");
  });
  reader.readAsArrayBuffer(firstFile);
```
