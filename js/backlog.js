// File: js/backlog.js
// Description: JavaScript code to handle the backlog form submission and data display
const backlogForm = document.getElementById('backlogForm');
const backlogTableBody = document.querySelector('#backlogTable tbody');
const backlogWebhookUrl = 'https://script.google.com/macros/s/AKfycbxZvIrWFXRoKkjmRvo6B1NWmyidLpJzK9M7SeiDfuzLUxrqdjogahI1vtAIPf1b5YnL/exec'; // ← Reemplaza con tu URL de implementación

function agregarFilaBACKLOG(data) {
  const row = document.createElement('tr');
  ['fecha', 'equipo', 'descripcion', 'parte', 'prioridad', 'responsable', 'turno', 'grupo', 'accion'].forEach(key => {
    const td = document.createElement('td');
    td.textContent = data[key] || '';
    row.appendChild(td);
  });
  backlogTableBody.appendChild(row);
}

async function cargarDatosBACKLOG() {
  try {
    const response = await fetch(reWebhookUrl);
    const registros = await response.json();
    backlogTableBody.innerHTML = ''; // Limpiar tabla
    registros.forEach(agregarFilaBACKLOG);
  } catch (error) {
    console.error('Error al cargar registros BACKLOG:', error);
  }
}

backlogForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(backlogForm);
  const data = Object.fromEntries(formData.entries());

  try {
    await fetch(backlogWebhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    agregarFilaBACKLOG(data);
    backlogForm.reset();
  } catch (error) {
    console.error('Error al enviar datos BACKLOG:', error);
  }
});

document.addEventListener('DOMContentLoaded', cargarDatosBACKLOG);



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
