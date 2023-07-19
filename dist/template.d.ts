import { SFCDescriptor, SFCTemplateCompileOptions } from '@vue/compiler-sfc';
import { PartialMessage } from 'esbuild';
import { Options } from './index';
export declare function resolveTemplate(filename: string, options: Pick<SFCTemplateCompileOptions, "compiler" | "preprocessLang" | "preprocessOptions" | "compilerOptions" | "transformAssetUrls"> | undefined, isProd: boolean): {
    code: string;
    errors: PartialMessage[];
};
export declare function getTemplateOptions(descriptor: SFCDescriptor, options: Options['templateOptions'], isProd: boolean): SFCTemplateCompileOptions;
