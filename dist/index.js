"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const querystring_1 = require("querystring");
const entry_1 = require("./entry");
const util_1 = require("./util");
const script_1 = require("./script");
const template_1 = require("./template");
const style_1 = require("./style");
(0, util_1.validateDenpendency)();
function plugin({ templateOptions, scriptOptions, styleOptions } = {}) {
    return {
        name: 'vue',
        setup(build) {
            const { sourcemap } = build.initialOptions;
            const isProd = process.env.NODE_ENV === 'production';
            build.onLoad({
                filter: /\.vue$/
            }, async (args) => {
                const filename = args.path;
                const source = await fs_1.default.promises.readFile(filename, 'utf8');
                const { code, errors } = (0, entry_1.loadEntry)(source, filename, !!sourcemap);
                return {
                    contents: code,
                    errors
                };
            });
            build.onResolve({
                filter: /\.vue\?type=script/
            }, args => {
                return {
                    path: args.path,
                    namespace: 'vue-script'
                };
            });
            build.onLoad({
                filter: /.*/,
                namespace: 'vue-script'
            }, args => {
                const [filename, dirname] = (0, util_1.resolvePath)(args.path);
                const { code, error, isTs } = (0, script_1.resolveScript)(filename, scriptOptions, templateOptions, isProd, !!sourcemap);
                return {
                    contents: code,
                    errors: error,
                    resolveDir: dirname,
                    loader: isTs ? 'ts' : 'js'
                };
            });
            build.onResolve({
                filter: /\.vue\?type=template/
            }, args => {
                return {
                    path: args.path,
                    namespace: 'vue-template'
                };
            });
            build.onLoad({
                filter: /.*/,
                namespace: 'vue-template'
            }, args => {
                const [filename, dirname] = (0, util_1.resolvePath)(args.path);
                const { code, errors } = (0, template_1.resolveTemplate)(filename, templateOptions, isProd);
                return {
                    contents: code,
                    errors,
                    resolveDir: dirname
                };
            });
            build.onResolve({
                filter: /\.vue\?type=style/
            }, args => {
                return {
                    path: args.path,
                    namespace: 'vue-style'
                };
            });
            build.onLoad({
                filter: /.*/,
                namespace: 'vue-style'
            }, async (args) => {
                const [filename, dirname, query] = (0, util_1.resolvePath)(args.path);
                const { index, isModule, isNameImport } = (0, querystring_1.parse)(query);
                const moduleWithNameImport = !!(isModule && isNameImport);
                const { styleCode, errors } = await (0, style_1.resolveStyle)(filename, styleOptions, Number(index), !!isModule, moduleWithNameImport, isProd);
                return {
                    contents: `document.addEventListener('parseCompleted', () => {const style = document.createElement('style');style.textContent = ${JSON.stringify(styleCode)};document.querySelector('#content > div').append(style);})`,
                    errors,
                    resolveDir: dirname
                };
            });
        }
    };
}
exports.default = plugin;
// for commonjs default require()
module.exports = plugin;
