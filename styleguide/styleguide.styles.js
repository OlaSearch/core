const rhythm = (value = 1, unit = 'rem', basis = 1.5) => (
  `${basis * value}${unit}`
)

const colors = {
  light: '#fff',
  dark: '#000',
  grey: '#7a898f',
  lightGrey: '#aec0c6',
  paleGrey: '#ebf1f3',
  primary: '#2579DA',
  secondary: '#ad29b6',
  tertiary: '#203a44',
  danger: '#d9534f'
}

const theme = {
  color: {
    baseBackground: colors.light,
    border: colors.paleGrey,
    codeBackground: colors.paleGrey,
    error: colors.danger,
    light: colors.grey,
    lightest: colors.lightGrey,
    name: colors.primary,
    type: colors.secondary,
    base: colors.dark,
    link: colors.primary,
    linkHover: colors.tertiary,
    sidebarBackground: colors.primary
  },
  fontFamily: {
    base: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    // monospace: 'Consolas, "Liberation Mono", Menlo, monospace'
  },
  fontSize: {
    base: 15,
    text: 16,
    small: 13,
    h1: 30,
    h2: 24,
    h3: 18,
    h4: 18,
    h5: 16,
    h6: 16
  },
  maxWidth: 880,
  sidebarWidth: 230
}

const styles = {
  ComponentsList: {
    heading: {
      fontWeight: '600 !important'
    }
  },
  Logo: {
    logo: {
      color: colors.light
    }
  },
  Heading: {
    heading1: {
      display: 'block',
      position: 'relative',
      paddingBottom: rhythm(0.75),
      marginBottom: rhythm(0.75),
      fontWeight: 700,
      '&:before': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: rhythm(3),
        height: '4px',
        backgroundColor: colors.primary,
        borderRadius: '4px'
      },
      '& > a': {
        fontWeight: '700 !important'
      }
    },
    heading2: {
      marginBottom: rhythm(0.5),
      fontWeight: 600,
    },
    heading3: {
      borderBottom: `thin solid ${colors.lightGrey}`,
      paddingBottom: rhythm(0.25),
      marginBottom: rhythm(1),
      textTransform: 'uppercase',
      fontWeight: '700',
      paddingTop: rhythm(1),
    }
  },
  ReactComponent: {
    tabs: {
      backgroundColor: colors.paleGrey,
      padding: `${rhythm(0.5)} ${rhythm(1)}`
    },
    tabButtons: {
      marginBottom: 0
    }
  },
  SectionHeading: {
    sectionName: {
      display: 'block',
      paddingTop: `${rhythm(1)} !important`,
      textDecoration: 'none !important',
      '&:hover': {
        opacity: 0.75
      }
    }
  },
  StyleGuide: {
    content: {
      paddingTop: rhythm(2.5)
    },
    logo: {
      backgroundColor: 'rgba(0,0,0,0.125)',
      borderBottom: 'thin solid rgba(0,0,0,0.1)'
    },
    sidebar: {
      '& li > a': {
        color: `${colors.light} !important`
      }
    }
  },
  TabButton: {
    button: {
      width: '100%'
    },
    isActive: {
      border: 0
    }
  },
  Table: {
    table: {
      marginTop: rhythm(0.5),
      marginBottom: rhythm(0.5)
    },
    cellHeading: {
      borderBottom: `thin solid ${colors.lightGrey}`
    },
    cell: {
      paddingBottom: 0,
      '& p': {
        marginBottom: `${rhythm(0.125)} !important`
      },
      '& div[class*="para"]': {
        marginBottom: `${rhythm(0.125)} !important`
      }
    }
  }
}

module.exports = {
  styles: styles,
  theme: theme
}