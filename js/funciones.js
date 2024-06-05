var vehiculos = []; 
//Recordar que el ID ES LO MISMO QUE LA PATENTE !!!!!
// vehículos de la tabla 
vehiculos.push(new vehiculo("ABC12", "Toyota", "Corolla", 2020, "Rojo", "Sedán", "Automática", "Bencina", 25000, "Al Contado", "Usado", "Bci Seguro Automotriz"));
vehiculos.push(new vehiculo("DEF45", "Nissan", "Versa", 2019, "Azul", "Sedán", "Manual", "Petroleo", 20000, "En Cuotas", "Nuevo", "Seguro Automotriz Santander"));
vehiculos.push(new vehiculo("GHI78", "Ford", "Ranger", 2018, "Blanco", "Camioneta", "Automática", "Bencina", 30000, "Credito Inteligente", "Usado", "No posee Seguro Automotriz"));

function mostrarMensaje(tipo, texto) {
    var mensajesDiv = document.getElementById("mensajes");
    mensajesDiv.innerHTML = `<div class="alert alert-${tipo}" role="alert">${texto}</div>`;
    setTimeout(() => mensajesDiv.innerHTML = '', 5000); //  Esto sirve para Ocultar mensaje después de 5 segundos o el tiempo que uno estime 
}
// Funciones  de limpiar los campos //
function limpiarCampos() {
    document.getElementById("id").value = '';
    document.getElementById("marca").value = '';
    document.getElementById("modelo").value = '';
    document.getElementById("año").value = '';
    document.getElementById("color").value = '';
    document.getElementById("tipo").value = '';
    var transmisiones = document.querySelectorAll('input[name="transmision"]');
    transmisiones.forEach(transmision => transmision.checked = false);
    document.getElementById("combustible").value = '';
    document.getElementById("precio").value = '';
    document.getElementById("financiamiento").value = '';
    var estadosVehiculo = document.querySelectorAll('input[name="extra2"]');
    estadosVehiculo.forEach(estado => estado.checked = false);
    document.getElementById("seguroVehicular").value = '';
}
//funcion de Registrar los datos de los autos 
function registrar() {
    var id = document.getElementById("id").value.trim();
    var marca = document.getElementById("marca").value.trim();
    var modelo = document.getElementById("modelo").value.trim();
    var año = document.getElementById("año").value.trim();
    var color = document.getElementById("color").value.trim();
    var tipo = document.getElementById("tipo").value.trim();
    var transmision = document.querySelector('input[name="transmision"]:checked');
    var combustible = document.getElementById("combustible").value.trim();
    var precio = document.getElementById("precio").value.trim();
    var financiamiento = document.getElementById("financiamiento").value.trim();
    var estadoVehiculo = document.querySelector('input[name="extra2"]:checked');
    var seguroVehicular = document.getElementById("seguroVehicular").value.trim();

    // Validar campos
    if (id === '' || marca === '' || modelo === '' || año === '' || color === '' || tipo === '' || !transmision || combustible === '' || precio === '' || financiamiento === '' || !estadoVehiculo || seguroVehicular === '') {
        mostrarMensaje('danger', 'Todos los campos son obligatorios');
        return;
    }
    if (id.length !== 5) {
        mostrarMensaje('danger', 'La patente debe tener 5 caracteres');
        return;
    }
    if (marca.length > 30 || modelo.length > 30 || color.length > 30) {
        mostrarMensaje('danger', 'Marca, modelo y color no deben superar los 30 caracteres');
        return;
    }
    if (isNaN(año) || isNaN(precio) || Number(precio) <= 0) {
        mostrarMensaje('danger', 'Año y precio deben ser numéricos y el precio debe ser positivo');
        return;
    }
    if (vehiculos.some(v => v.id === id)) {
        mostrarMensaje('danger', 'La Patente  ya existe');
        return;
    }

    var nuevoVehiculo = new vehiculo(id, marca, modelo, año, color, tipo, transmision.value, combustible, precio, financiamiento, estadoVehiculo.value, seguroVehicular);
    vehiculos.push(nuevoVehiculo); 

    mostrarMensaje('success', 'Vehículo registrado con éxito');
    limpiarCampos();
    listarVehiculos();
}

// aca se van a verificar  si se está obteniendo la tabla correctamente
function listarVehiculos() {
    var tabla = document.getElementById("tabladedatos");
    console.log("Tabla de datos:", tabla); 
    // Limpiar los datos 
    tabla.innerHTML = "";
// en esta parte se pondran los datos del vehiculos y si estan correctos 
    for (let i = 0; i < vehiculos.length; i++) {
        var v = vehiculos[i];
        console.log("Vehículo " + (i + 1) + ":", v); 

        var fila = "<tr>";
        fila += "<td>" + v.id + "</td>";
        fila += "<td>" + v.marca + "</td>";
        fila += "<td>" + v.modelo + "</td>";
        fila += "<td>" + v.año + "</td>";
        fila += "<td>" + v.color + "</td>";
        fila += "<td>" + v.tipo + "</td>";
        fila += "<td>" + v.transmision + "</td>";
        fila += "<td>" + v.combustible + "</td>";
        fila += "<td>" + v.precio + "</td>";
        fila += "<td>" + v.financiamiento + "</td>";
        fila += "<td>" + v.estadoVehiculo + "</td>";
        fila += "<td>" + v.seguroVehicular + "</td>";
        fila += "</tr>";
        tabla.innerHTML += fila;
    }
}
// funcion para consultar si existe el vehiculo 
function consultar() {
    var id = document.getElementById("id").value.trim();
    if (id === '') {
        mostrarMensaje('danger', 'El campo Patente  del vehiculo  es obligatorio para consultar');
        return;
    }
    var vehiculo = vehiculos.find(v => v.id === id);
    if (vehiculo) {
        document.getElementById("marca").value = vehiculo.marca;
        document.getElementById("modelo").value = vehiculo.modelo;
        document.getElementById("año").value = vehiculo.año;
        document.getElementById("color").value = vehiculo.color;
        document.getElementById("tipo").value = vehiculo.tipo;
        document.querySelector(`input[name="transmision"][value="${vehiculo.transmision}"]`).checked = true;
        document.getElementById("combustible").value = vehiculo.combustible;
        document.getElementById("precio").value = vehiculo.precio;
        document.getElementById("financiamiento").value = vehiculo.financiamiento;
        document.querySelector(`input[name="extra2"][value="${vehiculo.estadoVehiculo}"]`).checked = true;
        document.getElementById("seguroVehicular").value = vehiculo.seguroVehicular;
        mostrarMensaje('info', 'Vehículo encontrado. Puede modificarlo o eliminarlo.');
    } else {
        limpiarCampos();
        document.getElementById("id").value = id;
        mostrarMensaje('warning', 'Vehículo no encontrado. Puede registrarlo.');
    }
}
//funcion para modificar los Vehiculos 
function modificar() {
    var id = document.getElementById("id").value.trim();
    var vehiculoIndex = vehiculos.findIndex(v => v.id === id);
    if (vehiculoIndex === -1) {
        mostrarMensaje('danger', 'Vehículo no encontrado para modificar');
        return;
    }

    var marca = document.getElementById("marca").value.trim();
    var modelo = document.getElementById("modelo").value.trim();
    var año = document.getElementById("año").value.trim();
    var color = document.getElementById("color").value.trim();
    var tipo = document.getElementById("tipo").value.trim();
    var transmision = document.querySelector('input[name="transmision"]:checked');
    var combustible = document.getElementById("combustible").value.trim();
    var precio = document.getElementById("precio").value.trim();
    var financiamiento = document.getElementById("financiamiento").value.trim();
    var estadoVehiculo = document.querySelector('input[name="extra2"]:checked');
    var seguroVehicular = document.getElementById("seguroVehicular").value.trim();

    // El id es lo mismo que la patente del vehiculo 
    if (id === '' || marca === '' || modelo === '' || año === '' || color === '' || tipo === '' || !transmision || combustible === '' || precio === '' || financiamiento === '' || !estadoVehiculo || seguroVehicular === '') {
        mostrarMensaje('danger', 'Todos los campos son obligatorios');
        return;
    }
    if (marca.length > 30 || modelo.length > 30 || color.length > 30) {
        mostrarMensaje('danger', 'Marca, modelo y color no deben superar los 30 caracteres');
        return;
    }
    if (isNaN(año) || isNaN(precio) || Number(precio) <= 0) {
        mostrarMensaje('danger', 'Año y precio deben ser numéricos y el precio debe ser positivo');
        return;
    }

    vehiculos[vehiculoIndex] = new vehiculo(id, marca, modelo, año, color, tipo, transmision.value, combustible, precio, financiamiento, estadoVehiculo.value, seguroVehicular);
    mostrarMensaje('success', 'Vehículo modificado con éxito');
    limpiarCampos();
    listarVehiculos();
}

function eliminar() {
    var id = document.getElementById("id").value.trim();
    var vehiculoIndex = vehiculos.findIndex(v => v.id === id);
    if (vehiculoIndex === -1) {
        mostrarMensaje('danger', 'Vehículo no encontrado para eliminar');
        return;
    }

    vehiculos.splice(vehiculoIndex, 1);
    mostrarMensaje('success', 'Vehículo eliminado con éxito');
    limpiarCampos();
    listarVehiculos();
}
