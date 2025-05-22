document.getElementById('mostrarTablaBACKLOG').addEventListener('click', function () {
  const tabla = document.getElementById('contenedorTablaBACKLOG');
  if (tabla.style.display === 'none') {
    tabla.style.display = 'block';
    this.textContent = 'Ocultar tabla BACKLOG';
  } else {
    tabla.style.display = 'none';
    this.textContent = 'Mostrar tabla BACKLOG';
  }
});

const btnMostrar = document.getElementById('mostrarTablaBACKLOG');
const contenedorTabla = document.getElementById('contenedorTablaBACKLOG');

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
    this.textContent = 'Ocultar tabla BACKLOG';
  }
});
