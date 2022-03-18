const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const fs = require('fs');
const path = require('path');
const utils = require('./root').utils;

const configSvg = {
    shape: {
        spacing: {
            padding: 2
        }
    },
    mode: {
        view: {
            bust: true,
            render: {
                css: true
            }
        },
    }
};

const configSvgSymbol = {
    shape: {
        spacing: {
            padding: 2
        }
    },
    mode: {
        symbol: true // Activate the «symbol» mode
    }
};

// gulp.task('sprite:social', async function () {
//     gulp.src('../src/assets/icons/social/*.svg')
//         .pipe(svgSprite(configSvg))
//         .pipe(gulp.dest('../src/assets/sprite/social'));

//     gulp.src('../src/assets/icons/social/*.svg')
//         .pipe(cheerio({
//             run: function ($) {
//                 $('[fill]').removeAttr('fill');
//                 $('[stroke]').removeAttr('stroke');
//                 $('[style]').removeAttr('style');
//             },
//             parserOptions: {xmlMode: true}
//         }))
//         .pipe(replace('&gt;', '>'))
//         .pipe(svgSprite(configSvgSymbol))
//         .pipe(gulp.dest('../src/assets/sprite/social'));
// });

gulp.task('sprite:social', async function () {
    gulp.src(path.join(utils.paths.root, '/public/assets/icons/social/*.svg'))
        .pipe(svgSprite(configSvg))
        .pipe(gulp.dest(path.join(utils.paths.sprite, 'social')));
});

const build = gulp.series([
    // 'sprite:menu',
    'sprite:social'
]);

gulp.task('sprite', build);