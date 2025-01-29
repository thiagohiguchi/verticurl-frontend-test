const { src, dest, series, parallel, watch } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
// const cssnano = require('cssnano');
// const autoprefixer = require('gulp-autoprefixer');
// const minify = require('gulp-minify-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const gulpif = require('gulp-if');
const fs = require('fs');
const path = require('path');

// Environment variables
const isProduction = process.env.NODE_ENV === 'production';
const _gParams = {
  FILE_PREFIX: isProduction ? '/dist/' : '/',
  IMG_PREFIX_URL: isProduction ? 'https://thiagohiguchi.github.io/' : '/',
};

// Paths
const paths = {
  src: 'src',
  dist: 'dist',
  pug: 'src/pug/**/*.pug',
  sass: 'src/sass/**/*.scss',
  js: 'src/js/**/*.js',
  images: 'src/images/**/*',
  assets: 'src/assets/**/*',
  public: 'public',
};

// Clean the output directory
function cleanDist() {
  return src(paths.dist, { allowEmpty: true, read: false }).pipe(clean());
}

// Compile Pug files into HTML
function compilePug() {
  return src(paths.pug)
    .pipe(
      pug({
        pretty: !isProduction, // Minify HTML if in production mode
        locals: _gParams, // Pass environment variables to Pug
      })
    )
    .pipe(dest(paths.dist))
    .pipe(browserSync.stream());
}

// Compile Sass files into CSS
function compileSass() {
  return (
    src(paths.sass)
      .pipe(
        sass({
          loadPaths: ['./src/sass'],
          outputStyle: 'compressed',
          indentWidth: 0,
        }).on('error', sass.logError) // Compile Sass
      )
      // .pipe(autoprefixer('last 2 version'))
      // .pipe(minify())
      .pipe(rename({ suffix: '.min' })) // Add .min suffix for production builds
      .pipe(dest(`${paths.dist}/css`, { overwrite: true })) // Overwrite existing files
      .pipe(browserSync.stream())
  );
}

// Transpile and minify JavaScript
function compileJs() {
  return src(paths.js)
    .pipe(
      babel({
        presets: ['@babel/preset-env'], // Transpile with Babel
      })
    )
    .pipe(gulpif(isProduction, uglify())) // Minify if in production mode
    .pipe(dest(`${paths.dist}/js`))
    .pipe(browserSync.stream());
}

// Optimize images
function optimizeImages() {
  return src(paths.images)
    .pipe(
      imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true,
      })
    )
    .pipe(dest(`${paths.dist}/images`));
}

// Copy static assets
function copyAssets() {
  return src(paths.assets).pipe(dest(`${paths.dist}/assets`));
}

// Copy public folder content (e.g., static files)
function copyPublic() {
  const files = fs.readdirSync(paths.public + '/');

  // If no files, log and exit successfully
  console.log(`files.length`, files.length);
  if (files.length <= 0) {
    console.log('No files found. Task completed successfully.');
    return Promise.resolve(); // End task successfully if no files
  }

  return src(paths.public + '/**/*', { allowEmpty: true })
    .pipe(dest(paths.dist))
    .on('end', () => {
      console.log('Task completed successfully (even if empty)');
    });
}

// Watch files for changes
function devWatch() {
  browserSync.init({
    server: {
      baseDir: paths.dist,
    },
    port: 9000,
  });

  watch(paths.pug, compilePug);
  watch(paths.sass, compileSass);
  watch(paths.js, compileJs);
  watch(paths.images, optimizeImages);
  watch(paths.assets, copyAssets);
  // watch(paths.public, copyPublic).on('change', browserSync.reload);
}

// Build task
const build = series(
  cleanDist,
  parallel(
    compilePug,
    compileSass,
    compileJs,
    optimizeImages,
    copyAssets
    // copyPublic
  )
);

// Default task
exports.default = build;

// Dev task with watch
exports.dev = series(build, devWatch);
