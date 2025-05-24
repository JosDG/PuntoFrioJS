document.addEventListener('DOMContentLoaded', function () {
    // Menú móvil
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');

    if (mobileMenuBtn && menu) {
        mobileMenuBtn.addEventListener('click', function () {
            menu.classList.toggle('active');

            // Animar el botón de menú
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));

            if (menu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Cerrar menú al hacer clic en un enlace
    const menuLinks = document.querySelectorAll('.menu a');

    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');

                // Restaurar el botón de menú
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Navegación suave al hacer clic en los enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Cambiar estilo del header al hacer scroll
    const header = document.querySelector('header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'var(--white)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Animación de aparición al hacer scroll
    const animateElements = document.querySelectorAll('.producto-card, .paso, .nosotros-content, .contacto-item');

    function checkScroll() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Aplicar estilos iniciales para la animación
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Verificar posición al cargar la página
    window.addEventListener('load', checkScroll);

    // Verificar posición al hacer scroll
    window.addEventListener('scroll', checkScroll);
});

// Función para enviar la tabla por WhatsApp
function enviarTablaPorWhatsapp(numeroTelefono) {
    let mensaje = "🛒 *Lista de Pedido:*\n\n";
    const filas = document.querySelectorAll("#tabla-productos tr");

    filas.forEach(fila => {
        const celdas = fila.querySelectorAll("td");
        // Ignora la fila del total
        if (celdas.length >= 3 && !fila.id.includes("fila-total")) {
            const producto = celdas[0].innerText.trim(); // Columna 2 (Producto)
            const precio = celdas[1].innerText.trim();   // Columna 3 (Precio)
            mensaje += `• ${producto} - ${precio}\n`;
        }
    });

    // Agregar total al final
    const total = document.getElementById("total-valor").innerText;
    mensaje += `\n🧾 *Total:* ${total}`;

    // Reemplaza el número por el tuyo

    const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM cargado completamente");

    // Variables globales
    let contador = 1;
    let total = 0;

    // Elementos del DOM
    const tablaProductos = document.getElementById('tabla-productos');
    const filaTotal = document.getElementById('fila-total');
    const totalValor = document.getElementById('total-valor');

    // Elementos del modal de opciones
    const opcionesModal = document.getElementById('opcionesModal');
    const productoOpcionesNombre = document.getElementById('producto-opciones-nombre');
    const precioCompleto = document.getElementById('precio-completo');
    const precioSixpac = document.getElementById('precio-sixpac');
    const opcionCompleto = document.getElementById('opcion-completo');
    const opcionSixpac = document.getElementById('opcion-sixpac');

    // Producto actual para el modal de opciones
    let productoActual = null;

    // Función para formatear precios en formato colombiano
    function formatearPrecio(valor) {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(valor);
    }

    // Función para actualizar el total en el carrito
    function actualizarTotal() {
        if (totalValor) {
            totalValor.textContent = formatearPrecio(total);
            console.log("Total actualizado: " + formatearPrecio(total));
        }
    }

    // Función para agregar un producto al carrito
    function agregarProducto(nombre, precio) {
        console.log("Agregando producto:", nombre, "Precio:", precio);

        if (!tablaProductos || !filaTotal) {
            console.error("No se encontró la tabla o la fila total");
            return;
        }

        // Crear nueva fila para el producto
        const fila = document.createElement("tr");
        fila.innerHTML = `
                    <th scope="row">${contador++}</th>
                    <td>${nombre}</td>
                    <td>${formatearPrecio(precio)}</td>
                    <td><button type="button" class="btn btn-danger btn-sm eliminar">Eliminar</button></td>
                `;

        // Insertar la fila antes de la fila del total
        tablaProductos.insertBefore(fila, filaTotal);

        // Actualizar el total
        total += precio;
        actualizarTotal();

        // Agregar evento para eliminar el producto
        const btnEliminar = fila.querySelector(".eliminar");
        if (btnEliminar) {
            btnEliminar.addEventListener("click", function () {
                total -= precio;
                fila.remove();
                actualizarTotal();
                console.log("Producto eliminado:", nombre);
            });
        }
    }

    // Evento para los botones de añadir
    document.addEventListener('click', function (event) {
        // Verificar si el elemento clickeado es un botón de añadir
        if (event.target.classList.contains('order-btn') &&
            event.target.hasAttribute('data-nombre') &&
            event.target.hasAttribute('data-precio') &&
            !event.target.hasAttribute('data-bs-toggle')) {

            const nombre = event.target.getAttribute('data-nombre');
            const precio = parseInt(event.target.getAttribute('data-precio'));

            console.log("Botón clickeado:", nombre, precio);
            agregarProducto(nombre, precio);

            // Efecto visual - Asegurarse de aplicar al elemento correcto
            event.target.classList.add('agregado');
            setTimeout(() => {
                event.target.classList.remove('agregado');
            }, 500);
        }
    });

    // Configurar el modal de opciones
    if (opcionesModal) {
        opcionesModal.addEventListener('show.bs.modal', function (event) {
            console.log("Modal de opciones abierto");

            const button = event.relatedTarget;
            const nombre = button.getAttribute('data-nombre');
            const precioCompletoValor = parseInt(button.getAttribute('data-precio-completo'));
            const precioSixpacValor = parseInt(button.getAttribute('data-precio-sixpac'));

            productoActual = {
                nombre: nombre,
                precioCompleto: precioCompletoValor,
                precioSixpac: precioSixpacValor
            };

            if (productoOpcionesNombre) productoOpcionesNombre.textContent = nombre;
            if (precioCompleto) precioCompleto.textContent = formatearPrecio(precioCompletoValor);
            if (precioSixpac) precioSixpac.textContent = formatearPrecio(precioSixpacValor);
        });

        // Evento para la opción completa
        if (opcionCompleto) {
            opcionCompleto.addEventListener('click', function () {
                if (productoActual) {
                    console.log("Opción completa seleccionada");
                    agregarProducto(productoActual.nombre + ' x24 uds', productoActual.precioCompleto);

                    // Cerrar el modal
                    const modal = bootstrap.Modal.getInstance(opcionesModal);
                    if (modal) modal.hide();
                }
            });
        }

        // Evento para la opción sixpac
        if (opcionSixpac) {
            opcionSixpac.addEventListener('click', function () {
                if (productoActual) {
                    console.log("Opción sixpac seleccionada");
                    agregarProducto(productoActual.nombre + ' Sixpac', productoActual.precioSixpac);

                    // Cerrar el modal
                    const modal = bootstrap.Modal.getInstance(opcionesModal);
                    if (modal) modal.hide();
                }
            });
        }
    }

    console.log("Script de carrito inicializado correctamente");
});

