import { PartialMessage } from 'esbuild';
export declare function resolveScript(filename: string, scriptOptions: Pick<import("@vue/compiler-sfc").SFCScriptCompileOptions, "babelParserPlugins" | "refSugar"> | undefined, templateOptions: Pick<import("@vue/compiler-sfc").SFCTemplateCompileOptions, "compiler" | "preprocessLang" | "preprocessOptions" | "compilerOptions" | "transformAssetUrls"> | undefined, isProd: boolean, sourcemap: boolean): {
    code: string;
    error?: undefined;
    isTs?: undefined;
} | {
    code: string;
    error: PartialMessage[];
    isTs: boolean | null;
};
