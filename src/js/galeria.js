document.addEventListener('DOMContentLoaded', function(){ // Espera a que todo el documento este listo
    crearGaleria();
})

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= 12; i++){
        const imagen = document.createElement('IMG'); // Creo la imagen
        imagen.src = `build/img/thumb/${i}.webp`; // Le paso como src la direccion y los numeros
        imagen.dataset.imagenId = i; // Le paso la id de la imagen

        // Añadir la funcion de mostrarImagen
        imagen.onclick = mostrarImagen;

        const lista = document.createElement('LI'); // Creo un li que almacena la imagen
        lista.appendChild(imagen); // Inserto la imagen

        galeria.appendChild(lista); // Agrego los LI a la galeria imagenes
    }
}

function mostrarImagen(e){
    const id = parseInt( e.target.dataset.imagenId ); // Transforma el id a int ya que lo devuelve como string
    // e: lo que recibe, 
    // dataset: lo que lee el html
    // imagenId: el id que le pasamos (i)

    const imagen = document.createElement('IMG'); // Creo el HTML de la imagen

    imagen.src = `build/img/grande/${id}.webp`; // Le inserto la direccion

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen); // Inserto la imagen en el div
    overlay.classList.add('overlay'); // Le doy una clase al overlay

    // Cuando se da click, cierra la imagen
    overlay.onclick = function(){
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    // Boton para cerrar la imagen
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');

    overlay.appendChild(cerrarImagen);

    // Cuando se presiona, se cierra la imagen
    cerrarImagen.onclick = function () {
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    // Mostrar en el HTML
    const body = document.querySelector('body');

    body.appendChild(overlay); // Inserto el overlay en el body
    body.classList.add('fijar-body');

}