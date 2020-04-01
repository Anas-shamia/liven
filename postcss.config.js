const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');
module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        cssnano({
            preset: 'default'
        }),
        purgecss({
            // paths: [
            //     'node_modules/vue-select/**/*.js',
            // ],

            // content: ['./layouts/**/*.html', './src/**/*.vue', './src/**/*.jsx', './node_modules/vue-select/**/*.js'],
            content: ['index.html', '**/*.js', '**/*.html', '**/*.vue'],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
            // (/[A-z0-9-:\\/%-.]+/g) || []
        })
    ]
};

// const PurgecssPlugin = require('purgecss-webpack-plugin');
// const glob = require('glob-all');
// const path = require('path');
// const cssnano = require('cssnano');
//
// module.exports = {
//     configureWebpack: {
//         // Merged into the final Webpack config
//         plugins: [
//             require('tailwindcss'),
//             require('autoprefixer'),
//             cssnano({
//                 preset: 'default'
//             }),
//             new PurgecssPlugin({
//                 paths: glob.sync([
//                     path.join(__dirname, './src/index.html'),
//                     path.join(__dirname, './src/**/*.vue'),
//                     path.join(__dirname, './src/**/*.js'),
//                     path.join(__dirname, './node_modules/vue-select/**/*.js')
//                 ]),
//                 extractors: [
//                     {
//                         extractor: class TailwindExtractor {
//                             static extract(content) {
//                                 return content.match(/[A-z0-9-_:\/]+/g) || [];
//                             }
//                         },
//                         extensions: ['html', 'vue', 'js'],
//                     },
//                 ],
//             })
//         ]
//     }
// }
