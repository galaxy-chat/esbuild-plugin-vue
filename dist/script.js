"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveScript = void 0;
const compiler_sfc_1 = require("@vue/compiler-sfc");
const cache_1 = require("./cache");
const template_1 = require("./template");
const convert_source_map_1 = __importDefault(require("convert-source-map"));
function resolveScript(filename, scriptOptions = {}, templateOptions = {}, isProd, sourcemap) {
    const descriptor = (0, cache_1.getDesCache)(filename);
    const error = [];
    const { script, scriptSetup } = descriptor;
    const isTs = (script && script.lang === 'ts') || (scriptSetup && scriptSetup.lang === 'ts');
    let code = 'export default {}';
    if (!descriptor.script && !descriptor.scriptSetup) {
        return {
            code
        };
    }
    const scopeId = (0, cache_1.getId)(filename);
    try {
        const res = (0, compiler_sfc_1.compileScript)(descriptor, {
            id: scopeId,
            isProd,
            sourceMap: sourcemap,
            inlineTemplate: true,
            babelParserPlugins: scriptOptions.babelParserPlugins,
            refTransform: true,
            refSugar: scriptOptions.refSugar,
            templateOptions: descriptor.template ? (0, template_1.getTemplateOptions)(descriptor, templateOptions, isProd) : {}
        });
        code = res.content;
        if (res.map) {
            code += convert_source_map_1.default.fromObject(res.map).toComment();
        }
    }
    catch (e) {
        error.push({
            text: e.message
        });
    }
    return {
        code,
        error,
        isTs
    };
}
exports.resolveScript = resolveScript;
