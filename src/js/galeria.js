
// agregamos un evento 
document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

// donde llamaremoss todas las funciones
function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();
}

// funcion para fijar la navegacion en un punto exacto de la pagina
function navegacionFija() {
    // seleccionmaos el header
    const barra = document.querySelector('.header');
    // seleccionmaos el contenedor sobre-festival
    const sobreFestival = document.querySelector('.sobre-festival');
     // seleccionmaos el body de la pagina
    const body = document.querySelector('body');

    // agregamos un evento  de tipo scroll
    window.addEventListener('scroll', function() {
        // cuando la barra de abajo del navegador toque el contenedor sobre-festival me va agregar un clase
        if (sobreFestival.getBoundingClientRect().bottom < 0) {
            // agregamos una clase al header
            barra.classList.add('fijo');
               // agregamos una clase al body
            body.classList.add('bodyScroll');
        } else {
            // eliminamos la  clase al header
            barra.classList.remove('fijo');
            // eliminamos la  clase al body
            body.classList.remove('bodyScroll');
        }
    })

}

// funcion para que los enlaces nos lleven a las secciones de nuestra pagina
function scrollNav() {
    // seleccionamos el contenedor que contiene los enlaces
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    
    // recorremos con un forEach todos los enlaces
    enlaces.forEach(enlace => {
        // agregamos un evento de tipo click 
        enlace.addEventListener('click', function(e){
            // eliminar el efecto por default  
            e.preventDefault();

            // seleccionamos el href del enlace
            const seccionScroll = e.target.attributes.href.value;  
            const seccion = document.querySelector(seccionScroll);

            // agregamos el efecto smooth para que los enlaces nos lleven a las diferentes secciones de nuestra pagina
            seccion.scrollIntoView({behavior: "smooth"});
        });
    });
}

// funcion para crear el html de una galeria
function crearGaleria() {
    // seleccionamos la clase del ul donde vamos a crear la galeria 
    const galeria = document.querySelector('.galeria-imagenes');

    // creamos un for para recorrer todas las imagenes que tenemos
    for (let i = 1; i <= 12; i++) {

        // creamos la etiqueta <picture></picture>
        const imagen = document.createElement('picture')

        // le agregamos el contenido a la etiqueta picture

        // nota. ${i} es para que recorrar todos los elementos del 1 al 12, ejemplo 1.jpg, 2.jpg hasta 12.jpg lo mismo con avif y webp.

        imagen.innerHTML = `
            <source srcset = "build/img/thumb/${i}.avif" type = "image/avif" >
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg"alt="imagen1"></img>
        `;

        // agregamos un evento de tipo onclick , cuando nosotros le dimos click a la imagen
        imagen.onclick = ()=> mostrarImagen(i);

        //agremamos las etiquetas picture que creamos al html de nuestra pagina
        galeria.appendChild(imagen);
    }
}

// Muestra un moda con la imagen en grande y  mejor calidad
function mostrarImagen(id){

     // creamos la etiqueta <picture></picture>
     const imagen = document.createElement('picture')
    
     // le agregamos el contenido a la etiqueta picture
     // nota. ${id} es para que recorrar todos los elementos del 1 al 12, ejemplo 1.jpg, 2.jpg hasta 12.jpg lo mismo con avif y webp.
    imagen.innerHTML = `
            <source srcset = "build/img/grande/${id}.avif" type = "image/avif" >
            <source srcset="build/img/grande/${id}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg"alt="imagen1"></img>
        `;

        // creamos un div
        const overlay = document.createElement('DIV')
        // lo agregamos al html a la clase .galeria-imagenes
        overlay.appendChild(imagen);
        // le agregamos una clases
        overlay.classList.add('overlay');
        // cerrar el overlay al dar click fuera de la imagen
        overlay.onclick = function() {
             // eliminar el overlay
             const body = document.querySelector('body');
             body.classList.remove('fijar-modal');
             overlay.remove();
        }

        // seleccionamos la etiqueta body de nuestra pagina
        const body = document.querySelector('body');


        // boton para cerra el modal 
        // creamos el elemento
        const cerrarModal = document.createElement('P')
        // agregamos un texto
        cerrarModal.textContent = "X";
        // agregamos una clase
        cerrarModal.classList.add('btn-cerrar')

        //funcion para cerrar el modal
        cerrarModal.onclick = function(){
            // eliminar el overlay
            overlay.remove();
            body.classList.remove('fijar-modal');
        }

        // agregamos el elemento que creamos al overlay
        overlay.appendChild(cerrarModal);

        // agregamos el overlay a la etiqueta body de nuestra pagina
        body.appendChild(overlay);
        body.classList.add('fijar-modal');

}