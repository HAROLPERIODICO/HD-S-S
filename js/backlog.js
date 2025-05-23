
// Description: JavaScript code to handle the backlog form submission and data display
const backlogForm = document.getElementById('backlogForm');
const backlogTableBody = document.querySelector('#backlogTable tbody');
const backlogWebhookUrl = 'https://script.google.com/macros/s/AKfycbxhTg0as2dkelblrTFANxNEbt-RwowgJ5nXyza-zXoY-W2Q2j0KTEuDTmewvrAlomwO/exec'; // actualiza con la tuya

function agregarFilaBACKLOG(data) {
  const row = document.createElement('tr');
  ['fecha', 'equipo', 'descripcion', 'parte', 'prioridad', 'responsable', 'turno', 'grupo', 'accion', 'imagenUrl'].forEach(key => {
    const td = document.createElement('td');
    if (key === 'imagenUrl') {
      const link = document.createElement('a');
      link.href = data[key];
      link.textContent = 'Ver imagen';
      link.target = '_blank';
      td.appendChild(link);
    } else {
      td.textContent = data[key] || '';
    }
    row.appendChild(td);
  });
  backlogTableBody.appendChild(row);
}

async function cargarDatosBACKLOG() {
  try {
    const res = await fetch(reWebhookUrl);
    const data = await res.json();
    backlogTableBody.innerHTML = '';
    data.forEach(agregarFilaBACKLOG);
  } catch (err) {
    console.error('Error al cargar datos:', err);
  }
}

backlogForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(backlogForm);

  try {
    const res = await fetch(reWebhookUrl, {
      method: 'POST',
      body: formData
    });

    const responseData = await res.json(); // solo si App Script devuelve JSON válido
    agregarFilaBACKLOG(responseData);
    BACKLOGForm.reset();
  } catch (err) {
    console.error('Error al enviar datos BACKLOG:', err);
  }
});

document.addEventListener('DOMContentLoaded', cargarDatosBACKLOG);

function aplicarFiltrosBACKLOG() {
  const equipo = document.getElementById('filtroEquipo').value.toLowerCase();
  const grupo = document.getElementById('filtroGrupo').value.toLowerCase();
  const prioridad = document.getElementById('filtroPrioridad').value.toLowerCase();
  const turno = document.getElementById('filtroTurno').value.toLowerCase();
  const accion = document.getElementById('filtroAccion').value.toLowerCase();
  const fecha = document.getElementById('filtroFecha').value;

  document.querySelectorAll('#backlogTable tbody tr').forEach(row => {
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

document.getElementById('mostrarTablaBACKLOG').addEventListener('click', function () {
  const tablaBL = document.getElementById('contenedorTablaBACKLOG');
  if (tablaBL.style.display === 'none') {
    tablaBL.style.display = 'block';
    this.textContent = 'Ocultar tabla BACKLOG';
  } else {
    tablaBL.style.display = 'none';
    this.textContent = 'Mostrar tabla BACKLOG';
  }
});


const btnMostrarBL = document.getElementById('mostrarTablaBACKLOG');
const contenedorTablaBL = document.getElementById('contenedorTablaBACKLOG');

btnMostrarBL.addEventListener('click', function () {
  if (contenedorTablaBL.classList.contains('mostrar')) {
    contenedorTablaBL.classList.remove('mostrar');
    // Esperar la transición antes de ocultar completamente
    setTimeout(() => {
      contenedorTablaBL.style.display = 'none';
    }, 300);
    this.textContent = 'Mostrar tabla BACKLOG';
  } else {
    contenedorTablaBL.style.display = 'block';
    setTimeout(() => {
      contenedorTablaBL.classList.add('mostrar');
    }, 10);
    this.textContent = 'Ocultar tabla BACKLOG';
  }
});

