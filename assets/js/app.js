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

// creamos copia mutable del arreglo original para trabajar con esa copia y no tocar el arreglo original con los 5 personajes
let arrayPersonajes = [...personajes]
// creamos una variable para los ids de los nuevos personajes que se vayan sumando al arreglo, como el nuestro original tiene 5, el proximo personaje que se añada será el sexto y si o si llevará el id nro 6. Esto tambien nos ayuda a evitar depender del metodo length y ahorrarnos errores con IDs repetidos a la hora de eliminar personajes que se añadan al arreglo
let idAutoIncremental = 6

// console.log(personajes)
//acá se declara la variable funcion cargarPersonajes, donde adentro se ejecutará un forEach que irá recorriendo cada personaje del arreglo, e irá construyendo las cards segun su info respectiva
const cargarPersonajes = (arregloPj) => {
    rowCards.innerHTML = ""

    arregloPj.forEach((personaje) => {
        rowCards.innerHTML +=`
            <div class="col-2 mt-4 mb-4" data-id="${personaje.id}">
                <div class="card" style="width: 10rem;">
                    <img src="${personaje.imagen}" class="card-img-top" style="height: 250px; object-fit: cover" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${personaje.nombre}</h5>
                        <a href="#" class="btn btn-danger">Eliminar</a>
                    </div>
                </div>
            </div>
        `
    });

}

// aca se llama a la funcion cargarPersonajes
cargarPersonajes(arrayPersonajes)

searchName.addEventListener("click", (e) => {
    if (e.target.id === 'btnBuscar') {
        const nombreBuscado = inputUserName.value 
        // console.log ("Se detectó el click y se capturó el texto que ingresó el usuario!")
        // console.log(nombreBuscado)
        // acá abajo es donde se hace la lógica detrás del buscador de personajes, donde declaramos como constante la variable donde se guardará el resultado del metodo filter
        const personajeFiltrado = arrayPersonajes.filter(arrayPersonaje => arrayPersonaje.nombre.toLowerCase().replaceAll("-", " ").includes(nombreBuscado.toLowerCase().replaceAll("-", " ")))
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
            id: idAutoIncremental,
            nombre: personajeSubido,
            imagen: imgSubida
        }
        idAutoIncremental++
        // ahí arriba se crea un nuevo objeto con sus propiedades respectivas que son los inputs del usuario. en id se usa la variable idAutoIncremental que vale 6 para nuestro primer nuevo personaje que será el sexto en el arreglo de 5, luego de crear ese primer nuevo objeto incrementamos en 1 (++) el valor de idAutoIncremental, asi de este modo el proximo personaje despues del sexto que se añada al arreglo (el septimo) será de id 7 logicamente, y así sucesivamente
        arrayPersonajes.push(personajeNuevo)
        // una vez creado el objeto, simplemente se agrega al final de arreglo con el metodo .push, en los parametros del metodo ponemos como argumento el nombre de la variable que guardará nuestro nuevo objeto
        cargarPersonajes(arrayPersonajes)
        //por ultimo, llamamos a la función cargarPersonajes que construye las cards y le damos como argumento en los parametros el arreglo de personajes con el nuevo personaje ya añadido
    }
})

// lo mismo, se escucha evento globalmente desde contenedor padre relativamente mayor que engloba todo, luego se evalua si el target del event object contiene la info del botón en particular que nos interesa (en este caso el botón eliminar, que contiene la clase btn-danger), se usa metodo preventDefault sobre evento para evitar comportamientos raros ya que el botón en este caso en realidad es un enlace "a", se determina el contenedor padre más cercano al target del event object (en este caso sería el .col-2), el resultado de eso se guarda en una variable llamado colPadreMasCercano, el dataset.id de ese .col-2 evaluado se guarda en variable personajeEliminado, se utiliza metodo filter con un parametro que indica "el id del personaje del arreglo, es diferente al id del personaje eliminado? si es entonces se guarda el objeto, en caso contrario se descarta", y según ese resultado se va a modificar el mismo arreglo de personajes que venimos usando (la copia) para que se rendericen todas las cards de los superheroes menos el que coincido con el id de la card donde se hizo click en el botón eliminar, finalmente se llama a la funcion que construye las cards para darle como argumento dentro de sus parametros el arreglo modificado de la forma anteriormente explicada
rowCards.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-danger")) {
        e.preventDefault()
        // console.log("Se detectó el botón eliminar con exito!")
        const colPadreMasCercano = e.target.closest(".col-2")
        const personajeEliminado = colPadreMasCercano.dataset.id
        // console.log(personajeEliminado)
        arrayPersonajes = arrayPersonajes.filter(arrayPersonaje => arrayPersonaje.id != personajeEliminado)
        cargarPersonajes(arrayPersonajes)
    }
})