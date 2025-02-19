# 提取未使用文件插件

[![npm version](https://badge.fury.io/js/extract-unused-file-plugin.svg)](https://badge.fury.io/js/extract-unused-file-plugin)

一个用于识别并可选删除项目中未使用文件的 Webpack 插件。这有助于通过删除不必要的文件来保持项目的整洁和高效。

## 安装

要安装插件，请运行：

``` bash
npm install extract-unused-file-plugin --save-dev
```

## 使用方法

要使用该插件，请将其添加到您的 Webpack 配置文件中。以下是一个示例：

```javascript
const ExtractUnusedFilePlugin = require('extract-unused-file-plugin');
module.exports = {
  // 其他配置...
  plugins: [
    new ExtractUnusedFilePlugin({
      readDir: './src', // 读取文件的目录
      outputPath: './dist', // 输出未使用文件列表的路径
      excludeFiles: ['static', '.md', '.txt'], // 要排除的文件列表
      isDelete: false, // 是否删除未使用的文件
      outputType: 'json', // 输出类型：'json'、'browser' 或 'log'
      debug: true // 启用调试模式
    })
  ]
};
```

## 选项

- `readDir`: **string** - 读取文件的目录。
- `outputPath`: **string** - 输出未使用文件列表的路径。
- `excludeFiles`: **string[]** - 要排除的文件列表。可以是字符串或正则表达式。
- `isDelete`: **boolean** - 是否删除未使用的文件。默认值为 `false`。
- `outputType`: **string** - 输出类型。可以是 `json`、`browser` 或 `log`。默认值为 `json`。
- `debug`: **boolean** - 启用调试模式。默认值为 `false`。

## 工作原理

1. **文件读取**：插件读取指定目录中的所有文件，排除在 `excludeFiles` 列表中的文件。
2. **比较**：将这些文件与 Webpack 构建中使用的文件进行比较。
3. **输出**：未使用的文件将以指定的输出格式列出。如果 `isDelete` 为 `true`，这些文件将被删除。

## 示例输出

运行插件后，您可能会得到如下结构的结果：

```json
{
  ".tsx": [
    "/Users/FakeName/Work/workspace/your-project/src/Button.tsx",
    "/Users/Fake/Work/workspace/your-project/src/Result.tsx",
    "/Users/FakeName/Work/workspace/your-project/src/Loading.tsx",
    "/Users/FakeName/Work/workspace/your-project/src/NoPermission.tsx",
    "/Users/FakeName/Work/workspace/your-project/src/Test.tsx",
    "/Users/FakeName/Work/workspace/your-project/src/SelectTable.tsx",
    "/Users/FakeName/Work/workspace/your-project/src/ButtonAutoPublish.tsx",
    "/Users/FakeName/Work/workspace/your-project/src/ButtonScreenshot.tsx",
    "/Users/FakeName/Work/workspace/your-project/src/ButtonTakeInfo.tsx",
    "/Users/FakeName/Work/workspace/your-project/src/CardHistoryClass.tsx"
  ],
  ".scss": [
    "/Users/FakeName/Work/workspace/your-project/src/DateTimePicker.scss",
    "/Users/FakeName/Work/workspace/your-project/src/CardHistoryClass.scss",
    "/Users/FakeName/Work/workspace/your-project/src/ConfirmList.scss"
  ]
}
```

## 许可证

此项目根据 MIT 许可证授权 - 有关详细信息，请参阅 [LICENSE](LICENSE) 文件。

## 贡献

欢迎贡献！请随时提交拉取请求或打开问题。

## 作者

FlyAboveGrass

## 链接

- [GitHub 仓库](https://github.com/FlyAboveGrass/ExtractUnusedFilePlugin)
- [npm 包](https://www.npmjs.com/package/extract-unused-file-plugin) 