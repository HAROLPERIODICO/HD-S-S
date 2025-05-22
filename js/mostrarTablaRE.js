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


