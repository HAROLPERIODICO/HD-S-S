// File: js/re.js
// Description: JavaScript code to handle the backlog form submission and data display
const reForm = document.getElementById('reForm');
const reTableBody = document.querySelector('#reTable tbody');
const reWebhookUrl = 'https://script.google.com/macros/s/AKfycbxZvIrWFXRoKkjmRvo6B1NWmyidLpJzK9M7SeiDfuzLUxrqdjogahI1vtAIPf1b5YnL/exec'; // tu URL

function agregarFilaRE(data) {
  const row = document.createElement('tr');
  ['fecha', 'equipo', 'descripcion', 'parte', 'prioridad', 'responsable', 'turno', 'grupo', 'accion', 'imagen'].forEach(key => {
    const td = document.createElement('td');
    if (key === 'imagen' && data[key]) {
      const link = document.createElement('a');
      link.href = data[key];
      link.textContent = 'Ver Imagen';
      link.target = '_blank';
      td.appendChild(link);
    } else {
      td.textContent = data[key] || '';
    }
    row.appendChild(td);
  });
  reTableBody.appendChild(row);
}

async function cargarDatosRE() {
  try {
    const response = await fetch(reWebhookUrl);
    const registros = await response.json();
    reTableBody.innerHTML = '';
    registros.forEach(agregarFilaRE);
  } catch (error) {
    console.error('Error al cargar registros RE:', error);
  }
}

reForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(reForm);

  try {
    await fetch(reWebhookUrl, {
      method: 'POST',
      body: formData,
    });

    const data = Object.fromEntries(formData.entries());
    agregarFilaRE(data);
    reForm.reset();
  } catch (error) {
    console.error('Error al enviar datos RE:', error);
  }
});

document.addEventListener('DOMContentLoaded', cargarDatosRE);
