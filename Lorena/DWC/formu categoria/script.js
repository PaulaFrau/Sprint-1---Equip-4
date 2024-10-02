let categorias = []; // Array para almacenar categorías
let currentCategoriaId = null; 

window.onload = iniciar;

// Función para iniciar y asignar eventos a los botones
function iniciar() {
    document.getElementById("crear").addEventListener("click", validar, false);
    document.getElementById("confirmar").addEventListener("click", modificarCategoria, false);
    document.getElementById("listar").addEventListener("click", listarCategorias, false);
}

// Función para guardar las categorías en localStorage
function guardarCategoriasEnLocalStorage() {
    localStorage.setItem("categorias", JSON.stringify(categorias));
}

// Función para cargar las categorías desde el localStorage
function cargarCategoriasDesdeLocalStorage() {
    let categoriasGuardadas = localStorage.getItem("categorias");
    if (categoriasGuardadas) {
        categorias = JSON.parse(categoriasGuardadas);
        mostrarCategorias(); 
    }
}

// Validación del nombre de la categoría
function validarNombre() {
    let nombre = document.getElementById("nombre");
    if (!nombre.checkValidity()) {
        if (nombre.validity.valueMissing) {
            error2(nombre, "Debes introducir un nombre.");
        }
        if (nombre.validity.patternMismatch) {
            error2(nombre, "El nombre debe tener entre 5 y 50 caracteres.");
        }
        return false;
    }
    return true;
}

// Validación de la descripción
function validarDescripcion() {
    let descripcion = document.getElementById("descripcion");
    if (!descripcion.checkValidity()) {
        if (descripcion.validity.valueMissing) {
            error2(descripcion, "Debes introducir una descripción.");
        }
        if (descripcion.validity.tooShort) {
            error2(descripcion, "La descripción debe tener al menos 20 caracteres.");
        }
        return false;
    }
    return true;
}

// Validación del ID de la categoría
function validarID() {
    let id = document.getElementById("id_categoria");
    if (!id.checkValidity()) {
        if (id.validity.valueMissing) {
            error2(id, "Debes introducir un ID.");
        }
        return false;
    }

    // Verificar que el ID sea único
    if(currentCategoriaId === null){
    let idExists = categorias.some(categoria => categoria.id === parseInt(id.value));
    if (idExists) {
        error2(id, "El ID ya existe. Introduce un ID único.");
        return false;
        }
    }
    return true;
}

// Validación general
function validar(event) {
    esborrarError();
    if (validarID() && validarNombre() && validarDescripcion()) {
        return true;
    } else {
        event.preventDefault();
        return false;
    }
}

// Función para mostrar mensajes de error
function error2(element, mensaje) {
    document.getElementById("missatgeError").innerHTML = mensaje;
    element.className = "error";
    element.focus();
}

// Función para borrar mensajes de error
function esborrarError() {
    let formulario = document.forms[0];
    for (let i = 0; i < formulario.elements.length; i++) {
        formulario.elements[i].className = "";
    }
}

// Función para crear una categoría
function crearCategoria(event) {
    if (validar(event)) {
        let id = document.getElementById("id_categoria").value;
        let nombre = document.getElementById("nombre").value;
        let descripcion = document.getElementById("descripcion").value;

        let categoria = {
            id: parseInt(id), // Asignar ID
            nombre: nombre,
            descripcion: descripcion
        };

        categorias.push(categoria);
        guardarCategoriasEnLocalStorage(); // Guardar en localStorage
        mostrarCategorias();
        esborrarFormulario();
    }
}

// Función para cargar una categoría para editar
function cargarCategoria(idCategoria) {
    let categoria = categorias.find(c => c.id === idCategoria);
    if (categoria) {
        document.getElementById("id_categoria").value = categoria.id;
        document.getElementById("nombre").value = categoria.nombre;
        document.getElementById("descripcion").value = categoria.descripcion;
        currentCategoriaId = categoria.id;

        alert("Editando categoría: " + categoria.id);
        // Oculta el botón "Crear Categoría"
        document.getElementById("crear").style.display = "none";
    }
}

// Función para modificar una categoría
function modificarCategoria(event) {
    if (currentCategoriaId !== null && validar(event)) {
        let categoria = categorias.find(c => c.id === currentCategoriaId);
        if (categoria) {
            categoria.nombre = document.getElementById("nombre").value;
            categoria.descripcion = document.getElementById("descripcion").value;

            guardarCategoriasEnLocalStorage(); // Guardar en localStorage
            mostrarCategorias();
            esborrarFormulario();
            currentCategoriaId = null;
        } else {
            alert("Categoría no encontrada!");
        }
    }
}

// Función para borrar una categoría
function borrarCategoria(idCategoria) {
    if (confirm("¿Estás seguro que quieres borrar esta categoría?")) {
        categorias = categorias.filter(c => c.id !== idCategoria);
        guardarCategoriasEnLocalStorage(); // Guardar en localStorage
        mostrarCategorias();
    }
}

// Función para listar categorías
function listarCategorias() {
    cargarCategoriasDesdeLocalStorage();
    mostrarCategorias();
    alert("Categorías listadas correctamente.");
}

// Función para mostrar las categorías en el contenedor
function mostrarCategorias() {
    var container = document.getElementById("categorias-container");
    container.innerHTML = ""; // Limpiar el contenido anterior

    if (categorias.length == 0) {
        container.innerHTML = "<p>No hay categorías para mostrar.</p>";
        return;
    }

    categorias.forEach(categoria => {
        var categoriaHTML = `
            <div class="categoria">
                <p><strong>ID:</strong> ${categoria.id}</p>
                <p><strong>Nombre:</strong> ${categoria.nombre}</p>
                <p><strong>Descripción:</strong> ${categoria.descripcion}</p>
                <button onclick="cargarCategoria(${categoria.id})">Modificar Categoría</button>
                <button onclick="borrarCategoria(${categoria.id})">Borrar</button>
                <hr>
            </div>
        `;
        container.innerHTML += categoriaHTML;
    });
}

function esborrarFormulario() {
    document.getElementById("elFormulari").reset(); // Limpiar los campos del formulario
    currentCategoriaId = null; // Reiniciar el ID de la categoría actual
    document.getElementById("crear").style.display = "inline"; // Mostrar el botón de crear nuevamente
}
