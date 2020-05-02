module.exports = {
    configureWebpack: {
        optimization: {
            splitChunks: {
                minSize: 10000,
                maxSize: 200000,
            }
        }
    },
    pluginOptions: {
        i18n: {
            locale: 'ar',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: true
        }
    }
};
