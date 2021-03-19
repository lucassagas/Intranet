export const themes = {
  dark: {
    background: '#000000',
    black: '#0A090E',
    darkgray: '#26252B',
    gray: '#ADADAE',
    orange: '#FF4E00',
    white: '#FFFFFF'
  }
}

export type ThemeName = keyof typeof themes
export type ThemeType = typeof themes.dark
