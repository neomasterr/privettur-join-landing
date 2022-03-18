const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const htmlPlugin = require('nunjucks-template-loader/htmlPlugin');
const express = require('express');
const path = require('path');
const utils = require('./root').utils;

module.exports = (env, argv) => {
    const prod = argv.mode === 'production';
    const dev = argv.mode === 'development';
    const serve = argv.serve;
    const data = {
        title: 'ПриветТур! - отельеры'
    };

    const config = {
        entry: {
            app: [
                `${utils.paths.app}/index`
            ],
            main: [
                `${utils.paths.app}/pages/main/index.js`,
                `${utils.paths.app}/pages/main/index.scss`
            ],
            error: [
                `${utils.paths.app}/pages/error/index.scss`
            ]
        },
        output: {
            path: utils.paths.dist['app'],
            filename: `${utils.paths.bundles}/js/[name].${prod ? '[chunkhash:5].' : ''}js`,
            chunkFilename: `${utils.paths.bundles}/js/[name].${prod ? '[chunkhash:5].' : ''}js`,
            publicPath: '/'
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: `${utils.paths.bundles}/css/[name].${prod ? '[contenthash:5].' : ''}css`,
                chunkFilename: `${utils.paths.bundles}/css/[id].${prod ? '[contenthash:5].' : ''}css`,
            }),
            new webpack.ProgressPlugin(),
            new FixStyleOnlyEntriesPlugin(),
            new CleanWebpackPlugin(
                {
                    cleanStaleWebpackAssets: false,
                    cleanAfterEveryBuildPatterns: ["!html", "!html/**/*", "*.json", "*.hot-update.json", "*.hot-update.js"]
                }
            ),
            ...htmlPlugin({
                pagesPath: utils.paths.pages,
                templatePath: utils.paths.templates,
                outputPath: path.join(__dirname, '..', 'dist', utils.paths.html),
                data,
                filters: utils.filters,
            }, {
                chunks: utils.chunks
            })
        ],
        resolve: {
            extensions: utils.extensions(),
            alias: utils.alias()
        },
        performance: {
            hints: false,
        },
        watchOptions: {
            ignored: /node_modules/
        },
        module: {
            rules: [
                utils.rules.scss(),
                utils.rules.js(),
                utils.rules.nunjucks()
            ]
        }
    }

    if (prod) {
        config.plugins.push(new CopyWebpackPlugin({
            patterns: [
                { from: `${utils.paths.public}/${utils.paths.assets}/`, to: `${utils.paths.assets}/` },
                { from: `${utils.paths.public}/${utils.paths.static}/`, to: `${utils.paths.static}/` }
            ]
        }))
    }

    if (prod) {
        config.mode = 'production';
        config.plugins = config.plugins.concat([
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    discardComments: {
                        removeAll: true
                    }
                },
                canPrint: true
            }),
        ]);
        config.optimization = {
            namedChunks: true,
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    default: false,
                    vendors: false,
                    // vendors: {
                    //     test: /[\\/]node_modules[\\/]/,
                    //     name: "vendors",
                    //     chunks: 'all'
                    // },
                },
            },
            minimize: true
        };
    }

    if (dev) {
        config.mode = 'development';
        config.devtool = 'inline-source-map';

        if (serve) {
            config.devServer = {
                // port: 4200,
                writeToDisk: true,
                compress: true,
                liveReload: true,
                hot: true,
                historyApiFallback: {
                    rewrites: [
                        // { from: /^\/$/, to: `/${utils.paths.html}/index.html` },
                        { from: /(.*)/, to: `/${utils.paths.html}/error/index.html` }
                    ],
                    disableDotRule: true,
                },
                watchContentBase: true,
                overlay: true,
                contentBase: path.join(utils.paths.dist, utils.paths.html),
                inline: true,
                disableHostCheck: true,
                stats: {
                    colors: true
                },
                before: (app) => {
                    app.use('/assets/', express.static(path.join(utils.paths.public, utils.paths.assets)));
                    app.use('/static/', express.static(path.join(utils.paths.public, utils.paths.static)));
                }
            };
        }
    }

    return config
};
