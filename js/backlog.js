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
  reTableBody.appendChild(row);
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


        
