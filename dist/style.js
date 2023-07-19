"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveStyle = void 0;
const compiler_sfc_1 = require("@vue/compiler-sfc");
const cache_1 = require("./cache");
const convert_source_map_1 = __importDefault(require("convert-source-map"));
async function resolveStyle(filename, styleOptions = {}, index, isModule, moduleWithNameImport, isProd) {
    const descriptor = (0, cache_1.getDesCache)(filename);
    const styleBlock = descriptor.styles[index];
    const scopeId = (0, cache_1.getId)(filename);
    const res = await (0, compiler_sfc_1.compileStyleAsync)({
        source: styleBlock.content,
        filename: descriptor.filename,
        id: scopeId,
        scoped: styleBlock.scoped,
        trim: true,
        isProd,
        inMap: styleBlock.map,
        preprocessLang: styleBlock.lang,
        preprocessOptions: styleOptions.preprocessOptions,
        postcssOptions: styleOptions.postcssOptions,
        postcssPlugins: styleOptions.postcssPlugins,
        modules: isModule,
        modulesOptions: styleOptions.modulesOptions
    });
    let styleCode;
    if (moduleWithNameImport) {
        // css-modules JSON file
        styleCode = JSON.stringify(res.modules);
    }
    else {
        // normal css content
        styleCode = res.code;
    }
    const errors = res.errors.map(e => ({
        text: e.message
    }));
    return {
        errors,
        styleCode
    };
}
exports.resolveStyle = resolveStyle;
