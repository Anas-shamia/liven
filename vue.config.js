const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require('zlib');

module.exports = {
    configureWebpack: {
        plugins: [
            // new CompressionPlugin({
            //     filename: "[path].gz[query]",
            //     algorithm: "gzip",
            //     test: /\.(js|css)$/,
            //     cache: true,
            // })
            new CompressionPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0.8,
            }),
            new CompressionPlugin({
                filename: '[path].br[query]',
                algorithm: 'brotliCompress',
                test: /\.(js|css|html|svg)$/,
                compressionOptions: {
                    level: 11,
                },
                threshold: 10240,
                minRatio: 0.8,
            }),
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
