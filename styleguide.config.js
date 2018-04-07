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
    // StyleGuideRenderer: path.join(__dirname, './styleguide/styleguide.wrapper')
    Wrapper: path.join(__dirname, './styleguide/styleguide.wrapper')
  },
  // template: './styleguide/styleguide.template.html',  
  editorConfig: { theme: 'cobalt' },  
  // theme,
  // styles,
  // resolver: require('react-docgen').resolver.findAllComponentDefinitions,
  context: {
    olaconfig: path.resolve(__dirname, './styleguide/styleguide.olaconfig'),    
    // SearchState: function (state) {
    //   return {
    //     AppState: state.AppState,
    //     QueryState: state.QueryState
    //   }
    // }
  },
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
      name: 'Components',
      components: () => {
        return [
          'src/components/AutoComplete/index.js',
          'src/components/AutoSuggest/index.js',
          'src/components/Geo/GeoLocation.js',
          'src/components/Geo/GeoNotify.js',
          'src/components/Sort/index.js',
          'src/components/Misc/Tag.js',
          'src/components/Pagination/index.js',
          'src/components/PerPage/index.js',
          'src/components/SearchResults/index.js',
          'src/components/Speech/index.js',
          'src/components/SpellSuggestion/index.js',
          'src/components/TermSuggestion/index.js',
          'src/components/Zone/index.js',
          'src/components/ClearAllFacets.js',
          'src/components/ContentEditable.js',
          'src/components/Error.js',
          'src/components/FilterButton.js',
        ]
      }
    },
    {
      name: 'Containers',
      components: () => {
        return [
          'src/containers/OlaProvider.js',
        ]
      }
    },
    {
      name: 'Answers',
      content: './styleguide/AnswerFormats.md',
      components: () => {
        return [
          'src/components/Answer/index.js',
          'src/components/Answer/AnswerCard.js',
          'src/components/Answer/AnswerCarousel.js',
          'src/components/Answer/AnswerList.js',
          'src/components/Answer/AnswerLineChart.js',
          'src/components/Answer/AnswerMap.js',
          'src/components/Answer/AnswerWordMap.js',
        ]
      }
    },
    {
      name: 'Snippets',
      components: './src/components/Snippets/*.js',
    },
    {
      name: 'Fields',
      components: 'src/components/Fields/*/*.js'
    },
    {
      name: 'Filters',
      components: 'src/components/FacetFilters/*.js'
    },
    {
      name: 'Query monitoring',
      components: 'src/components/Alert/*.js'
    },
    {
      name: 'Higher order components',
      components: 'src/decorators/!(index).js'
    },
    {
      name: 'Store',
      content: './styleguide/Store.md'
    },
    {
      name: 'Services',
    },
    {
      name: 'Utilities',
    },    
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
        '@olasearch/core': path.join(__dirname, './src'),
        'OlaSearch': '@olasearch/core'
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

