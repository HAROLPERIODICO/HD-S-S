// File: js/re.js
// Description: JavaScript code to handle the backlog form submission and data display
const reForm = document.getElementById('reForm');
const reTableBody = document.querySelector('#reTable tbody');
const reWebhookUrl = 'https://script.google.com/macros/s/AKfycbwN4SnrEJZxbJlgwicaeQcJGE2dS2Y07zD8yNh1mnAoax2ejNYyLjzhskzqP6q9Cazw/exec'; // tu URL de Apps Script
const fila = document.createElement('tr');
async function cargarDatosRE() {
  try {
    const res = await fetch(reWebhookUrl);
    const data = await res.json();
    reTableBody.innerHTML = '';
    data.forEach(agregarFilaRE);
  } catch (err) {
    console.error('Error al cargar datos:', err);
  }
}

reForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(reForm);

  try {
    const res = await fetch(reWebhookUrl, {
      method: 'POST',
      body: formData
    });

    const responseData = await res.json(); // ya funcionará con el JSON que retorna ahora Apps Script
    agregarFilaRE(responseData);
    reForm.reset();
  } catch (err) {
    console.error('Error al enviar datos RE:', err);
  }
});


document.addEventListener('DOMContentLoaded', cargarDatosRE);

function agregarFilaRE(dato) {
  const fila = document.createElement('tr');
  fila.innerHTML = `
    <td>${dato.fecha || ''}</td>
    <td>${dato.equipo || ''}</td>
    <td>${dato.descripcion || ''}</td>
    <td>${dato.parte || ''}</td>
    <td>${dato.prioridad || ''}</td>
    <td>${dato.responsable || ''}</td>
    <td>${dato.turno || ''}</td>
    <td>${dato.grupo || ''}</td>
    <td>${dato.accion || ''}</td>
    <td>
      ${dato.imagenUrl ? `<a href="${dato.imagenUrl}" target="_blank">Ver imagen</a>` : 'Sin imagen'}
    </td>
  `;
  reTableBody.appendChild(fila);
}




function aplicarFiltrosRE() {
  const equipo = document.getElementById('filtroEquipo').value.toLowerCase();
  const grupo = document.getElementById('filtroGrupo').value.toLowerCase();
  const prioridad = document.getElementById('filtroPrioridad').value.toLowerCase();
  const turno = document.getElementById('filtroTurno').value.toLowerCase();
  const accion = document.getElementById('filtroAccion').value.toLowerCase();
  const fecha = document.getElementById('filtroFecha').value;

  document.querySelectorAll('#reTable tbody tr').forEach(row => {
    const celdas = row.querySelectorAll('td');
    const match = 
      (equipo === '' || celdas[1].textContent.toLowerCase() === equipo) &&
      (prioridad === '' || celdas[4].textContent.toLowerCase() === prioridad) &&
      (grupo === '' || celdas[7].textContent.toLowerCase() === grupo) &&
      (turno === '' || celdas[6].textContent.toLowerCase() === turno) &&
      (accion === '' || celdas[8].textContent.toLowerCase() === accion) &&
    (fecha === '' || celdas[0].textContent === fecha);
     

    row.style.display = match ? '' : 'none';
  });
}

document.getElementById('mostrarTablaRE').addEventListener('click', function () {
  const tabla = document.getElementById('contenedorTablaRE');
  if (tabla.style.display === 'none') {
    tabla.style.display = 'block';
    this.textContent = 'Ocultar tabla RE';
  } else {
    tabla.style.display = 'none';
    this.textContent = 'Mostrar tabla RE';
  }
});


const btnMostrar = document.getElementById('mostrarTablaRE');
const contenedorTabla = document.getElementById('contenedorTablaRE');

btnMostrar.addEventListener('click', function () {
  if (contenedorTabla.classList.contains('mostrar')) {
    contenedorTabla.classList.remove('mostrar');
    // Esperar la transición antes de ocultar completamente
    setTimeout(() => {
      contenedorTabla.style.display = 'none';
    }, 300);
    this.textContent = 'Mostrar tabla RE';
  } else {
    contenedorTabla.style.display = 'block';
    setTimeout(() => {
      contenedorTabla.classList.add('mostrar');
    }, 10);
    this.textContent = 'Ocultar tabla RE';
  }
});


