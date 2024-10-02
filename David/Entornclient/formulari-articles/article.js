
var articles = []; // Array para almacenar artículos
var currentArticleId = null;

window.onload = iniciar;
function iniciar() {
    // Cargar artículos guardados al cargar la página
    document.getElementById("crear").addEventListener("click", validar, false);
    document.getElementById("confirmar").addEventListener("click", modificarArticle, false);
    document.getElementById("listar").addEventListener("click", llistararticle, false);
}

// Función para guardar los artículos en localStorage
function guardarArticlesEnLocalStorage() {
    localStorage.setItem("articles", JSON.stringify(articles));
}

// Función para cargar artículos desde localStorage
function carregarArticlesDesDeLocalStorage() {
    var articlesGuardats = localStorage.getItem("articles");
    if (articlesGuardats) {
        articles = JSON.parse(articlesGuardats);
        mostrarArticles(); 
    }
}

// Validación del formulario
function validarTitol() {
    let titol = document.getElementById("titol");
    if (!titol.checkValidity()) {
        if (titol.validity.valueMissing) {
            error2(titol, "Deus d'introduïr un títol.");
        }
        if (titol.validity.patternMismatch) {
            error2(titol, "El títol ha de tindre entre 5 i 50 caracters.");
        }
        return false;
    }
    return true;
}

function validarSubtitol() {
    let subtitol = document.getElementById("subtitol");
    if (!subtitol.checkValidity()) {
        if (subtitol.validity.valueMissing) {
            error2(subtitol, "Deus d'introduïr un subtítol.");
        }
        if (subtitol.validity.patternMismatch) {
            error2(subtitol, "El subtítol ha de tindre entre 5 i 100 caracters.");
        }
        return false;
    }
    return true;
}

function validarCos() {
    let cos = document.getElementById("cos");
    if (!cos.checkValidity()) {
        if (cos.validity.valueMissing) {
            error2(cos, "Deus d'introduïr un cos.");
        }
        if (cos.validity.tooShort) {
            error2(cos, "El cos ha de tindre almenys 20 caracters.");
        }
        return false;
    }
    return true;
}

function validarImatge() {
    let imatge = document.getElementById("imatge");
    if (!imatge.checkValidity()) {
        if (imatge.validity.valueMissing) {
            error2(imatge, "Deus d'introduïr una URL d'imatge.");
        }
        if (imatge.validity.typeMismatch) {
            error2(imatge, "La URL de l'imatge no és vàlida.");
        }
        return false;
    }
    return true;
}

function validarData() {
    let data = document.getElementById("data");
    if (!data.checkValidity()) {
        if (data.validity.valueMissing) {
            error2(data, "Deus d'introduïr una data.");
        }
        return false;
    }
    return true;
}

function validarUsuari() {
    let usuari = document.getElementById("usuari");
    if (!usuari.checkValidity()) {
        if (usuari.validity.valueMissing) {
            error2(usuari, "Deus d'introduïr un usuari.");
        }
        if (usuari.validity.patternMismatch) {
            error2(usuari, "El nom d'usuari ha de ser entre 3 i 15 caracters.");
        }
        return false;
    }
    return true;
}

function validar(e) {
    esborrarError();
    if (validarTitol() && validarSubtitol() && validarCos() && validarImatge() && validarData() && validarUsuari()) {
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}

// Manejo de errores
function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "error";
    element.focus();
}

function esborrarError() {
    let formulari = document.forms[0];
    for (let i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "";
    }
}

// Crear un nuevo artículo
function crearArticle() {
    if (validar(event)) {
        let titol = document.getElementById("titol").value;
        let subtitol = document.getElementById("subtitol").value;
        let cos = document.getElementById("cos").value;
        let imatge = document.getElementById("imatge").value;
        let data = document.getElementById("data").value;
        let usuari = document.getElementById("usuari").value;

        let article = {
            id: articles.length + 1, // Asignar  ID 
            titol: titol,
            subtitol: subtitol,
            cos: cos,
            imatge: imatge,
            data: data,
            usuari: usuari
        };

        articles.push(article);
        guardarArticlesEnLocalStorage(); // Guardar en localStorage
        mostrarArticles();
        esborrarFormulari();
    }
}

// Cargar un artículo existente en el formulario para editar
function carregarArticle(idArticle) {
    let article = articles.find(a => a.id === idArticle);
    if (article) {
        document.getElementById("titol").value = article.titol;
        document.getElementById("subtitol").value = article.subtitol;
        document.getElementById("cos").value = article.cos;
        document.getElementById("imatge").value = article.imatge;
        document.getElementById("data").value = article.data;
        document.getElementById("usuari").value = article.usuari;
        currentArticleId = article.id;

        alert("Editant article: " + article.id);

        // Oculta el botón "Crear Artículo"
        document.getElementById("crear").style.display = "none";
    }
}

// Modificar un artículo existente por su ID y actualizar la pantalla
function modificarArticle() {
    if (currentArticleId !== null && validar(event)) {
        let article = articles.find(a => a.id === currentArticleId);
        if (article) {
            // Actualizar los detalles del artículo con los nuevos valores del formulario
            article.titol = document.getElementById("titol").value;
            article.subtitol = document.getElementById("subtitol").value;
            article.cos = document.getElementById("cos").value;
            article.imatge = document.getElementById("imatge").value;
            article.data = document.getElementById("data").value;
            article.usuari = document.getElementById("usuari").value;

            guardarArticlesEnLocalStorage(); // Guardar en localStorage
            mostrarArticles();
            esborrarFormulari();
            currentArticleId = null;
        } else {
            alert("Article no trobat!");
        }
    }
}

// Borrar un artículo por su ID y actualizar la pantalla
function borrarArticle(idArticle) {
    if (confirm("Estàs segur que vols borrar aquest article?")) {
        // Filtrar el artículo con el ID dado
        articles = articles.filter(a => a.id !== idArticle);
        guardarArticlesEnLocalStorage(); // Guardar en localStorage
        mostrarArticles();
    }
}

// Listar y mostrar todos los artículos en la pantalla
function llistararticle() {
    carregarArticlesDesDeLocalStorage();
    mostrarArticles();
    alert("Articles llistats correctament.");
}

// Función para mostrar todos los artículos en la pantalla
function mostrarArticles() {
    var container = document.getElementById("articles-container");
    container.innerHTML = ""; // Limpiar el contenido anterior

    // Si no hay artículos, mostrar un mensaje
    if (articles.length == 0) {
        container.innerHTML = "<p>No hi ha articles per mostrar.</p>";
        return;
    }

    // Recorrer el array de artículos y mostrar cada artículo
    articles.forEach(article => {
        var articleHTML = `
            <div class="article">
                <h2>${article.titol}</h2>
                <h3>${article.subtitol}</h3>
                <p><strong>Cos:</strong> ${article.cos}</p>
                <p><strong>Imatge:</strong> <img src="${article.imatge}" alt="${article.titol}" width="100"></p>
                <p><strong>Data:</strong> ${article.data}</p>
                <p><strong>Usuari:</strong> ${article.usuari}</p>
                <button onclick="carregarArticle(${article.id})">Modificar Article</button>
                <button onclick="borrarArticle(${article.id})">Borrar</button>
                <hr>
            </div>
        `;
        container.innerHTML += articleHTML;
    });
}

// Función para limpiar el formulario después de enviar o editar
function esborrarFormulari() {
    document.getElementById("elFormulari").reset(); // Limpiar los campos del formulario
    currentArticleId = null; // Reiniciar el ID del artículo actual
    document.getElementById("crear").style.display = "inline";
}
