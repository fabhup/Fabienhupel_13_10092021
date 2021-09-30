export const apiUrl =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:3001/api/v1'
        : 'https://argentbank-backend.herokuapp.com/api/v1'

export const routerBaseName =
    process.env.NODE_ENV === 'development' ? '/' : 'Fabienhupel_13_10092021/'
