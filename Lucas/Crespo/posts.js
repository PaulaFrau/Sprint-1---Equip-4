window.onload = main;

function main () {

    var post = [
        { 
            id: 1,
            title: "Antonio",    
            photo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nicepng.com%2Fmaxp%2Fu2w7r5t4o0a9y3e6%2F&psig=AOvVaw0HqYlsm5qstFqkXM9FJQB0&ust=1727775860212000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLCA6-Sw6ogDFQAAAAAdAAAAABAE",
            creation_date: "2024-09-30",
            creator_id: 1,
            description: "descripcio Antonio",    
            tag: "Personas"     
        },
        { 
            id: 2,
            title: "PS2",    
            photo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nicepng.com%2Fmaxp%2Fu2w7r5t4o0a9y3e6%2F&psig=AOvVaw0HqYlsm5qstFqkXM9FJQB0&ust=1727775860212000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLCA6-Sw6ogDFQAAAAAdAAAAABAE",
            creation_date: "2024-09-28",
            creator_id: 1,
            description: "descripcio PS2",    
            tag: "Consolas"     
        },
        { 
            id: 3,
            title: "Sports",    
            photo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nicepng.com%2Fmaxp%2Fu2w7r5t4o0a9y3e6%2F&psig=AOvVaw0HqYlsm5qstFqkXM9FJQB0&ust=1727775860212000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLCA6-Sw6ogDFQAAAAAdAAAAABAE",
            creation_date: "2024-09-29",
            creator_id: 2,
            description: "descripcio",
            tag: "Deportes"
        }, 
    ];

    //Guardar els objectes en el localStorage
    localStorage.setItem('posts', JSON.stringify(post));

    //Obtenim els posts guardats en el localStorage
    var storedPosts = JSON.parse(localStorage.getItem('posts'));

    var container = document.getElementById("container");

    //Iterem sobre els posts i els agreguem al "div"
    storedPosts.forEach(function(item) {
        //Creem un div per a cada post
        var postDiv = document.createElement("div");

        //Afegim el contingut del post
        postDiv.innerHTML = `
            <h2>${item.title}</h2>
            <img src="${item.photo}"width="100">
            <p>${item.description}</p>
            <p><strong>Tag:</strong> ${item.tag}</p>
            <p><strong>Fecha de creación:</strong> ${item.creation_date}</p>`;

        //Afegim el post al div
        container.appendChild(postDiv);
    });
}

