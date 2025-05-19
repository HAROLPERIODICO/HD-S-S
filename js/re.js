// File: js/re.js
// Description: JavaScript code to handle the backlog form submission and data display
const reForm = document.getElementById('reForm');
const reTableBody = document.querySelector('#reTable tbody');
const reWebhookUrl = 'https://script.google.com/macros/s/AKfycbxZvIrWFXRoKkjmRvo6B1NWmyidLpJzK9M7SeiDfuzLUxrqdjogahI1vtAIPf1b5YnL/exec'; // remplaza esto con la tuya

function agregarFilaRE(data) {
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
  reTableBody.appendChild(row);
}

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

    const responseData = await res.json();
    agregarFilaRE(responseData);
    reForm.reset();
  } catch (err) {
    console.error('Error al enviar datos:', err);
  }
});

document.addEventListener('DOMContentLoaded', cargarDatosRE);
