const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = {
    configureWebpack: {
        plugins: [
            new CompressionWebpackPlugin({
                filename: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.(js|css)$/,
            })
        ]
    },
    // configureWebpack: {
    //     optimization: {
    //         splitChunks: {
    //             minSize: 10000,
    //             maxSize: 200000,
    //         }
    //     },
    //     performance: {
    //         maxEntrypointSize: 512000,
    //         maxAssetSize: 512000
    //     },
    // },

    // configureWebpack: {
    //     optimization: {
    //         runtimeChunk: 'single',
    //         splitChunks: {
    //             chunks: 'all',
    //             maxInitialRequests: Infinity,
    //             minSize: 0,
    //             cacheGroups: {
    //                 vendor: {
    //                     test: /[\\/]node_modules[\\/]/,
    //                     name(module) {
    //                         const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
    //                         return `npm.${packageName.replace('@', '')}`;
    //                     },
    //                 },
    //             },
    //         },
    //     },
    // },
    pluginOptions: {
        i18n: {
            locale: 'ar',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: true
        }
    }
};
