var path = require('path')
var { version } = require('./package.json')

function camelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

function upperFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
  title: `Ola Search UI Components ${version}`,
  showUsage: true,
  highlightTheme: 'material',
  styleguideDir: 'docs',
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'docs/wrapper')
  },
  sections: [
    {
      name: 'Fields',
      components: 'src/components/Fields/**/*.js'
    }
  ],
  require: [
    // path.resolve(__dirname, './setup.js'),
    path.join(__dirname, './src/style/core.scss'),
    // path.resolve(__dirname, './src/index.js')
  ],
  // getComponentPathLine: (componentPath) => {
  //   const dirname = path.dirname(componentPath, '.js')
  //   const name = dirname.split('/').slice(-1)[0]
  //   const componentName = upperFirst(camelCase(name))

  //   return `import { ${componentName} } from '@olasearch/core'`
  // },
  webpackConfig: {
    resolve: {
      alias: {
        'olasearchconfig': path.join(__dirname, 'docs/config'),
        '@olasearch/core': path.join(__dirname, './../npm-olasearch'),
        'OlaSearch': path.join(__dirname, './../npm-olasearch'),
      }
    },
    externals: {
      
    },
    module: {
      rules: [
        {
          test: /\.js?/,
          use: ['babel-loader'],
          exclude: /node_modules/,
          include: [
            path.join(__dirname, './'),
            path.join(__dirname, './../src')
          ]
        },
        {
          test: /(\.scss|\.css)$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        }
      ]
    }
  },
  components: 'src/components/Fields/**/*.js'
}
