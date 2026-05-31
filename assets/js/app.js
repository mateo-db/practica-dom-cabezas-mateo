// declaramos todas las variables necesarias
const rowCards = document.querySelector("#rowCarta")
const searchName = document.querySelector("#buscarNombre")
const inputUserName = document.querySelector("#inputUsuario")
const btnSearch = document.querySelector("#btnBuscar")
const formSubmit = document.querySelector("#formPersonaje")
const nameSubmit = document.querySelector("#nombrePersonaje")
const urlSubmit = document.querySelector("#urlPersonaje")
const btnSubmit = document.querySelector("#btnSubirPj")

// insertamos el arreglo de pjs
const personajes = [
{ id: 1, nombre: "A-Bomb", imagen:
"https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/1-a-bomb.jpg" },
{ id: 2, nombre: "Abe Sapien", imagen:
"https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/2-abe-sapien.jpg" },
{ id: 3, nombre: "Abin Sur", imagen:
"https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/3-abin-sur.jpg" },
{ id: 4, nombre: "Abomination", imagen:
"https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/4-abomination.jpg" },
{ id: 5, nombre: "Abraxas", imagen:
"https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/5-abraxas.jpg" },
];

// console.log(personajes)
//acá se declara la variable funcion cargarPersonajes, donde adentro se ejecutará un forEach que irá recorriendo cada personaje del arreglo, e irá construyendo las cards segun su info respectiva
const cargarPersonajes = (arregloPj) => {
    rowCards.innerHTML = ""

    personajes.forEach((personaje) => {
        rowCards.innerHTML +=`
            <div class="col-2 mt-4 mb-4" dataset="${personaje.id}">
                <div class="card" style="width: 10rem;">
                    <img src="${personaje.imagen}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${personaje.nombre}</h5>
                        <a href="#" class="btn btn-primary" id="btnDel">Eliminar</a>
                    </div>
                </div>
            </div>
        `
    });

}

// aca se llama a la funcion cargarPersonajes
cargarPersonajes()