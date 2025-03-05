import * as fs from 'fs-extra';
import * as path from 'path';

import {generateTheme} from '@moxer/vscode-theme-generator';
import {ThemeSetting} from './types';
import {getColorSet} from './color-set';

export const BUILD_FOLDER_PATH = path.join(__dirname, '..', 'dist');
export const CONFIG_FILE_NAME = 'material-theme.config.json';
export const USER_CONFIG_FILE_NAME = 'user.material-theme.config.json';
export const TS_BUILD_FOLDER_PATH = path.join(__dirname, '..', 'ts-build');
export const MATERIAL_THEME_EXT_ID = 'equinusocio.vsc-material-theme';

const THEME_BUILD_PATH = path.join(BUILD_FOLDER_PATH, 'themes');
const themes = ['default', 'darker', 'lighter', 'ocean', 'palenight', 'deepforest'];

const withHC = themes.reduce((acc, src) => {
    acc = acc.concat(`${src}-hc`);
    return acc;
}, themes);

const themeModules = withHC.map(async theme => import(`./settings/specific/${theme}`).then(res => res.default));

const generate = async (): Promise<void> => {
    await fs.mkdirp(THEME_BUILD_PATH);
    const modules = await Promise.all(themeModules) as ThemeSetting[];
    modules.forEach(theme => {
        const colorSet = getColorSet(theme);
        generateTheme(theme.name, colorSet, path.join(THEME_BUILD_PATH, `${theme.name}.json`));
    });
};

const run = async (): Promise<void> => {
    try {
        await generate();
    } catch (error) {
        console.error('ERROR build:generate-themes', error);
        process.exit(1);
    }
};

void run();
