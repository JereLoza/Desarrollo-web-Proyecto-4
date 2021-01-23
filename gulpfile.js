const { series, src, dest, watch, parallel } = require('gulp'); // Con src se puede compilar sass y con dest, los destinos. Watch escucha si cambia y realiza una tarea determinada
// Es solo sass porque tiene solamente una funcion, en caso de tener multiples se pone entre {  }.
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin'); // Llamo a la dependencia image-min
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

// Funcion que compila SASS

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss', // No pasa nada porque los archivos que empiezan con _ pertenecen al app.scss
    js: 'src/js/**/*.js'
}

function css() {
    return src(paths.scss)
        .pipe(sass({
            outputStyle: 'expanded' // Con esto se pone el tipado del texto normal
        }))
        .pipe(dest('./build/css'));
}

function minificarcss() {
    return src(paths.scss)
        .pipe(sass({
            outputStyle: 'compressed' // Con esto se pone el tipado comprimido
        }))
        .pipe(dest('./build/css'));
}

function javascript() {
    return src(paths.js)
        .pipe( concat('bundle.js') ) // Junta todos los archivos de js en este
        .pipe( dest('./build/js') ); // Lo guarda en esta direccion
}

function imagenes() {
    return src(paths.imagenes) // Busca las imagenes a minificar
        .pipe( imagemin() ) // Ejecuta la accion
        .pipe( dest('./build/img') ) // Guarda en el destino seleccionado
        .pipe ( notify({ message: 'Imagen Minificada' }) ); // Agrega una notificacion para saber que es lo que esta pasando
}

function versionWebp() {
    return src(paths.imagenes) // Busca las imagenes a transformar en webp
        .pipe( webp() ) // Llama a la funcion de webp
        .pipe( dest('./build/img') ) // Definimos el destino a alojar las imagenes
        .pipe( notify({message: 'Version Webp lista'})); // Notifica que está lista la imagen
}

function watchArchivos() {
    watch(paths.scss, css); // En watch se pasa como primer parametro el archivo a escuchar y como segundo la accion a realizar.
    // Con el ** lee la carpeta actual
    // Con el * lee todos los archivos con esa extension
    watch(paths.js, javascript); // Escucha los cambios de js
}

exports.css = css;
exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = series( css, javascript, imagenes, versionWebp, watchArchivos );