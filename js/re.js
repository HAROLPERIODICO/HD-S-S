// File: js/re.js
// Description: JavaScript code to handle the backlog form submission and data display
const reForm = document.getElementById('reForm');
const reTableBody = document.querySelector('#reTable tbody');
const reWebhookUrl = 'https://script.google.com/macros/s/AKfycbzuoCxfrtr9SWeSpTtl-l4Z2cufs7rMW3k92j4QQL2UzRJa08HRRhAAez2ztQsCLm0A/exec'; // ← Reemplaza con tu URL de implementación

function agregarFilaRE(data) {
  const row = document.createElement('tr');
  ['fecha', 'equipo', 'descripcion', 'parte', 'prioridad', 'responsable', 'turno', 'grupo', 'accion'].forEach(key => {
    const td = document.createElement('td');
    td.textContent = data[key] || '';
    row.appendChild(td);
  });
  reTableBody.appendChild(row);
}

async function cargarDatosRE() {
  try {
    const response = await fetch(reWebhookUrl);
    const registros = await response.json();
    reTableBody.innerHTML = ''; // Limpiar tabla
    registros.forEach(agregarFilaRE);
  } catch (error) {
    console.error('Error al cargar registros RE:', error);
  }
}

reForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(reForm);
  const data = Object.fromEntries(formData.entries());

  try {
    await fetch(reWebhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    agregarFilaRE(data);
    reForm.reset();
  } catch (error) {
    console.error('Error al enviar datos RE:', error);
  }
});

document.addEventListener('DOMContentLoaded', cargarDatosRE);


        
