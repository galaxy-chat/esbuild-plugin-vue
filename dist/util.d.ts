import { Message } from 'esbuild';
import { parse } from '@vue/compiler-sfc';
export declare function resolvePath(filePath: string): string[];
declare type ParseErrors = ReturnType<typeof parse>['errors'];
export declare function convertErrors(errors: ParseErrors, filename: string): Message[];
export declare function validateDenpendency(): void;
export {};
