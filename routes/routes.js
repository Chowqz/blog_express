const RoutesConf = [
    {
        path: '/user',
        middleware: './user'
    },
    {
        path: '/article',
        middleware: './article'
    }
]

const initRoutes = app => {
    RoutesConf.map(item => {
        app.use(`/api${item.path}`, require(item.middleware));
    })
}

module.exports = initRoutes;