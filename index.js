const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const folders = "./images/";
const outputFolder = `output_${Date.now()}`;

fs.mkdirSync(path.resolve(outputFolder));

const acceptImageExt = ["png", "jpg", "jpeg"];

fs.readdir(folders, (err, files) => {
  files.forEach((file) => {
    const [fileName, ext] = file.split(".");

    if (acceptImageExt.indexOf(ext) !== -1) {
      const child = spawn(`node`, [
        "converter.js",
        path.resolve(folders, file),
        outputFolder,
      ]);
      child.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
      });

      child.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
      });
    }
    // console.log(path.resolve(folders, fileName), ext);
  });
});

console.log("output folder:", path.resolve(outputFolder));

// const buffers = [];

// inputStream.on("data", (chunk) => buffers.push(chunk));

// inputStream.on("end", () => {
//   const trans = sharp(Buffer.concat(buffers))
//     .webp({
//       quality: 80,
//       alphaQuality: 80,
//       lossless: false,
//     })
//     .toFile(`${imgName}.webp`)
//     .then((info) => console.log("info", info))
//     .catch((err) => console.log("err", err));
// });
