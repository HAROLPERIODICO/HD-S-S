document.getElementById('mostrarTablaBACKLOG').addEventListener('click', function () {
  const tablaB = document.getElementById('contenedorTablaBACKLOG');
  if (tablaB.style.display === 'none') {
    tablaB.style.display = 'block';
    this.textContent = 'Ocultar tabla BACKLOG';
  } else {
    tablaB.style.display = 'none';
    this.textContent = 'Mostrar tabla BACKLOG';
  }
});

const btnMostrarB = document.getElementById('mostrarTablaBACKLOG');
const contenedorTablaB = document.getElementById('contenedorTablaBACKLOG');

btnMostrarB.addEventListener('click', function () {
  if (contenedorTablaB.classList.contains('mostrar')) {
    contenedorTablaB.classList.remove('mostrar');
    // Esperar la transición antes de ocultar completamente
    setTimeout(() => {
      contenedorTablaB.style.display = 'none';
    }, 300);
    this.textContent = 'Mostrar tabla RE';
  } else {
    contenedorTablaB.style.display = 'block';
    setTimeout(() => {
      contenedorTablaB.classList.add('mostrar');
    }, 10);
    this.textContent = 'Ocultar tabla BACKLOG';
  }
});
