import * as fs from 'fs-extra';
import * as path from 'path';

const themesFolderPath = path.join(__dirname, '..', 'themes');
const distFolderPath = path.join(__dirname, '..', 'dist');

fs.ensureDirSync(distFolderPath);

fs.moveSync(themesFolderPath, path.join(distFolderPath, 'themes'), { overwrite: true });

console.log('Themes moved to dist/themes folder.');