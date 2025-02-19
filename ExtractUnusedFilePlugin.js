const fs = require('fs');
const path = require('path');

/**
 * 递归读取目录下的所有文件
 * @param {string} dir - 目录路径
 * @param {string[]} filePathList - 文件路径列表
 * @returns {string[]} - 所有文件路径
 */
function readFileList(dir, filePathList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      readFileList(filePath, filePathList);
    } else {
      filePathList.push(filePath);
    }
  });
  return filePathList;
}

/**
 * 过滤文件列表，排除指定的文件
 * @param {string[]} files - 文件列表
 * @param {(string|RegExp)[]} excludeFiles - 排除的文件列表，可以是字符串或正则表达式
 * @returns {string[]} - 过滤后的文件列表
 */
function filterFiles(files, excludeFiles) {
  // 单独导出类型的文件，fileDependencies 中是找不到的，全局使用的类型也不会有导入的依赖关系，所以需要强制排除
  const excludeFilesEnhance = [...excludeFiles, '.d.ts'];
  return files.filter((file) => {
    return !excludeFilesEnhance.some((excludeFile) => file.match(excludeFile));
  });
}

/**
 * 根据文件后缀分组
 * @param {string[]} files - 文件列表
 * @returns {Object} - 按后缀分组的文件对象
 */
function groupFilesBySuffix(files) {
  return files.reduce((acc, file) => {
    const suffix = path.extname(file);
    if (!acc[suffix]) {
      acc[suffix] = [];
    }
    acc[suffix].push(file);
    return acc;
  }, {});
}

class ExtractUnusedFilePlugin {
  /**
   * @param {Object} options - 插件配置选项
   * @param {string} options.readDir - 读取的目录
   * @param {string} options.outputPath - 输出的文件路径
   * @param {string[]} options.excludeFiles - 排除的文件列表
   * @param {boolean} options.isDelete - 是否删除未使用的文件
   * @param {string} options.outputType - 输出类型，可以是json，browser，和 log
   * @param {boolean} options.debug - 是否开启调试
   */
  constructor(options = {}) {
    const defaultOptions = {
      excludeFiles: ['static', '.md', '.txt', '.py', '.DS_Store', '.gitkeep'],
      isDelete: false,
      outputType: 'json',
    };

    // 加载配置
    this.options = { ...defaultOptions, ...options };
  }

  /**
   * 应用插件
   * @param {Object} compiler - webpack 编译器
   */
  apply(compiler) {
    compiler.hooks.emit.tapAsync('ExtractUnusedFilePlugin', async (compilation, callback) => {
      const { readDir, outputPath, excludeFiles, isDelete, outputType, debug } = this.options;

      // 第一步，异步读取项目中指定目录下所有的文件列表, 并排除 excludeFiles 中的文件
      const files = await readFileList(readDir);
      const fileList = filterFiles(files, excludeFiles);

      // 第二步，在 webpack 构建结束后，得到 webpack 本次处理的所有文件列表（需要排除常见的不属于项目中定义的文件）
      const excludeWebpackFiles = ['node_modules', '.map'];
      const webpackFileList = filterFiles([...new Set(compilation.fileDependencies)], excludeWebpackFiles);

      // 第三步，将第一步和第二步得到的结果进行比对，如果第一步中的文件在第二步中不存在，则将该文件输出到一个 json 列表中
      const unusedFileList = fileList.filter((file) => !webpackFileList.includes(file));
      const unusedFileListGroupBySuffix = groupFilesBySuffix(unusedFileList);

      // 第四步，将得到的文件列表输出到控制台
      if (outputType === 'json') {
        fs.writeFileSync(
          path.resolve(outputPath, './unusedFileList.json'),
          JSON.stringify(unusedFileListGroupBySuffix, null, 2),
        );
      } else if (outputType === 'browser') {
        fs.writeFileSync(outputPath, unusedFileList.join('\n'));
      } else if (outputType === 'log') {
        console.log('\n 🚀🚀🚀🚀 unusedFileList =>', unusedFileList);
      }

      // 输出中间数据，方便调试和分析
      if (debug) {
        fs.writeFileSync(
          path.resolve(outputPath, './middleData.json'),
          JSON.stringify({ '全部文件': files, 'excludeFiles 排除文件后的结果': fileList, 'webpack处理过的文件': webpackFileList, '未使用文件': unusedFileListGroupBySuffix }, null, 2),
        );
      }

      if (isDelete) {
        unusedFileList.forEach((file) => {
          fs.unlinkSync(file);
        });
      }

      callback();
    });
  }
}

module.exports = ExtractUnusedFilePlugin;
