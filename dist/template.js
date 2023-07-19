"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplateOptions = exports.resolveTemplate = void 0;
const cache_1 = require("./cache");
const compiler_sfc_1 = require("@vue/compiler-sfc");
const convert_source_map_1 = __importDefault(require("convert-source-map"));
function resolveTemplate(filename, options = {}, isProd) {
    const descriptor = (0, cache_1.getDesCache)(filename);
    let { code, errors, map } = (0, compiler_sfc_1.compileTemplate)(getTemplateOptions(descriptor, options, isProd));
    if (map) {
        code += convert_source_map_1.default.fromObject(map).toComment();
    }
    const convertedErrors = errors.map(e => {
        if (typeof e === 'string') {
            return {
                text: e
            };
        }
        else {
            return {
                text: e.message
            };
        }
    });
    return {
        code,
        errors: convertedErrors
    };
}
exports.resolveTemplate = resolveTemplate;
function getTemplateOptions(descriptor, options, isProd) {
    const filename = descriptor.filename;
    const scopeId = (0, cache_1.getId)(filename);
    return {
        source: descriptor.template.content,
        filename,
        id: scopeId,
        scoped: descriptor.styles.some(s => s.scoped),
        isProd,
        inMap: descriptor.template.map,
        compiler: options?.compiler,
        preprocessLang: options?.preprocessLang,
        preprocessOptions: options?.preprocessOptions,
        compilerOptions: {
            ...options?.compilerOptions,
            scopeId
        },
        transformAssetUrls: options?.transformAssetUrls
    };
}
exports.getTemplateOptions = getTemplateOptions;
