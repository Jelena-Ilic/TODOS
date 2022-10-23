const seccionTareas = document.getElementById('seccionTareas');
const btnGuardar = document.getElementById('btnGuardar');
const inputNombre = document.getElementById('inputNombre');
const selectPrioridad = document.getElementById('selectPrioridad');
const datosListaTareas = listaTareas;
const inputBuscar = document.getElementById('inputBuscar');
const selectBuscar = document.getElementById('selectBuscar');


btnGuardar.addEventListener('click', (event) => {
    event.preventDefault();
    addTarea();
    console.log(event)
});

btnBuscar.addEventListener('click', (event) => {
    filtrar();
});


function pintarTareas(arrTareas) {

    for (tarea of arrTareas) {
        const articleTareas = document.createElement('article');
        const h2 = document.createElement('h2');
        const icon = document.createElement('i')
        const button = document.createElement('button')

        h2.innerText = tarea.titulo;

        articleTareas.setAttribute('id', tarea.idTarea);
        articleTareas.setAttribute('class', tarea.prioridad);
        icon.setAttribute('class', 'fas fa-eraser');

        articleTareas.append(h2);
        articleTareas.append(button);
        button.append(icon);

        eventBorrarTarea(button, tarea.idTarea);
        seccionTareas.append(articleTareas);
    }

    saveLocalStorage(arrTareas);
}

pintarTareas(datosListaTareas);


function pintarTarea(tarea) {
    const articleTareas = document.createElement('article');
    const h2 = document.createElement('h2');
    const icon = document.createElement('i');
    const button = document.createElement('button');

    h2.innerText = tarea.titulo;

    articleTareas.setAttribute('id', tarea.idTarea);
    articleTareas.setAttribute('class', tarea.prioridad);
    icon.setAttribute('class', 'fas fa-eraser');

    articleTareas.append(h2);
    articleTareas.append(button);
    button.append(icon);

    eventBorrarTarea(button, tarea.idTarea);
    seccionTareas.append(articleTareas);

    saveLocalStorage(datosListaTareas);
}



function addTarea() {
    const ultimoValor = datosListaTareas[datosListaTareas.length - 1];
    let tarea = {
        idTarea: ultimoValor.idTarea + 1,
        titulo: inputNombre.value,
        prioridad: selectPrioridad.value
    }
    datosListaTareas.push(tarea);
    pintarTarea(tarea);
}


function eventBorrarTarea(button, idTarea) {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        borrarTarea(idTarea);
    })
}

function borrarTarea(idTarea) {
    datosListaTareas.splice(idTarea, 1);
    const deleteArticle = document.getElementById(idTarea);
    seccionTareas.removeChild(deleteArticle);
    saveLocalStorage(datosListaTareas);
}

function filtrar() {


    if (inputBuscar.value !== '') {
        const valorFiltrado = inputBuscar.value;
        const filtrados = datosListaTareas.filter(tarea => tarea.titulo.toLowerCase().includes(valorFiltrado.toLowerCase()));
        seccionTareas.replaceChildren(...[]);
        pintarTareas(filtrados);

    } else {
        if (selectBuscar !== null) {
            const valorFiltrado = selectBuscar.value;
            const filtrados = datosListaTareas.filter(tarea => tarea.prioridad.toLowerCase().includes(valorFiltrado.toLowerCase()));
            seccionTareas.replaceChildren(...[]);
            pintarTareas(filtrados);

        }
    }

}

function saveLocalStorage(datosEntrada) {
    const listaTareas = JSON.stringify(datosEntrada);
    localStorage.clear();
    localStorage.setItem('datosListaTareas', listaTareas);
}

