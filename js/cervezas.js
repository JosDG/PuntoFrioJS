// Base de datos de productos - Solo escribes el precio una vez
const productos = [
    {
        nombre: "Cerveza Aguila Original Retornable 250cm3 x38",
        precio: 80100,
        imagen: "img/Productos/Cerveza/Cerveza250R.png",
        alt: "Team",
        tipo: "simple"
    },
    {
        nombre: "Cerveza Aguila Original Lata 269cm3 x24 uds",
        precio: 55000,
        precioSixpac: 13750,
        imagen: "img/Productos/Cerveza/Cerveza269L.png",
        alt: "Paladar Fino",
        tipo: "modal"
    },
    {
        nombre: "Cerveza Aguila Light Lata 269cm3 x24 uds",
        precio: 50600,
        precioSixpac: 12650,
        imagen: "img/Productos/Cerveza/CervezaL269L.png",
        alt: "Importadas",
        tipo: "modal"
    },
    {
        nombre: "Cerveza Aguila Light Retornable 250cm3 x38 uds",
        precio: 80000,
        imagen: "img/Productos/Cerveza/CervezaL250R.png",
        alt: "REHIDRATATE",
        tipo: "simple"
    },
    {
        nombre: "Cerveza Aguila Original Lata 330cm3 x24 uds",
        precio: 76800,
        precioSixpac: 19200,
        imagen: "img/Productos/Cerveza/Cerveza330L.png",
        alt: "Refrescos",
        tipo: "modal"
    },
    {
        nombre: "Cerveza Costeña Bacana Lata 330cm3 x24 uds",
        precio: 60000,
        precioSixpac: 15000,
        imagen: "img/Productos/Cerveza/CervezaCosteña330L.png",
        alt: "Cervezas",
        tipo: "modal"
    },
    {
        nombre: "Cerveza Costeñita Retornable 175cm3 x38 uds",
        precio: 78100,
        imagen: "img/Productos/Cerveza/CervezaCosteña175R.png",
        alt: "Cervezas",
        tipo: "simple"
    },
    {
        nombre: "Cerveza Coronita No Retornable 210cm3 x24 uds",
        precio: 84000,
        precioSixpac: 21000,
        imagen: "img/Productos/Cerveza/CervezaCoronita210N.png",
        alt: "Cervezas",
        tipo: "modal"
    },
    {
        nombre: "Cerveza Corona Lata 269cm3 x24 uds",
        precio: 79600,
        precioSixpac: 19900,
        imagen: "img/Productos/Cerveza/CervezaCorona269L.png",
        alt: "Cervezas",
        tipo: "modal"
    },
    {
        nombre: "Cerveza Budweiser Lata 269cm3 x24 uds",
        precio: 60500,
        precioSixpac: 15125,
        imagen: "img/Productos/Cerveza/CervezaB269L.png",
        alt: "Cervezas",
        tipo: "modal"
    },
    {
        nombre: "Cerveza Club Colombia Dorada Retornable 330cm3 x30 uds",
        precio: 99000,
        imagen: "img/Productos/Cerveza/CervezaClub330R.png",
        alt: "Cervezas",
        tipo: "simple"
    },
    {
        nombre: "Cerveza Club Colombia Dorada Lata 269cm3 x24 uds",
        precio: 55000,
        precioSixpac: 13750,
        imagen: "img/Productos/Cerveza/CervezaClub269L.png",
        alt: "Cervezas",
        tipo: "modal"
    },
    {
        nombre: "Cerveza Poker Retornable 250cm3 x38 uds",
        precio: 80000,
        imagen: "img/Productos/Cerveza/CervezaPoker250R.png",
        alt: "Cervezas",
        tipo: "simple"
    }
];

// Función para formatear precio
function formatearPrecio(precio) {
    return precio.toLocaleString('es-CO');
}

// Función para obtener nombre base para modal
function obtenerNombreModal(nombre) {
    return nombre.replace(/\s+x\d+\s+uds?/i, '');
}

function generarProductos() {
    const contenedores = document.querySelectorAll('.productos-grid');

    if (contenedores.length === 0) {
        console.error('No se encontró ningún .productos-grid');
        return;
    }

    const contenedor = contenedores[contenedores.length - 1];
    let html = '';

    productos.forEach(producto => {
        const precioFormateado = formatearPrecio(producto.precio);

        if (producto.tipo === 'simple') {
            html += `
                <div class="producto-card">
                    <div class="producto-img">
                        <img src="${producto.imagen}" alt="${producto.alt}">
                    </div>
                    <div class="producto-info">
                        <h3>${producto.nombre}</h3>
                        <h2>$${precioFormateado}</h2>
                    </div>
                    <div class="producto-btn">
                        <button class="order-btn btn btn-primary"
                            data-nombre="${producto.nombre}"
                            data-precio="${producto.precio}">Añadir</button>
                    </div>
                </div>
            `;
        }
        else if (producto.tipo === 'modal') {
            const precioSixpacFormateado = formatearPrecio(producto.precioSixpac);
            const nombreModal = obtenerNombreModal(producto.nombre);

            html += `
                <div class="producto-card">
                    <div class="producto-img">
                        <img src="${producto.imagen}" alt="${producto.alt}">
                    </div>
                    <div class="producto-info">
                        <h3>${producto.nombre}</h3>
                        <h2>$${precioFormateado}</h2>
                        <h4>Sixpac: $${precioSixpacFormateado}</h4>
                    </div>
                    <div class="producto-btn">
                        <button class="order-btn btn btn-secondary mt-2" data-bs-toggle="modal"
                            data-bs-target="#opcionesModal" data-nombre="${nombreModal}"
                            data-precio-completo="${producto.precio}" 
                            data-precio-sixpac="${producto.precioSixpac}">Añadir</button>
                    </div>
                </div>
            `;
        }

    });

    contenedor.innerHTML = html;
    console.log('✅ Productos generados exitosamente');
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', generarProductos);

// También ejecutar inmediatamente si ya está cargado
if (document.readyState !== 'loading') {
    generarProductos();
}

// Función global para testing
window.generarProductos = generarProductos;
