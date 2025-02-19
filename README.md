# Extract Unused File Plugin

[![npm version](https://badge.fury.io/js/extract-unused-file-plugin.svg)](https://badge.fury.io/js/extract-unused-file-plugin)

A Webpack plugin to identify and optionally delete unused files in your project. This helps in keeping your project clean and efficient by removing unnecessary files.

## Installation

To install the plugin, run:

``` bash
npm install extract-unused-file-plugin --save-dev
```
## Usage

To use the plugin, add it to your Webpack configuration file. Here is an example:
```javascript
const ExtractUnusedFilePlugin = require('extract-unused-file-plugin');
module.exports = {
  // other configurations...
  plugins: [
    new ExtractUnusedFilePlugin({
      readDir: './src', // Directory to read files from
      outputPath: './dist', // Path to output the unused files list
      excludeFiles: ['static', '.md', '.txt'], // List of files to exclude
      isDelete: false, // Whether to delete unused files
      outputType: 'json', // Output type: 'json', 'browser', or 'log'
      debug: true // Enable debug mode
    })
  ]
};
```

## Options

- `readDir`: **string** - Directory to read files from.
- `outputPath`: **string** - Path to output the unused files list.
- `excludeFiles`: **string[]** - List of files to exclude. Can be strings or regular expressions.
- `isDelete`: **boolean** - Whether to delete unused files. Default is `false`.
- `outputType`: **string** - Output type. Can be `json`, `browser`, or `log`. Default is `json`.
- `debug`: **boolean** - Enable debug mode. Default is `false`.

## How It Works

1. **File Reading**: The plugin reads all files in the specified directory, excluding those in the `excludeFiles` list.
2. **Comparison**: It compares these files with the files used in the Webpack build.
3. **Output**: Unused files are listed in the specified output format. If `isDelete` is `true`, these files are deleted.

## Example Output

After running the plugin, you might get a result structured like this:

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## Author

FlyAboveGrass

## Links

- [GitHub Repository](https://github.com/FlyAboveGrass/ExtractUnusedFilePlugin)
- [npm Package](https://www.npmjs.com/package/extract-unused-file-plugin)

## Other Languages

- [中文版 README](README.zh.md)
