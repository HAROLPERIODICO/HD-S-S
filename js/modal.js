function inicializarModalFormulario() {
  const abrirBtn = document.getElementById('abrirFormulario');
  const modal = document.getElementById('modalFormulario');
  const cerrar = document.querySelector('.cerrar');

  abrirBtn.onclick = () => {
    modal.style.display = 'block';
  }

  cerrar.onclick = () => {
    modal.style.display = 'none';
  }

  window.onclick = (e) => {
    if (e.target == modal) {
      modal.style.display = 'none';
    }
  }
}

// Ejecutamos la función cuando la página ya cargó
document.addEventListener('DOMContentLoaded', inicializarModalFormulario);