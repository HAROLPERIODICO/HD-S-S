// File: js/re.js
// Description: JavaScript code to handle the backlog form submission and data display
const reForm = document.getElementById('reForm');
const reTableBody = document.querySelector('#reTable tbody');
const reWebhookUrl = 'https://script.google.com/macros/s/AKfycbxZvIrWFXRoKkjmRvo6B1NWmyidLpJzK9M7SeiDfuzLUxrqdjogahI1vtAIPf1b5YnL/exec'; // ← Reemplaza con tu URL de implementación

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

  // Convertir imagen a base64 si existe
  const file = formData.get('foto');
  if (file && file.size > 0) {
    const reader = new FileReader();
    reader.onloadend = async function () {
      data.foto = reader.result; // Base64
      await enviarDatosRE(data);
    };
    reader.readAsDataURL(file);
  } else {
    await enviarDatosRE(data);
  }
});

async function enviarDatosRE(data) {
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
}


document.addEventListener('DOMContentLoaded', cargarDatosRE);


        
