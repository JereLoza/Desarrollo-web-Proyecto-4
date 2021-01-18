const { series, src, dest, watch } = require('gulp'); // Con src se puede compilar sass y con dest, los destinos. Watch escucha si cambia y realiza una tarea determinada
// Es solo sass porque tiene solamente una funcion, en caso de tener multiples se pone entre {  }.
const sass = require('gulp-sass');

// Funcion que compila SASS

function css() {
    return src('src/scss/app.scss')
        .pipe(sass({
            outputStyle: 'expanded' // Con esto se pone el tipado del texto normal
        }))
        .pipe(dest('./build/css'));
}

function minificarcss() {
    return src('src/scss/app.scss')
        .pipe(sass({
            outputStyle: 'compressed' // Con esto se pone el tipado comprimido
        }))
        .pipe(dest('./build/css'));
}

function watchArchivos() {
    watch('src/scss/**/*.scss', css); // En watch se pasa como primer parametro el archivo a escuchar y como segundo la accion a realizar.
    // Con el ** lee la carpeta actual
    // Con el * lee todos los archivos con esa extension
}

exports.css = css;
exports.minificarcss = minificarcss;
exports.watchArchivos = watchArchivos;