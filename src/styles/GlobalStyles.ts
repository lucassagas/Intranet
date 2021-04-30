import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
* {
  padding: 0;
  margin: 0;
  outline: 0;
  box-sizing: border-box;
}

#nprogress .peg {
  display: none !important;
}

#nprogress .bar {
  background: var(--orange);
  height: 3px;
  box-shadow: none;
}

html {
  @media(max-width: 1080px) {
    font-size: 93.75%;
  }

  @media(max-width: 720px) {
    font-size: 87.5%;
  }

  @media(max-width: 430px) {
    font-size: 81.25%
  }
}

body {
  background: var(--background);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;

}

body, input, textarea, button {
  font-family: Montserrat, sans-serif;
  color: var(--white);
  font-weight: 400;
  font-size: 0.9rem;

}

button {
  cursor: pointer;
}

[disabled] {
  opacity: 0.6;
  cursor: not-allowed
}


:root {
    ${props => {
      const theme = props.theme
      let append = ''
      Object.entries(theme).forEach(([prop, value]) => {
        append += `--${prop}: ${value};`
      })
      return append
    }}
  }
`
