const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");

module.exports = {
	entry: {
		popup: path.join(srcDir, "popup.tsx"),
		background: path.join(srcDir, "background.ts"),
		content_script: path.join(srcDir, "content_script.ts"),
		utils: path.join(srcDir, "utils.ts"),
		"checkmark-icon": path.join(srcDir, "resources/icons/checkmark-icon.tsx"),
		"remove-icon": path.join(srcDir, "resources/icons/remove-icon.tsx"),
		"plus-icon": path.join(srcDir, "resources/icons/plus-icon.tsx"),
	},
	output: {
		path: path.join(__dirname, "../dist/js"),
		filename: "[name].js",
	},
	optimization: {
		splitChunks: {
			name: "vendor",
			chunks(chunk) {
				return chunk.name !== "background";
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},
	plugins: [
		new CopyPlugin({
			patterns: [{ from: ".", to: "../", context: "public" }],
			options: {},
		}),
	],
};
