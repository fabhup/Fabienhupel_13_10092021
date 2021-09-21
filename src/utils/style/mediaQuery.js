import { css } from 'styled-components'

// MediaQuery rules for apply different style on styled components for responsive design

let mediaQuery = {
    breakpoints: {
        mobile: { value: 450 },
        tablet: { value: 720 },
        desktop: { value: 920 },
    },
}

mediaQuery.max = {}
Object.keys(mediaQuery.breakpoints).map((bp) => {
    mediaQuery.max[bp] = (...args) => css`
        @media only screen and (max-width: ${mediaQuery.breakpoints[bp].value /
            16}em) {
            ${css(...args)}
        }
    `
})

mediaQuery.min = {}
Object.keys(mediaQuery.breakpoints).map((bp) => {
    mediaQuery.min[bp] = (...args) => css`
        @media only screen and (min-width: ${mediaQuery.breakpoints[bp].value /
            16}em) {
            ${css(...args)}
        }
    `
})

export default mediaQuery
