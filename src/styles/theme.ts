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
    orange: '#FF4E00',
    white: '#FFFFFF',
    error: '#c53030'
  }
}

export type ThemeName = keyof typeof themes
export type ThemeType = typeof themes.dark
