// Base de datos de productos - Solo escribes el precio una vez
const productos2 = [
    {
        nombre: "Aguardiente Amarillo De Manzanares 750ml",
        precio: 55000,
        imagen: "img/Productos/Licores/AguardienteAmarilllo750.png",
        alt: "Team Grandes",
        tipo: "simple"
    },
    {
        nombre: "Whisky Old Parr 750ml",
        precio: 155000,
        imagen: "img/Productos/Licores/WhiskyOP750.png",
        alt: "Paladar Fino",
        tipo: "simple"
    },
    {
        nombre: "Whisky Buchanan's Master 750ml",
        precio: 196000,
        imagen: "img/Productos/Licores/WhiskyBM750.png",
        alt: "Importadas",
        tipo: "simple"
    },
    {
        nombre: "Whisky Buchanan's Deluxe 750ml",
        precio: 167000,
        imagen: "img/Productos/Licores/WhiskyBD750.png",
        alt: "REHIDRATATE",
        tipo: "simple"
    },
    {
        nombre: "Whisky Old Parr 1000ml",
        precio: 183000,
        imagen: "img/Productos/Licores/WhiskyOP1000.png",
        alt: "Refrescos",
        tipo: "simple"
    },
    {
        nombre: "Aguardiente Antioqueño Sin Azúcar 750ml",
        precio: 55000,
        imagen: "img/Productos/Licores/AguardienteAntioqueñoSA750.png",
        alt: "Cervezas",
        tipo: "simple"
    },
    {
        nombre: "Aguardiente Antioqueño Sin Azúcar Verde 750ml",
        precio: 50000,
        imagen: "img/Productos/Licores/AguardienteAntioqueñoSAV750.png",
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
    const contenedores = document.querySelectorAll('.productos-grid2');
    
    if (contenedores.length === 0) {
        console.error('No se encontró ningún .productos-grid2');
        return;
    }
    
    const contenedor = contenedores[contenedores.length - 1];
    let html = '';
    
    productos2.forEach(producto => {
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