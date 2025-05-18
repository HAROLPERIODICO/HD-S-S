// File: js/re.js
// Description: JavaScript code to handle the backlog form submission and data display
const reForm = document.getElementById('reForm');
const reTableBody = document.querySelector('#reTable tbody');
const reWebhookUrl = 'https://script.google.com/macros/s/AKfycby1eiYh_S4JMY48EQdfnz7YMuecE4W9HOU-w3K_PPU-DvO1k9Ona2toaAC_FfqizR75/exec'; // Pega tu URL aquí

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
    reTableBody.innerHTML = '';
    registros.forEach(agregarFilaRE);
  } catch (error) {
    console.error('Error al cargar registros:', error);
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
    console.error('Error al enviar datos:', error);
  }
});

document.addEventListener('DOMContentLoaded', cargarDatosRE);
// File: js/re.js
// Description: JavaScript code to handle the backlog form submission and data display

        