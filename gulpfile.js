
/*importar funciones de gulp:

src:sirve para identificar un archivo o una serie de archivos. 

dest:permite almacenar algo en una carpeta destino. */

// watch: guarda los cambios automaticamente 

const {src, dest,watch,parallel} = require("gulp");

//importar el conector de gulp-sass
const sass = require('gulp-sass')(require('sass'));

//importar gulp-plumber
const plumber = require('gulp-plumber');

//importar gulp-webp convertidor a distintos formatos(png,jpg,webp)
const webp = require('gulp-webp');

//importar gulp-imagenmin aligera las imagenes
const imagemin = require('gulp-imagemin');

//importar gulp-imagenmin aligera las imagenes
const cache = require('gulp-cache');

//importar gulp-avif para converitir imagenes en avif
const avif = require('gulp-avif');


// mejorar el css
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

// mejorar js
const terser = require('gulp-terser-js');

// se pasa done para que el codigo se detenga
function css(done){
    

    src('src/scss/**/*.scss') // identificar todos archivos .SCSS a compilar
    .pipe(sourcemaps.init())
    .pipe(plumber()) // eplumber evita que watch de detenga 
    .pipe(sass())// Compilarlo
    .pipe(  postcss([autoprefixer(), cssnano() ]) ) // para mejorar el css
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/css")) //almacenarlo en el disco duro
    done();// callback le indica a gulp cuando llegamos al final
}


// convertidor a webp
function versionWebp(done) {
    
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
    .pipe( webp(opciones) ) // pasamos la calidad
    .pipe( dest('build/img'))// le indicamos donde guardara las imagenes con el nuevo formato

    done();
}


// convertidor a webp
function versionAvif(done) {
    
    const opciones = {
        quality: 50
    };


    src('src/img/**/*.{png,jpg}')
    .pipe( avif(opciones) ) // pasamos la calidad
    .pipe( dest('build/img'))// le indicamos donde guardara las imagenes con el nuevo formato

    done();
}


// aligera las imagenes
function imagenes(done) {

    const opciones = {
        optimizationLevel : 3 // optimiza las imagenes a un nivel 3 que las aligera mucho
    }

    src('src/img/**/*.{png,jpg}')
    .pipe(cache(imagemin(opciones)))
    .pipe( dest('build/img'))// le indicamos donde guardara las imagenes con el nuevo formato
}

// ejecutar js
function javascript(done) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init()) // iniciamos el sorucemaps
        .pipe(terser() ) // comprime y mejora js
        .pipe(sourcemaps.write('.')) // para que sea mas legibre lo que hace le terser
        .pipe(dest('build/js'));

    done();
}

function dev(done) {

    watch('src/scss/**/*.scss',css)// los cambios que se hagan en todos los archivos .scss se compilaran automaticamente
    watch('src/js/**/*.js',javascript)// los cambios que se hagan en todos los archivos .js se compilaran automaticamente
    done();// callback le indica a gulp cuando llegamos al final
}

//llamamos a las funciones
exports.css = css;
exports.imagenes = imagenes;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev); // con parallel ejecutamos n tareas  al mismo tiempo
exports.js = javascript;
exports.versionWebp = versionWebp;
