"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDenpendency = exports.convertErrors = exports.resolvePath = void 0;
const path_1 = __importDefault(require("path"));
function resolvePath(filePath) {
    const [filename, query] = filePath.split('?', 2);
    const dirname = path_1.default.dirname(filename);
    return [filename, dirname, query];
}
exports.resolvePath = resolvePath;
function convertErrors(errors, filename) {
    const convert = (e) => {
        let location = null;
        if ('loc' in e && Object.prototype.hasOwnProperty.call(e, 'loc')) {
            const start = e.loc.start;
            const lineText = e.loc.source;
            location = {
                file: filename,
                namespace: '',
                line: start.line + 1,
                column: start.column,
                length: lineText.length,
                lineText: e.loc.source,
                suggestion: ''
            };
        }
        return {
            pluginName: 'vue',
            text: e.message,
            location: location,
            notes: [],
            detail: ''
        };
    };
    return errors.map(e => convert(e));
}
exports.convertErrors = convertErrors;
function validateDenpendency() {
    try {
        require.resolve('@vue/compiler-sfc');
    }
    catch {
        throw new Error('@vue/compiler-sfc has not been installed');
    }
}
exports.validateDenpendency = validateDenpendency;
