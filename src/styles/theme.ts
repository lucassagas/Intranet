import { lighten } from 'polished'

export const themes = {
  dark: {
    background: '#000000',
    black: '#0A090E',
    darkgray: '#26252B',
    darkgrayhover: lighten(0.2, '#26252B'),
    gray3: '#37353D',
    gray: '#ADADAE',
    mediumgray: '#525255',
    grayPriceTable: '#434343',
    orange: '#FF4E00',
    white: '#FFFFFF',
    error: '#c53030',
    danger: '#f93e3e',
    dangerhover: lighten(0.1, '#f93e3e'),
    purple: '#9C2EF0',
    green: '#33B650',
    yellow: '#F0D62E'
  }
}

export type ThemeName = keyof typeof themes
export type ThemeType = typeof themes.dark
