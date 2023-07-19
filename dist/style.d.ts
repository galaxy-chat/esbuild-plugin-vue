import { PartialMessage } from 'esbuild';
export declare function resolveStyle(filename: string, styleOptions: Pick<import("@vue/compiler-sfc").SFCAsyncStyleCompileOptions, "preprocessLang" | "preprocessOptions" | "modulesOptions" | "postcssOptions" | "postcssPlugins"> | undefined, index: number, isModule: boolean, moduleWithNameImport: boolean, isProd: boolean): Promise<{
    errors: PartialMessage[];
    styleCode: string;
}>;
