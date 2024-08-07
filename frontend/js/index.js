import { ValidadorNumero,darDia,crearSpinner,borrarSpinner,convertirAMinusculas } from "./funciones.js";
import {TraerTabla,CrearUna,EditarPorId,EliminarPorId,EliminarTodo } from "./clases/ControllerCrypto.js";
const formulario = document.getElementById("tabla_carga");
const form_muestra = document.getElementById("form_muestra");
const btnGuardar = document.getElementById("btn");
const btnModificar = document.getElementById("btnModificar");
const btnEliminar = document.getElementById("btnEliminar");
const btnCancelar = document.getElementById("btnCancelar");
const btnBorrar = document.getElementById("btnBorrar");
const nombreInput = document.getElementById("nombre");
const simboloInput = document.getElementById("simbolo");
const precioInput = document.getElementById("precio");
const tipoInput = document.getElementById("tipo");
const cantidadInput = document.getElementById("cantidad");
const algoritmoInput = document.getElementById("algoritmo");
const sitioInput = document.getElementById("sitio");
document.addEventListener("DOMContentLoaded", onInit);


function onInit() {
    rellenarSelectTipo();
    rellenarSelectAlg();
    crearTabla();
    completarPromedios();
    crearCrypto();
    modificar();
    eliminar();
    borrarTodo();
    cancelar();
}

function rellenarSelectTipo(){
    const tipoSelect = document.getElementById('tipo');
    const tipos = ["Acuerdo de consenso", "Prueba de participación","Prueba de trabajo"];
    tipos.forEach(function (tipo) {
      const option = document.createElement('option');
      option.value = tipo.toLowerCase();
      option.textContent = tipo;
      tipoSelect.appendChild(option);
    });
}

function rellenarSelectAlg(){
    const algoritmoSelect = document.getElementById('algoritmo');
    const tipos = ["SHA-256", "Ethash","Scrypt", "X11","Ouroboros","Ripple Protocol"];
    tipos.forEach(function (tipo) {
      const option = document.createElement('option');
      option.value = tipo.toLowerCase();
      option.textContent = tipo;
      algoritmoSelect.appendChild(option);
    });
}

function completarPromedios(){
    const select_promedio = document.getElementById("promedio");
    const resultado_promedio = document.getElementById("resultado");
    select_promedio.addEventListener("change", async (event) => {
        crearSpinner();
        const listaCrypto = await TraerTabla();
        const nuevaLista = convertirAMinusculas(listaCrypto);
        const valor = select_promedio.value;
        if(valor == "sin_filtro"){
            resultado_promedio.value = "N/A";
        }else {
            const nuevaLista = listaCrypto.filter(crypto => crypto.algoritmo === valor);
            if (nuevaLista.length > 0) {
                const sumPrecio = nuevaLista.reduce((acc, crypto) => acc + crypto.precioActual, 0);
                resultado_promedio.value = (sumPrecio / nuevaLista.length).toFixed(2);
            } else {
                resultado_promedio.value = "N/A";
            }
        }
        borrarSpinner();
    });
}

function alternarForm(listaCrypto) {
    var formMuestra = document.getElementById("form_muestra");
    if (listaCrypto.length > 0) {
        formMuestra.removeAttribute('hidden');
    } else {
        formMuestra.setAttribute('hidden', '');
    }
}

async function crearTabla() {
    const tablaHeaders = document.getElementById("tabla_headers");
    const tablaBody = document.getElementById("tabla_body");
    tablaBody.innerHTML = "";
    tablaHeaders.innerHTML = "";

    try {
        crearSpinner();
        const listaCrypto = await TraerTabla();
        const nuevaLista = convertirAMinusculas(listaCrypto);
        console.log(nuevaLista);
        alternarForm(nuevaLista);
        if (nuevaLista.length === 0) return;
        const keys = Object.keys(nuevaLista[0]);
        keys.forEach(key => {
            const th = document.createElement("th");
            th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
            tablaHeaders.appendChild(th);
        });
        nuevaLista.forEach(crypto => {
            const fila = document.createElement("tr");
            keys.forEach(key => {
                const td = document.createElement("td");
                td.textContent = crypto[key];
                fila.appendChild(td);
            });
            tablaBody.appendChild(fila);
            fila.addEventListener("click", () => {
                cargarFormulario(crypto);
            });
        });
    } catch (error) {
        console.error('Error al traer los datos de la tabla:', error);
    } finally {
        borrarSpinner();
    }
}

function crearCrypto(){
    btnGuardar.addEventListener("click", async (e) => {
        e.preventDefault();
        if (!nombreInput.value || !simboloInput.value || !tipoInput.value || !precioInput.value || !cantidadInput.value || !algoritmoInput.value || !sitioInput.value) {
            alert("Por favor complete todos los campos");
            return;
        }
        if(ValidadorNumero(precioInput.value) && ValidadorNumero(cantidadInput.value)){
            const nuevaCrypto = {id: "",
                nombre: nombreInput.value,
                simbolo: simboloInput.value,
               fechaCreacion: darDia(),
                precioActual: parseInt(precioInput.value),
                consenso: tipoInput.value,
                cantidadCirculacion: parseInt(cantidadInput.value),
                algoritmo: algoritmoInput.value,
                sitioWeb: sitioInput.value};
                crearSpinner();
            try {
                const resultado = await CrearUna(nuevaCrypto);
                console.log('Criptomoneda añadida:', resultado);
                await crearTabla();
                formulario.reset();
                form_muestra.reset();
            } catch (error) {
                console.error('Error al añadir la criptomoneda:', error);
                alert('Hubo un error al añadir la criptomoneda.');
            } finally {
                borrarSpinner();
            }
        }else{
            alert("Por favor complete con numeros");
            return;
        }
        
    })
}

function modificar() {
    btnModificar.addEventListener("click", async (e) => {
        e.preventDefault();
        const idAModificar = document.getElementById("id").value;
        let nuevasPropiedades = {
            nombre: nombreInput.value,
            simbolo: simboloInput.value,
            consenso: tipoInput.value,
            precioActual: precioInput.value,
            cantidadCirculacion: cantidadInput.value,
            algoritmo: algoritmoInput.value,
            sitioWeb: sitioInput.value
        };
        if (confirm("Confirma la modificacion")) {
            crearSpinner();
            try {
                const cryptoNueva = await EditarPorId(idAModificar, nuevasPropiedades);
                console.log('Criptomoneda actualizada:', cryptoNueva);
                await crearTabla();
                formulario.reset();
                form_muestra.reset();
                ocultarBtn(2);
            } catch (error) {
                console.error('Error al actualizar la criptomoneda:', error);
            } finally {
                borrarSpinner();
            }
        }
    });
}

function eliminar(){
    btnEliminar.addEventListener("click", async (e) => {
        e.preventDefault();
        const idABorrar = document.getElementById("id").value;
        if (confirm("Confirma la eliminacion?")) {
            crearSpinner();
            try {
                await EliminarPorId(idABorrar);
                await crearTabla();
                formulario.reset();
                form_muestra.reset();
                ocultarBtn(2);
            } catch (error) {
                console.error('Error al eliminar la criptomoneda:', error);
            } finally {
                borrarSpinner();
            }
        }
    })
}

function borrarTodo(){
    btnBorrar.addEventListener("click", async (e) => {
        e.preventDefault();
        if (confirm("Confirma la eliminacion?")) {
            crearSpinner();
            try {
                await EliminarTodo();
                await crearTabla();
                formulario.reset();
                form_muestra.reset();
                ocultarBtn(2);
            } catch (error) {
                console.error('Error al eliminar todo:', error);
            } finally {
                borrarSpinner();
            }
        }
    })
}

function cancelar(){
    btnCancelar.addEventListener("click", async (e) => {
        e.preventDefault();
        formulario.reset();
        form_muestra.reset();
        ocultarBtn(2); 
    })
}

function cargarFormulario(crypto) {
    document.getElementById("id").value = crypto['id'];
    document.getElementById("nombre").value = crypto['nombre'];
    document.getElementById("simbolo").value = crypto['simbolo'];
    document.getElementById("precio").value = crypto['precioActual'];
    document.getElementById("tipo").value = crypto['consenso'] || '';
    document.getElementById("cantidad").value = crypto['cantidadCirculacion'] || '';
    document.getElementById("algoritmo").value = crypto['algoritmo'] || '';
    document.getElementById("sitio").value = crypto['sitioWeb'] || '';
    ocultarBtn(1);
}

function ocultarBtn(booleano){
    if(booleano == 1){
        btnGuardar.hidden = true;
        btnModificar.hidden = false;
        btnEliminar.hidden = false;
        btnCancelar.hidden = false;
    }if(booleano == 2){
        btnGuardar.hidden = false;
        btnEliminar.hidden = true;
        btnCancelar.hidden = true;
        btnModificar.hidden = true;
    }
}
