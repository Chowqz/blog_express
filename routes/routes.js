const RoutesConf = [
    {
        path: '/user',
        router: './user'
    },
    {
        path: '/article',
        router: './article'
    },
    {
        path: '/comment',
        router: './comment'
    }
]

const initRoutes = app => {
    RoutesConf.map(item => {
        app.use(`/api${item.path}`, require(item.router));
    })
}

module.exports = initRoutes;