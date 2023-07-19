"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEntry = void 0;
const compiler_sfc_1 = require("@vue/compiler-sfc");
const cache_1 = require("./cache");
const util_1 = require("./util");
const cache_2 = require("./cache");
function loadEntry(source, filename, sourcemap) {
    const { descriptor, errors } = (0, compiler_sfc_1.parse)(source, {
        sourceMap: sourcemap,
        filename
    });
    (0, cache_1.setDesCache)(filename, descriptor);
    const scopeId = (0, cache_2.setId)(filename);
    const scriptPath = JSON.stringify(`${filename}?type=script`);
    const scriptImportCode = `import script from ${scriptPath}` + `\nexport * from ${scriptPath}`;
    let templateImportCode = '';
    let templateBindCode = '';
    // scriptSetup inlineTemplate
    if (!descriptor.scriptSetup && descriptor.template) {
        const templatePath = JSON.stringify(`${filename}?type=template`);
        templateImportCode += `import { render } from ${templatePath}`;
        templateBindCode += `\nscript.render = render`;
    }
    let styleImportCode = '';
    let hasModuleInject = false;
    descriptor.styles.forEach((styleBlock, i) => {
        const stylePath = `${filename}?type=style&index=${i}`;
        if (styleBlock.module) {
            if (!hasModuleInject) {
                // expose cssModules to script
                styleImportCode += `\nscript.__cssModules = cssModules = {}`;
                hasModuleInject = true;
            }
            // <style module="someName">
            const moduleName = typeof styleBlock.module === 'string' ? styleBlock.module : '$style';
            const importVarName = `__style${i}`;
            styleImportCode += `\nimport ${importVarName} from ${JSON.stringify(`${stylePath}&isModule=true&isNameImport=true`)}`;
            styleImportCode += `\ncssModules[${JSON.stringify(moduleName)}] = ${importVarName}`;
            styleImportCode += `\nimport ${JSON.stringify(`${stylePath}&isModule=true`)}`;
        }
        else {
            // css file import
            styleImportCode += `\nimport ${JSON.stringify(stylePath)}`;
        }
    });
    let scopeIdInject = '';
    if (descriptor.styles.some(styleBlock => styleBlock.scoped)) {
        scopeIdInject += `script.__scopeId = ${JSON.stringify(scopeId)}`;
    }
    const scriptExportCode = 'export default script';
    const code = [
        scriptImportCode,
        templateImportCode,
        templateBindCode,
        styleImportCode,
        scriptExportCode,
        scopeIdInject
    ]
        .filter(Boolean)
        .join('\n');
    return {
        code,
        errors: (0, util_1.convertErrors)(errors, filename)
    };
}
exports.loadEntry = loadEntry;