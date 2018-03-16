var path = require('path')
var { version } = require('./package.json')
const { styles, theme } = require('./styleguide/styleguide.styles')

function camelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

function upperFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
  title: `Ola Search UI - ${version}`,
  showUsage: true,
  styleguideDir: 'docs',
  styleguideComponents: {
    Wrapper: path.join(__dirname, './styleguide/styleguide.wrapper')
  },
  template: './styleguide/styleguide.template.html',
  editorConfig: { theme: 'cobalt' },  
  theme,
  styles,
  sections: [
    {
      name: '',
      content: './styleguide/Docs.md'
    },
    {
      name: 'Installation',
      content: './styleguide/Installation.md'
    },
    {
      name: 'Usage',
      content: './styleguide/Usage.md'
    },
    {
      name: 'Search adapters',
      content: './styleguide/SearchAdapters.md'
    },
    {
      name: 'Query monitoring',
      components: 'src/components/Alert/*.js'
    },
    {
      name: 'Snippet fields',
      components: 'src/components/Fields/*/*.js'
    }
  ],
  require: [
    // path.resolve(__dirname, './setup.js'),
    path.join(__dirname, './style/core.scss'),
    // path.resolve(__dirname, './src/index.js')
  ],
  getComponentPathLine: (componentPath) => {
    const dirname = path.dirname(componentPath, '.js')
    const name = dirname.split('/').slice(-1)[0]
    const componentName = upperFirst(camelCase(name))
    const libDirName = dirname.replace(/src/gi, 'lib')

    return `import ${componentName} from '@olasearch/core/${libDirName}'`
  },
  webpackConfig: {
    // crossOriginLoading: true,
    resolve: {
      alias: {
        'olasearchconfig': path.join(__dirname, 'styleguide/styleguide.olaconfig'),
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
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        }
      ]
    }
  }
}

