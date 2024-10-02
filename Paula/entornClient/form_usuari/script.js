let usuarios;
window.onload = main;

function main(){
    usuarios = JSON.parse(localStorage.getItem('usuarios'));
    if (usuarios === null) {
        usuarios = [];
    }
    document.getElementById('crearUsers').addEventListener('click', validar);
    document.getElementById('llistarUsers').addEventListener('click',llistarUser);
    document.getElementById('volver').addEventListener('click',volverAtras);
    document.getElementById('guardar').addEventListener('click',guardarUser);
}

function crearUser(){
    let nombre = document.getElementById('nombre').value;
    let correo = document.getElementById('correo').value;
    let telefono = document.getElementById('telefono').value;
    let password = document.getElementById('password').value;

    let user ={
        nombre: nombre,
        correo: correo,
        telefono: telefono,
        password: password,
        tipo: 'invitado'
    }

    usuarios.push(user);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Usuario ' + user.nombre + ' registrado correctamente.'); 
}

function llistarUser(){
    document.getElementById("crearForm").style.display = "none";
    document.getElementById("error").style.display = "none";
    document.getElementById("userList").style.display = "block";

    let userList = document.getElementById("lista");
    userList.innerHTML = ""; 

    if (usuarios.length === 0) {
        userList.innerHTML = "<p>No hay usuarios registrados.</p>";
    }
    else {
        // Crear la tabla
        let table = `<table border="1">
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Contraseña</th>
                        <th>Tipo</th>
                    </tr>`;

        usuarios.forEach((user, index) => {
            table += `<tr>
                        <td>${user.nombre}</td>
                        <td>${user.correo}</td>
                        <td>${user.telefono}</td>
                        <td>${user.password}</td>
                        <td>${user.tipo}</td>
                        <td><img src="delete.png" id="borrar" width="30px" height="30px" onclick="borrarUser(${index})"></td>
                        <td><img src="edit.png" id="borrar" width="30px" height="30px" onclick="modificarUser(${index})"></td>
                    </tr>`;
        });

        table += "</table>";
        userList.innerHTML = table;
    }
}

function borrarUser(index){
    if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
        usuarios.splice(index, 1); 
        localStorage.setItem('usuarios', JSON.stringify(usuarios)); 
        llistarUser(); 
    }   
}

function modificarUser(index){
    document.getElementById("crearForm").style.display = "block";
    document.getElementById("userList").style.display = "none";
    document.getElementById("error").style.display = "none";
    document.getElementById("crearUsers").style.display = "none";
    document.getElementById("llistarUsers").style.display = "none";
    document.getElementById('guardar').style.display = 'block';

    document.getElementById('nombre').value = usuarios[index].nombre;
    document.getElementById('correo').value = usuarios[index].correo;
    document.getElementById('telefono').value = usuarios[index].telefono;
    document.getElementById('password').value = usuarios[index].password;

    document.getElementById('crearForm').setAttribute('indexModificat', index);
}

function guardarUser(){
    event.preventDefault(); 
    const index = document.getElementById('crearForm').getAttribute('indexModificat');

    if (index !== null) {
        usuarios[index].nombre = document.getElementById('nombre').value;
        usuarios[index].correo = document.getElementById('correo').value;
        usuarios[index].telefono = document.getElementById('telefono').value;
        usuarios[index].password = document.getElementById('password').value;

        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Usuario ' + usuarios[index].nombre + ' actualizado correctamente.');

        document.getElementById('guardar').style.display = 'none';
        llistarUser();
    }
}

function volverAtras(){
    document.getElementById("userList").style.display = "none";
    document.getElementById("crearForm").style.display = "block";
}

function validarNom(){
    var element = document.getElementById("nombre");
    if (!element.checkValidity ()) {
        if (element.validity.valueMissing){
            error2(element, "Debes de introducir un nombre.");
        }

        if (element.validity.patternMismatch) {
            error2(element,"El nombre ha de tener entre 2 i 20 carácteres.");
        }
        //error (element);
        return false;       
    }
    return true;
}

function validarEmail(){
    var element = document.getElementById("correo");

    if (!element.checkValidity()) { 
        if (element.validity.valueMissing) {
            error2(element, "Debes introducir el correo electrónico.");
        }
        
        if (element.validity.typeMismatch || element.validity.patternMismatch) {
            error2(element, "Introduce un correo electrónico con el formato correcto.");
        }
        return false;
    }
    return true;
}

function validarTel(){
    var element = document.getElementById("telefono");
    if (!element.checkValidity ()) {
        if (element.validity.valueMissing){
            error2(element, "Debes de introducir un teléfono.");
        }

        if (element.validity.patternMismatch) {
            error2(element,"El teléfono ha de tener este formato 999 999 999.");
        }
        //error (element);
        return false;       
    }
    return true;
}

function validarPassword(){
    var element = document.getElementById("password");
    if (!element.checkValidity ()) {
        if (element.validity.valueMissing){
            error2(element, "Debes de introducir una contraseña.");
        }

        if (element.validity.patternMismatch) {
            error2(element,"La contraseña debe tener entre 6 y 15 carácteres, incluir al menos una mayúscula, un número y un carácter especial.");
        }
        //error (element);
        return false;       
    }
    return true;
}

function validar(e){
    esborrarError();
    
    if(validarNom() && validarEmail() && validarTel() && validarPassword()){
        crearUser();
    }
    else {
        e.preventDefault();
        return false;
    }
}

function error2(element, missatge){
    document.getElementById("error").style.display = "block";
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "error";
    element.focus();
}

function esborrarError(){
    var formulari = document.forms[0];
    for (var i=0; i < formulari.elements.length; i++ ) {
        formulari.elements[i].className="";
    }
}

