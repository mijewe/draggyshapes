const mix = require("laravel-mix");
const tailwindcss = require("tailwindcss");
const glob = require("glob-all");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

const assetSrcPath = "src/";
const scriptsSrcPath = assetSrcPath + "js/";
// const stylesSrcPath = assetSrcPath + "scss/";
// const imgSrcPath = assetSrcPath + "img/";

const assetDestPath = "dist/";
const scriptsDestPath = assetDestPath + "js/";
// const stylesDestPath = assetDestPath + "css/";
// const imgDestPath = assetDestPath + "img/";

// compile scripts.
mix.js(`${scriptsSrcPath}main.js`, `${scriptsDestPath}main.js`);

// compile styles.
// mix
// 	.sass(`${stylesSrcPath}main.scss`, stylesDestPath)
// 	.options({
// 		processCssUrls: false,
// 		postCss: [tailwindcss()]
// 	});

// mix.webpackConfig({
//   plugins: [
//     // new HtmlWebpackPlugin({
//     //   inlineSource: ".(js|css)$",
//     // }),
//     // new HtmlWebpackInlineSourcePlugin(),
//   ],
// });
// plugins: [
// ]
