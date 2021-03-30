/**
 * Disclaimer: I know this file is mostly disgusting, but it's just to showcase
 * the issue I'm trying to reproduce
 */

import path from "path";
import fs from "fs";
import { promisify } from "util";
import mkdirp from "mkdirp";
import prettier from "prettier";
import { getImage } from "@plaiceholder/next";
import { getPixelsCSS } from "@plaiceholder/css";
import { getBase64 } from "@plaiceholder/base64";
import { getImageFilePaths } from "../lib/get-image-file-paths";

const WARNING_COMMENT = `/**
 * DO NOT EDIT DIRECTLY: This file is auto-generated via the \`pre-build\` script
 */`;

const createPlaiceholderDir = async () => {
  const srcDir = path.join(__dirname, "..");
  const plaiceholderDir = path.join(srcDir, "pre-build", "plaiceholder");

  mkdirp.sync(plaiceholderDir);

  return plaiceholderDir;
};

export const generatePlaiceholderCSSMap = async () => {
  const plaiceholderDir = await createPlaiceholderDir();
  const plaiceholderFilePath = path.join(plaiceholderDir, "css.ts");

  const imgFileNames = getImageFilePaths();

  const getItem = async (img) => {
    const imgSrc = await getImage(img);
    const hash = await getPixelsCSS(imgSrc);
    return { [img]: hash };
  };

  const getPlaiceholders = await Promise.all(
    imgFileNames.map((img) => getItem(img))
  ).then((values) => (values as unknown) as ReturnType<typeof getItem>[]);

  const plaiceholderMap = getPlaiceholders.reduce(
    (acc, cv) => ({
      ...acc,
      ...cv,
    }),
    {}
  );

  const plaiceholderFileContents = prettier
    // @ts-ignore
    .format(
      `${WARNING_COMMENT}
  export const plaiceholderCSSMap = ${JSON.stringify(
    plaiceholderMap,
    null,
    2
  )} as const;`,
      { parser: "typescript" }
    );

  return promisify(fs.writeFile)(plaiceholderFilePath, plaiceholderFileContents)
    .then(() => console.log("CSS Plaiceholders Created Successfully"))
    .catch((err) => console.error(err));
};

export const generatePlaiceholderBase64Map = async () => {
  const plaiceholderDir = await createPlaiceholderDir();
  const plaiceholderFilePath = path.join(plaiceholderDir, "base64.ts");

  const imgFileNames = getImageFilePaths();

  const getItem = async (img) => {
    const imgSrc = await getImage(img);
    const hash = await getBase64(imgSrc);
    return { [img]: hash };
  };

  const getPlaiceholders = await Promise.all(
    imgFileNames.map((img) => getItem(img))
  ).then((values) => (values as unknown) as ReturnType<typeof getItem>[]);

  const plaiceholderMap = getPlaiceholders.reduce(
    (acc, cv) => ({
      ...acc,
      ...cv,
    }),
    {}
  );

  const plaiceholderFileContents = prettier
    // @ts-ignore
    .format(
      `${WARNING_COMMENT}
  export const plaiceholderBase64Map = ${JSON.stringify(
    plaiceholderMap,
    null,
    2
  )} as const;`,
      { parser: "typescript" }
    );

  return promisify(fs.writeFile)(plaiceholderFilePath, plaiceholderFileContents)
    .then(() => console.log("Base 64 Plaiceholders Created Successfully"))
    .catch((err) => console.error(err));
};

try {
  generatePlaiceholderCSSMap();
  generatePlaiceholderBase64Map();
} catch (err) {
  throw err;
}
