// script.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-re");
  const mensaje = document.getElementById("mensaje-exito");
  const fechaInput = document.getElementById("fecha");
  const equipoSelect = document.getElementById("equipo");
  const filtroEquipo = document.getElementById("filtro-equipo");

  // Llenar opciones de equipos
  for (let i = 137; i <= 156; i++) {
    const option1 = new Option(i, i);
    const option2 = new Option(i, i);
    equipoSelect.appendChild(option1);
    filtroEquipo.appendChild(option2);
  }

  fechaInput.value = new Date().toISOString().split("T")[0];

  const scriptURL = 'https://script.google.com/macros/s/TU_SCRIPT_URL/exec'; // Reemplaza TU_SCRIPT_URL

  form.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(form);

    fetch(scriptURL, { method: "POST", body: formData })
      .then(() => {
        form.reset();
        fechaInput.value = new Date().toISOString().split("T")[0];
        mensaje.style.display = "block";
        setTimeout(() => mensaje.style.display = "none", 4000);
        loadTable();
      })
      .catch(err => alert("Error al enviar los datos"));
  });

  document.getElementById("filtro-accion").addEventListener("change", loadTable);
  document.getElementById("filtro-equipo").addEventListener("change", loadTable);
  document.getElementById("filtro-turno").addEventListener("change", loadTable);
  document.getElementById("filtro-grupo").addEventListener("change", loadTable);

  loadTable();
});

function loadTable() {
  fetch('https://opensheet.elk.sh/1a2b3c4d5e6f7g/RE') // Reemplaza con tu hoja pública
    .then(res => res.json())
    .then(data => {
      const filtroAccion = document.getElementById("filtro-accion").value;
      const filtroEquipo = document.getElementById("filtro-equipo").value;
      const filtroTurno = document.getElementById("filtro-turno").value;
      const filtroGrupo = document.getElementById("filtro-grupo").value;

      const tabla = document.getElementById("tabla_re_chart");
      tabla.innerHTML = "";

      const table = document.createElement("table");
      table.classList.add("re-table");

      const thead = document.createElement("thead");
      thead.innerHTML = `
        <tr>
          <th>Fecha</th>
          <th>Equipo</th>
          <th>Descripción</th>
          <th>Parte</th>
          <th>Responsable</th>
          <th>Turno</th>
          <th>Grupo</th>
          <th>Acción</th>
        </tr>
      `;
      table.appendChild(thead);

      const tbody = document.createElement("tbody");
      data.forEach(row => {
        const cumpleFiltroAccion = filtroAccion === "TODAS" || row.accion === filtroAccion;
        const cumpleFiltroEquipo = filtroEquipo === "TODOS" || row.equipo === filtroEquipo;
        const cumpleFiltroTurno = filtroTurno === "TODOS" || row.turno === filtroTurno;
        const cumpleFiltroGrupo = filtroGrupo === "TODOS" || row.grupo === filtroGrupo;

        if (cumpleFiltroAccion && cumpleFiltroEquipo && cumpleFiltroTurno && cumpleFiltroGrupo) {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${row.fecha}</td>
            <td>${row.equipo}</td>
            <td>${row.descripcion}</td>
            <td>${row.parte}</td>
            <td>${row.responsable}</td>
            <td>${row.turno}</td>
            <td>${row.grupo}</td>
            <td>${row.accion}</td>
          `;
          tbody.appendChild(tr);
        }
      });

      table.appendChild(tbody);
      tabla.appendChild(table);
    });
}
