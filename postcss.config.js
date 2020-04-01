// const join = require("path").join;
// const tailwindJS = join(__dirname, "tailwind.js");
// const purgecss = require("@fullhuman/postcss-purgecss");
//
// class TailwindExtractor {
//     static extract(content) {
//         return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
//     }
// }
//
// const plugins = [require("tailwindcss"), require("autoprefixer"), ];
//
// if (process.env.NODE_ENV === "production") {
//     plugins.push(
//         purgecss({
//             content: [
//                 "./layouts/**/*.vue",
//                 "./components/**/*.vue",
//                 "./views/**/*.vue"
//             ],
//             whitelist: ["html", "body"],
//             //whitelistPatternsChildren: [/^token/, /^pre/, /^code/],
//             extractors: [
//                 {
//                     extractor: TailwindExtractor,
//                     extensions: ['html', 'vue', 'js']
//                 }
//             ]
//         })
//     );
// }
//
// module.exports = {
//     plugins
// };

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
            content: ['./layouts/**/*.html', './src/**/*.vue', './src/**/*.jsx',
                './node_modules/v-calendar/src/**/*.vue',
                './node_modules/vue-datetime/src/*.vue',
                './node_modules/vue-select/src/**/*.vue',
            ],
            // content: ['index.html', '**/*.js', '**/*.html', '**/*.vue'],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
            // (/[A-z0-9-:\\/%-.]+/g) || []
        })
    ]
};

// let glob = require("glob-all");
// let PurgecssPlugin = require("purgecss-webpack-plugin");
// let path = require("path");
//
// var plugins = [];
//
// if (process.env.NODE_ENV === "production") {
//     class TailwindExtractor {
//         static extract(content) {
//             return content.match(/[A-z0-9-:\/]+/g) || [];
//         }
//     }
//
//     var purgecss = new PurgecssPlugin({
//
//         //// Specify the locations of any files you want to scan for class names.
//         // paths: glob.sync([
//         //     path.join(__dirname, "./src/**/*.vue"),
//         //     path.join(__dirname, "./src/**/*.js"),
//         //     // path.join(__dirname, "./src/**/**/*.js"),
//         //     // path.join(__dirname, "./node_modules/vue-datetime/src/*.vue"),
//         //     path.join(__dirname, "./node_modules/v-calendar/src/components/*.vue"),
//         //     path.join(__dirname, "./node_modules/v-calendar/src/utils/*.js"),
//         // ]),
//         paths: [],
//         extractors: [
//             {
//                 extractor: TailwindExtractor,
//
//                 // Specify the file extensions to include when scanning for
//                 // class names.
//                 extensions: ["html", "js", "vue"]
//             }
//         ]
//     });
//     plugins.push(purgecss)
// }
//
//
// module.exports = {
//     configureWebpack: {
//         plugins: plugins
//     }
// };
