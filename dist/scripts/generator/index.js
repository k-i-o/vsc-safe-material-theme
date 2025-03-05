"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MATERIAL_THEME_EXT_ID = exports.TS_BUILD_FOLDER_PATH = exports.USER_CONFIG_FILE_NAME = exports.CONFIG_FILE_NAME = exports.BUILD_FOLDER_PATH = void 0;
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const vscode_theme_generator_1 = require("@moxer/vscode-theme-generator");
const color_set_1 = require("./color-set");
exports.BUILD_FOLDER_PATH = path.join(__dirname, '..', '..');
exports.CONFIG_FILE_NAME = 'material-theme.config.json';
exports.USER_CONFIG_FILE_NAME = 'user.material-theme.config.json';
exports.TS_BUILD_FOLDER_PATH = path.join(__dirname, '..', 'ts-build');
exports.MATERIAL_THEME_EXT_ID = 'samueleradici.vsc-safe-material-theme';
const THEME_BUILD_PATH = path.join(exports.BUILD_FOLDER_PATH, 'themes');
const themes = ['default', 'darker', 'lighter', 'ocean', 'palenight', 'deepforest'];
const withHC = themes.reduce((acc, src) => {
    acc = acc.concat(`${src}-hc`);
    return acc;
}, themes);
const themeModules = withHC.map((theme) => __awaiter(void 0, void 0, void 0, function* () { return Promise.resolve(`${`./settings/specific/${theme}`}`).then(s => __importStar(require(s))).then(res => res.default); }));
const generate = () => __awaiter(void 0, void 0, void 0, function* () {
    yield fs.mkdirp(THEME_BUILD_PATH);
    const modules = yield Promise.all(themeModules);
    modules.forEach(theme => {
        const colorSet = (0, color_set_1.getColorSet)(theme);
        (0, vscode_theme_generator_1.generateTheme)(theme.name, colorSet, path.join(THEME_BUILD_PATH, `${theme.name}.json`));
    });
});
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield generate();
    }
    catch (error) {
        console.error('ERROR build:generate-themes', error);
        process.exit(1);
    }
});
void run();
