module.exports = {
    publicPath: "",
    // devServer: {
    //     proxy: "http://api.kele8.cn/agent",
    // },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = '网易云音乐'
                return args
            })
    }
};
