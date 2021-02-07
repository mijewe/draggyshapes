const mix = require("laravel-mix");
const tailwindcss = require("tailwindcss");
const glob = require("glob-all");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

const assetSrcPath = "src/";
const scriptsSrcPath = assetSrcPath + "js/";
// const stylesSrcPath = assetSrcPath + "scss/";
const imgSrcPath = assetSrcPath + "img/";

const assetDestPath = "dist/";
const scriptsDestPath = assetDestPath + "js/";
// const stylesDestPath = assetDestPath + "css/";
const imgDestPath = assetDestPath + "img/";

// compile scripts.
mix.js(`${scriptsSrcPath}main.js`, `${scriptsDestPath}main.js`);

// copy images
mix.copy(imgSrcPath, imgDestPath);
