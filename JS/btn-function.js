d.addEventListener("DOMContentLoaded", e => {
    d.addEventListener("click", e => {
        if (e.target.matches(".pdf-card")) {
            Swal.fire({
                title: 'Seleccione el pdf que necesite',
                icon: 'info',
                showCancelButton: false,
                showConfirmButton: false,
                footer: `
                <div class="pdf-buttons">
                    <a target="_blank" href="../administrator/function/pdf_user.php" class="btn btn-secondary"><b>USERS <i class="bi bi-filetype-pdf"></i></b></a>
                    <a target="_blank" href="../administrator/function/pdf_provider.php" class="btn btn-secondary"><b>PROVIDERS <i class="bi bi-filetype-pdf"></i></b></a>
                    <a target="_blank" href="../administrator/function/pdf_user.php" class="btn btn-secondary"><b>ORDERS <i class="bi bi-filetype-pdf"></i></b></a>
                    <a target="_blank" href="../administrator/function/pdf_graphics.php" class="btn btn-secondary"><b>GRAPHICS <i class="bi bi-filetype-pdf"></i></b></a>
                </div>
                `,
                preConfirm: () => {
                  const swalButtons = document.querySelectorAll('.swal-btn');
                  swalButtons.forEach(button => {
                    button.addEventListener('click', () => {
                      const buttonText = button.textContent;
                      if (buttonText === 'Botón 1') {
                        Swal.fire('Botón 1 clicado', 'Función del Botón 1', 'success');
                      } else if (buttonText === 'Botón 2') {
                        Swal.fire('Botón 2 clicado', 'Función del Botón 2', 'success');
                      }
                    });
                  });
                }
              });
        }
    });
    
    
      
        d.addEventListener("click", (e) => {
          if (e.target.matches(".toDo-card")) {
            console.log("click");
      
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      
            const container = document.createElement("div");
      
            container.innerHTML = `
              <div class="container-toDo">
                <h1>Tareas y Avisos Pendientes</h1>
                <div class="search">
                  <form>
                    <input type="text" placeholder="Agregar tarea...">
                    <button class="btn-add">+</button>
                  </form>
                </div>
                <div class="li-container">
                  <ul></ul>
                </div>
                <div class="empty">
                  <p>No tienes tareas pendientes.</p>
                </div>
              </div>
            `;
      
            Swal.fire({
              title: 'Lista de tareas',
              icon: 'success',
              showCancelButton: false,
              showConfirmButton: false,
              width: '70%',
              height: '700px',
              footer: container
            });
      
            const input = container.querySelector("input");
            const addBtn = container.querySelector(".btn-add");
            const ul = container.querySelector("ul");
            const empty = container.querySelector(".empty");
      
            function loadTasks() {
              tasks.forEach((taskText) => {
                const li = document.createElement("li");
                const p = document.createElement("p");
                p.textContent = taskText;
      
                li.appendChild(p);
                li.appendChild(addDeleteBtn());
                ul.appendChild(li);
              });
      
              if (tasks.length === 0) {
                empty.style.display = "block";
              } else {
                empty.style.display = "none";
              }
            }
      
            loadTasks();
      
            addBtn.addEventListener("click", (e) => {
              e.preventDefault();
      
              const text = input.value;
      
              if (text !== "") {
                const li = document.createElement("li");
                const p = document.createElement("p");
                p.textContent = text;
      
                li.appendChild(p);
                li.appendChild(addDeleteBtn());
                ul.appendChild(li);
      
                tasks.push(text);
                localStorage.setItem("tasks", JSON.stringify(tasks));
      
                input.value = "";
                empty.style.display = "none";
              }
            });
      
            function addDeleteBtn() {
              const deleteBtn = document.createElement("button");
      
              deleteBtn.textContent = "X";
              deleteBtn.className = "btn-delete";
      
              deleteBtn.addEventListener("click", (e) => {
                const item = e.target.parentElement;
                ul.removeChild(item);
      
                const index = tasks.indexOf(item.firstChild.textContent);
                tasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
      
                if (tasks.length === 0) {
                  empty.style.display = "block";
                }
              });
      
              return deleteBtn;
            }
          }
        });

        d.addEventListener("click", e => {
            if (e.target.matches(".support-card")) {
                Swal.fire({
                    title: 'Our Contact Information',
                    icon: 'info',
                    showCancelButton: false,
                    showConfirmButton: false,
                    footer: `
                    <div class="support-section">
                        <form id="contactForm">
                            <label for="name">Numero de colaborador:</label>
                            <input type="text" id="name" name="name" required>
                        
                            <label for="email">Correo Electrónico:</label>
                            <input type="email" id="email" name="email" required>
                        
                            <label for="message">Mensaje:</label>
                            <textarea id="message" name="message" rows="4" required></textarea>
                        
                            <button type="submit">Enviar Consulta</button>
                        </form>
                        <div class="support-numbers">
                            <h2>Numeros de contacto</h2>
                            <p>3141669964</p>
                            <p>3141669964</p>
                        </div>
                        <hr>
                        <div class="support-email">
                            <h2>Correo de contacto</h2>
                            <p>sportX@gmail.com</p>
                        </div>
                        <hr>
                        <div class="support-hours">
                            <h2>Horario de Atencion</h2>
                            <p>9:00 am - 12:00 pm</p>
                        </div>
                    </div>
                    `,
                  });
            }
        });
});

let bellFalse = document.querySelector(".bell-false");
let bellTrue = document.querySelector(".bell-true");

// Función para verificar la cantidad de productos
async function verificarCantidadProductos() {
  // Verifica la cantidad total de productos desde el servidor (utilizando PHP)
  try {
    const response = await fetch('../administrator/consulta-notis.php');
    const data = await response.json();

    if (typeof data === 'object' && data !== null && 'total_stock' in data) {
      const totalStock = parseInt(data.total_stock, 10); // Convertir a número

      if (bellTrue.style.display === "block" && !isNaN(totalStock) && totalStock > 32823) {
        const Toast = Swal.mixin({
            toast: true,
            title: "Alerta",
            position: "bottom-end",
            showConfirmButton: false,
            timer: false,
            showCloseButton: true,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
              // Agrega estilos personalizados al toast
              toast.style.backgroundColor = '#dc3545';
              toast.style.color = '#ffffff';
            }
          });
          
          Toast.fire({
            icon: "error",
            title: "¡Baja cantidad de productos!"
          });
          
      }
    } else {
      console.error('Error al obtener la cantidad de productos: data no es un objeto con la propiedad total_stock', data);
    }
  } catch (error) {
    console.error('Error en la solicitud fetch:', error);
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      color: '#FF0000',
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      title: "¡Hubo un error al obtener la cantidad de productos!"
    });
  }
}

function obtenerEstadoCampana() {
  const estadoCampana = localStorage.getItem('estadoCampana');
  if (estadoCampana === 'bellFalse') {
    bellFalse.style.display = 'block';
    bellTrue.style.display = 'none';
  } else {
    bellFalse.style.display = 'none';
    bellTrue.style.display = 'block';
  }
}


document.addEventListener('DOMContentLoaded', async function () {
  obtenerEstadoCampana();
  await verificarCantidadProductos();
});

document.querySelector(".notis-card").addEventListener("click", async function () {
  // Cambia la lógica de la campana
  if (bellFalse.style.display === "none") {
    bellFalse.style.display = "block";
    bellTrue.style.display = "none";
    localStorage.setItem('estadoCampana', 'bellFalse');
  } else {
    bellFalse.style.display = "none";
    bellTrue.style.display = "block";
    localStorage.setItem('estadoCampana', 'bellTrue');
    await verificarCantidadProductos();
  }
});
