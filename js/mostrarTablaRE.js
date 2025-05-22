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
