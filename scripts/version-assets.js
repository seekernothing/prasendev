const fs = require("fs");
const path = require("path");

const src = path.join(
  __dirname,
  "..",
  "public",
  "images",
  "products",
  "hi.jpg"
);
const dest = path.join(
  __dirname,
  "..",
  "public",
  "images",
  "products",
  "hi.v4.jpg"
);

try {
  if (!fs.existsSync(src)) {
    console.error("Source image not found:", src);
    process.exitCode = 1;
  } else {
    fs.copyFileSync(src, dest);
    console.log("Copied", src, "->", dest);
  }
} catch (err) {
  console.error("Error copying asset:", err);
  process.exitCode = 1;
}
