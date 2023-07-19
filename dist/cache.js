"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getId = exports.setId = exports.getDesCache = exports.setDesCache = void 0;
const hash_sum_1 = __importDefault(require("hash-sum"));
const descriptorCache = {};
function setDesCache(filename, descriptor) {
    descriptorCache[filename] = descriptor;
}
exports.setDesCache = setDesCache;
function getDesCache(filename) {
    let cache = descriptorCache[filename];
    if (!cache) {
        throw new Error('no descriptor cache');
    }
    return cache;
}
exports.getDesCache = getDesCache;
const idCache = {};
function setId(filename) {
    return (idCache[filename] = `data-v-${(0, hash_sum_1.default)(filename)}`);
}
exports.setId = setId;
function getId(filename) {
    let id = idCache[filename];
    if (!id) {
        throw new Error('no scope id');
    }
    return id;
}
exports.getId = getId;
