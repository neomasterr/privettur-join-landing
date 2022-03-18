const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const filters = require('nunjucks-template-loader/filters');
const path = require('path');

const rootPath = path.join(__dirname, '..');

const utils = {
    chunks: {
        index: ['app', 'main'],
        error: ['app']
    },
    paths: {
        root: rootPath,
        app: path.join(rootPath, 'app'),
        public: path.join(rootPath, 'public'),
        dist: path.join(rootPath, 'dist'),
        pages: path.join(rootPath, 'templates', 'pages'),
        templates: path.join(rootPath, 'templates'),
        postcss: path.join(rootPath, 'webpack', 'postcss.config.js'),
        sprite: path.join(rootPath, '/public/assets/sprite'),
        assets: 'assets',
        static: 'static',
        html: 'html',
        bundles: 'bundles'
    },
    filters: Object.assign(filters, {}),
    rules: {
        js: () => {
            return {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        },
        scss: () => {
            return {
                test: /\.(sa|sc|c)ss$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            esModule: false,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                config: utils.paths.postcss
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                ]
            }
        },
        nunjucks: () => {
            return {
                test: /\.(html|njk|nunjucks)$/,
                exclude: [/node_modules/, /(app)/],
                use: [
                    'html-loader',
                    {
                        loader: 'nunjucks-template-loader',
                        options: {
                            path: utils.paths.templates
                        }
                    }
                ]
            }
        }
    },
    extensions: () => {
        return ['.ts', '.tsx', '.js', '.jsx']
    },
    alias: () => {
        return {}
    }
}

exports.utils = utils