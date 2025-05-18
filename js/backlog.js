// File: js/re.js
// Description: JavaScript code to handle the backlog form submission and data display
          
            const backlogForm = document.getElementById('backlogForm');
            const backlogTableBody = document.querySelector('#backlogTable tbody');
            const backlogWebhookUrl = 'https://script.google.com/macros/s/AKfycbxbejBBBJJZ6X5XbZq59GCJBfg__HlMiO09xId-nqzA5vwisQuP2oUQEAkgKOKUDeJm/exec';

            function agregarFilaBacklog(data) {
              const row = document.createElement('tr');
              ['fecha', 'equipo', 'descripcion', 'parte', 'prioridad', 'responsable', 'turno', 'grupo', 'accion'].forEach(key => {
                const td = document.createElement('td');
                td.textContent = data[key] || '';
                row.appendChild(td);
              });
              backlogTableBody.appendChild(row);
            }

            async function cargarDatosBacklog() {
              try {
                const response = await fetch(backlogWebhookUrl);
                const registros = await response.json();
                backlogTableBody.innerHTML = ''; // Limpiar
                registros.forEach(agregarFilaBacklog);
              } catch (error) {
                console.error('Error al cargar registros:', error);
              }
            }

            backlogForm.addEventListener('submit', async function (e) {
              e.preventDefault();
              const formData = new FormData(backlogForm);
              const data = Object.fromEntries(formData.entries());

              try {
                await fetch(backlogWebhookUrl, {
                  method: 'POST',
                  mode: 'no-cors',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data)
                });

                agregarFilaBacklog(data);
                backlogForm.reset();
              } catch (error) {
                console.error('Error al enviar datos:', error);
              }
            });

            document.addEventListener('DOMContentLoaded', cargarDatosBacklog);
          