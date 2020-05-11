import path from 'path';

const publicFolder = 'mango'

export default function loader(content) {

  const url = getFileName(this)

  const outputPath = path.posix.join(publicFolder, url);

  const publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;

  this.emitFile(outputPath, content);

  const esModule = true;

  return `${esModule ? 'export default' : 'module.exports ='} ${publicPath};`;}

export function getFileName(baseObject) {
  let ext = 'js';
  let basename = 'file';
  const parsed = path.parse(baseObject.resourcePath);

    if (parsed.ext) {
      ext = parsed.ext;
    }

    if (parsed.dir) {
      basename = parsed.name;
    }
  return  `${basename}${ext}`
}

export const raw = true;
