function mostrarImagen() {
    let tipoMascota = document.querySelector('.tipo').value;
    let imgAgregar = document.getElementById('imgAgregar');
    let rutaImagen = '';
  
    switch (tipoMascota) {
        case 'select':
            rutaImagen = 'huella.jpg';
            break;
        case 'perro':
            rutaImagen = 'perrito.jpg';
            break;
        case 'gato':
            rutaImagen = 'gata.jpg';
            break;
        case 'ave':
            rutaImagen = 'imagen_ave.jpg';
            break;
        default:
            rutaImagen = ''; // En caso de opción no válida, no se muestra ninguna imagen
    }
  
    imgAgregar.src = rutaImagen; // Actualiza la imagen de acuerdo a la ruta obtenida
}
document.querySelector('.tipo').addEventListener('change', mostrarImagen);

function bloquearFecha() {
    let fechaInput = document.querySelector('.Fecha');
    let fechaActual = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato ISO (AAAA-MM-DD)
    fechaInput.setAttribute('min', fechaActual);
}


let tarjetas = []; // Almacena todas las tarjetas

function guardar() {
    // Obtener valores del formulario
    let tipo = document.querySelector('.tipo').value;
    let nombre = document.querySelector('.NombreMascota').value;
    let propietario = document.querySelector('.Propietario').value;
    let telefono = document.querySelector('.Tlfn').value;
    let fecha = document.querySelector('.Fecha').value;
    let hora = document.querySelector('.Hora').value;
    let sintomas = document.querySelector('.sintomas').value;

    // Validar campos
    if (tipo === 'select') {
        mostrarError('.tipo', 'Por favor, seleccione un tipo de mascota');
        return;
    }
    
    if (!nombre) {
        mostrarError('.NombreMascota', 'Por favor, digite el nombre');
        return;
    }

    // Validar otros campos aquí...

    // Crear nueva tarjeta
    let nuevaTarjeta = document.createElement('div');
    nuevaTarjeta.classList.add('card');

    // Lógica para establecer la imagen de la mascota según el tipo seleccionado
    let rutaImagen = '';
    switch (tipo) {
        case 'perro':
            rutaImagen = 'perrito.jpg';
            break;
        case 'gato':
            rutaImagen = 'gata.jpg';
            break;
        case 'ave':
            rutaImagen = 'imagen_ave.jpg';
            break;
        default:
            rutaImagen = 'huella.jpg'; // Si no se selecciona un tipo válido, mostrar imagen de huella
    }

    // Crear contenido de la tarjeta
    nuevaTarjeta.innerHTML = `
    <div class="card-body">
      <img src="${rutaImagen}" alt="${tipo}">
      <h5 class="card-title">${tipo}</h5>
      <div class="card-text-wrapper">
        <p class="card-text"><b>Nombre:</b> ${nombre}</p>
        <p class="card-text"><b>Propietario:</b> ${propietario}</p>
        <p class="card-text"><b>Teléfono:</b> ${telefono}</p>
        <p class="card-text"><b>Fecha:</b> ${fecha}</p>
        <p class="card-text"><b>Hora:</b> ${hora}</p>
        <p class="card-text"><b>Síntomas:</b> ${sintomas}</p>
      </div>
      <div class="botones">
        <button class="btn btn-danger eliminar" onclick="eliminarTarjeta(this)">Eliminar</button>
        <button class="btn btn-warning editar" onclick="editarTarjeta(this)">Editar</button>
      </div>
    </div>
  `;

    // Agregar nueva tarjeta al contenedor
    let contenedorTarjetas = document.getElementById('cont');
    contenedorTarjetas.appendChild(nuevaTarjeta);

    // Agregar la nueva tarjeta al array de tarjetas
    tarjetas.push(nuevaTarjeta);

    // Limpiar campos del formulario
    limpiarCampos();
    mostrarImagen();
}

function limpiarCampos() {
    // Limpiar campos del formulario

    document.querySelector('.tipo').value = 'select';
    document.querySelector('.NombreMascota').value = '';
    document.querySelector('.Propietario').value = '';
    document.querySelector('.Tlfn').value = '';
    document.querySelector('.Fecha').value = '';
    document.querySelector('.Hora').value = '';
    document.querySelector('.sintomas').value = '';

}

function eliminarTarjeta(boton) {
    // Eliminar tarjeta del DOM
    let tarjeta = boton.parentElement.parentElement.parentElement;
    tarjeta.remove();

    // Eliminar tarjeta del array de tarjetas
    tarjetas = tarjetas.filter(t => t !== tarjeta);
}

function editarTarjeta(boton) {
    // Obtener la tarjeta a editar
    let tarjeta = boton.closest('.card');

    // Obtener los elementos dentro de la tarjeta
    let tipo = tarjeta.querySelector('h5.card-title').textContent;
    let nombre = tarjeta.querySelector('.card-text-wrapper').querySelectorAll('p')[0].textContent.split(': ')[1];
    let propietario = tarjeta.querySelector('.card-text-wrapper').querySelectorAll('p')[1].textContent.split(': ')[1];
    let telefono = tarjeta.querySelector('.card-text-wrapper').querySelectorAll('p')[2].textContent.split(': ')[1];
    let fecha = tarjeta.querySelector('.card-text-wrapper').querySelectorAll('p')[3].textContent.split(': ')[1];
    let hora = tarjeta.querySelector('.card-text-wrapper').querySelectorAll('p')[4].textContent.split(': ')[1];
    let sintomas = tarjeta.querySelector('.card-text-wrapper').querySelectorAll('p')[5].textContent.split(': ')[1];
    // Rellenar el formulario con los valores actuales
    document.querySelector('.tipo').value = tipo;
    document.querySelector('.NombreMascota').value = nombre;
    document.querySelector('.Propietario').value = propietario;
    document.querySelector('.Tlfn').value = telefono;
    document.querySelector('.Fecha').value = fecha;
    document.querySelector('.Hora').value = hora;
    document.querySelector('.sintomas').value = sintomas;

    // Eliminar la tarjeta del array de tarjetas
    tarjetas = tarjetas.filter(t => t !== tarjeta);

    // Eliminar la tarjeta del DOM
    tarjeta.remove();
}

function mostrarError(selector, mensaje) {
    let elemento = document.querySelector(selector);
    let errorElemento = elemento.nextElementSibling;
    errorElemento.textContent = mensaje;
    errorElemento.style.display = 'block';
    setTimeout(() => {
        errorElemento.textContent = '';
        errorElemento.style.display = 'none';
    }, 3000);
}
