const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputFile = process.argv[2];

const outputDirectory = process.argv[3];

const fileNameParts = inputFile.split(".")[0];
const fileName = fileNameParts.split("/")[fileNameParts.split("/").length - 1];

const inputStream = fs.createReadStream(inputFile, {});

const buffers = [];
// console.log("ddd", inputFile, outputDirectory, fileName);
// console.log("xxx", path.resolve(`${outputDirectory}/${fileName}.webp`));

inputStream.on("data", (chunk) => buffers.push(chunk));
inputStream.on("end", () => {
  const trans = sharp(Buffer.concat(buffers))
    .webp({
      quality: 80,
      alphaQuality: 80,
      lossless: false,
    })
    .toFile(path.resolve(`${outputDirectory}/${fileName}.webp`));
  // .then((info) => console.log("info", info))
  // .catch((err) => console.log("err", err));
});
