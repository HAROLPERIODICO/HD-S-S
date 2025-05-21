// File: js/re.js
// Description: JavaScript code to handle the backlog form submission and data display
const reForm = document.getElementById('reForm');
const reTableBody = document.querySelector('#reTable tbody');
const reWebhookUrl = 'https://script.google.com/macros/s/AKfycbyAQiWkTmf8FJtt8_Yzg2Et5Yu2VoUjUul_Y_dAhO-bkKhap9YHT7AVpcDY4S-xm6dM/exec'; // <- Reemplaza con tu URL real
const imagenInput = document.getElementById('imagenInput');

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

function agregarFilaRE(item) {
  const fila = document.createElement('tr');
  fila.innerHTML = `
    <td>${item.fecha}</td>
    <td>${item.equipo}</td>
    <td>${item.descripcion}</td>
    <td>${item.parte}</td>
    <td>${item.prioridad}</td>
    <td>${item.responsable}</td>
    <td>${item.turno}</td>
    <td>${item.grupo}</td>
    <td>${item.accion}</td>
    <td>${item.imagenUrl ? `<a href="${item.imagenUrl}" target="_blank">Ver imagen</a>` : 'Sin imagen'}</td>
  `;
  reTableBody.appendChild(fila);
}

reForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(reForm);
  const file = imagenInput.files[0];

  let imagenBase64 = '';
  if (file) {
    imagenBase64 = await convertirArchivoABase64(file);
  }

  const datos = {
    fecha: formData.get('fecha'),
    equipo: formData.get('equipo'),
    descripcion: formData.get('descripcion'),
    parte: formData.get('parte'),
    prioridad: formData.get('prioridad'),
    responsable: formData.get('responsable'),
    turno: formData.get('turno'),
    grupo: formData.get('grupo'),
    accion: formData.get('accion'),
    imagen: imagenBase64
  };

  try {
    const res = await fetch(reWebhookUrl, {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: { 'Content-Type': 'application/json' }
    });

    const responseData = await res.json();
    agregarFilaRE(responseData);
    reForm.reset();
  } catch (err) {
    console.error('Error al enviar datos RE:', err);
  }
});

function convertirArchivoABase64(file) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(lector.result.split(',')[1]);
    lector.onerror = reject;
    lector.readAsDataURL(file);
  });
}

document.addEventListener('DOMContentLoaded', cargarDatosRE);

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


