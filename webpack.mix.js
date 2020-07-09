const mix = require("laravel-mix");
const tailwindcss = require("tailwindcss");
const glob = require("glob-all");

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