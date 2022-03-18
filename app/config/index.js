const config = {
    host: process.env.HOST || '',
    mode: process.env.NODE_ENV,
    dev: process.env.NODE_ENV === 'development'
}

export default config