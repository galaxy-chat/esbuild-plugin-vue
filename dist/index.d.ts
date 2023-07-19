import { Plugin } from 'esbuild';
import { SFCTemplateCompileOptions, SFCScriptCompileOptions, SFCAsyncStyleCompileOptions } from '@vue/compiler-sfc';
export interface Options {
    templateOptions?: Pick<SFCTemplateCompileOptions, 'compiler' | 'preprocessLang' | 'preprocessOptions' | 'compilerOptions' | 'transformAssetUrls'>;
    scriptOptions?: Pick<SFCScriptCompileOptions, 'babelParserPlugins' | 'refSugar'>;
    styleOptions?: Pick<SFCAsyncStyleCompileOptions, 'modulesOptions' | 'preprocessLang' | 'preprocessOptions' | 'postcssOptions' | 'postcssPlugins'>;
}
declare function plugin({ templateOptions, scriptOptions, styleOptions }?: Options): Plugin;
export default plugin;
