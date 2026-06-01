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

    arregloPj.forEach((personaje) => {
        rowCards.innerHTML +=`
            <div class="col-2 mt-4 mb-4" dataset="${personaje.id}">
                <div class="card" style="width: 10rem;">
                    <img src="${personaje.imagen}" class="card-img-top" style="height: 250px; object-fit: cover" alt="...">
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
cargarPersonajes(personajes)

searchName.addEventListener("click", (e) => {
    if (e.target.id === 'btnBuscar') {
        const nombreBuscado = inputUserName.value 
        // console.log ("Se detectó el click y se capturó el texto que ingresó el usuario!")
        // console.log(nombreBuscado)
        // acá abajo es donde se hace la lógica detrás del buscador de personajes, donde declaramos como constante la variable donde se guardará el resultado del metodo filter
        const personajeFiltrado = personajes.filter(personaje => personaje.nombre.toLowerCase().replaceAll("-", " ").includes(nombreBuscado.toLowerCase().replaceAll("-", " ")))
        // el metodo filter recorre el arreglo, objeto por objeto, siguiendo los parametros que basicamente le indican: "por cada objeto singular del arreglo evalua si el nombre del personaje (convertido a minusculas) contiene, en cualquier parte, el string del input ingresado por el usuario (tambien está convertido a minusculas)... si es así guardá ese objeto entero en el arreglo temporal personajeEncontrado; los objetos que, al comparar su nombre con el string que ingresó el usuario no cumplan con la evaluación, no los guardes, se descartan"
        //el metodo replaceAll tiene parametros adentro los cuales indican: si el nombre del personaje que está siendo evaluado contiene guiones, esos guiones se reemplazan temporalmente por espacios, y como con nombreBuscado (que contiene el string que ingresó el usuario) aplicamos el mismo metodo de replaceAll con los mismos parametros, al momento de evaluar la comparación los strings coinciden con exactitud)
        cargarPersonajes(personajeFiltrado)
        // una vez terminado el filtrado y sus resultados guardados, se llama a la funcion que construye las cards "cargarPersonajes" y se le pasa como argumento dentro de sus parametros el nuevo arreglo temporal donde se guardaron los resultados del filtrado, "personajeFiltrado"
        // console.log("Se ha realizado la busqueda con exito!")
    }
    // console.log(e)
})

// aca abajo ocurre similarmente lo mismo que con la busqueda, se escucha globalmente el evento click desde el contenedor padre mas cercano (form) y luego se pregunta "¿el id del objetivo del event object (en este caso el botón de subir), es estrictamente igual a 'btnSubirPj'?", si es así se crean variables temporales: personajeSubido que es igual al value del input que ingresó el usuario como nombre del personaje a subir, e imgSubida, que es igual al valor del url que ingresó el usuario. Se utiliza el metodo preventDefault sobre el event object al principio para evitar que el formulario recargue la página automaticamente al enviar los datos
formSubmit.addEventListener("click", (e) => {
    if (e.target.id === 'btnSubirPj') {
        e.preventDefault()
        const personajeSubido = nameSubmit.value
        const imgSubida = urlSubmit.value
        // console.log("Se detectó el click en botón subir!")
        // console.log(e.target)
        // console.log(personajeSubido)
        // console.log(imgSubida)
        const personajeNuevo = {
            id: personajes.length+1,
            nombre: personajeSubido,
            imagen: imgSubida
        }
        // ahí arriba se crea un nuevo objeto con sus propiedades respectivas que son los inputs del usuario. en id se usa .length+1 para que se lea la longitud del arreglo original y se le incremente 1, ya que este nuevo objeto una vez metido en el arreglo de 5 personajes tendría de id: 6
        personajes.push(personajeNuevo)
        // una vez creado el objeto, simplemente se agrega al final de arreglo con el metodo .push, en los parametros del metodo ponemos como argumento el nombre de la variable que guardará nuestro nuevo objeto
        cargarPersonajes(personajes)
        //por ultimo, llamamos a la función cargarPersonajes que construye las cards y le damos como argumento en los parametros el arreglo de personajes con el nuevo personaje ya añadido
    }
})