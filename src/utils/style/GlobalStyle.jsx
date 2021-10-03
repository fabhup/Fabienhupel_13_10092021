import { createGlobalStyle } from 'styled-components'
import AvenirHeavy from "../fonts/Avenir-Heavy/Avenir-Heavy.ttf";
import colors from './color'
import { keyframes } from 'styled-components'

// GlobalStyle component to manage the style used for all the App

const RootLoading = keyframes`
    0% { opacity: 0;
         transform: scaleY(0.8);}
    100% {
        opacity: 1;
        transform: scaleY(1)
    }
`

const StyledGlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Avenir';
        src: url(${AvenirHeavy}) format('ttf'),
    }

    *, *:before, *:after {
        padding: 0;
        margin: 0;
        box-sizing: inherit;
    }
    
    html {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: ${colors.secondary};
    }
    
    body {
        margin: 0;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    a {
        text-decoration: none;
      }

    .sr-only {
        border: 0 !important;
        clip: rect(1px, 1px, 1px, 1px) !important; /* 1 */
        -webkit-clip-path: inset(50%) !important;
        clip-path: inset(50%) !important; /* 2 */
        height: 1px !important;
        margin: -1px !important;
        overflow: hidden !important;
        padding: 0 !important;
        position: absolute !important;
        width: 1px !important;
        white-space: nowrap !important; /* 3 */
    }

    main {
        flex: 1;
    }

    h1 {
        display: block;
        font-size: 2em;
        margin-block-start: 0.67em;
        margin-block-end: 0.67em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
    }

    h3 {
        display: block;
        font-size: 1.17em;
        margin: 1em 0;
        font-weight: bold;
    }

    #root {
        margin: 0;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        justify-content:center;
        visibiity: visible;
        animation: ${RootLoading} 400ms ease-in-out;
        transform-origin: 0% 0%;
        transform: scaleY(1);
    }
`

export default function GlobalStyle() {
  return <StyledGlobalStyle />
}
