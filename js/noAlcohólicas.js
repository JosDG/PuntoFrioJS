// Base de datos de productos - Solo escribes el precio una vez
const productos3 = [
    {
        nombre: "NN",
        precio: 0,
        imagen: "img/Productos/NoAlcohol/REHIDRATATE.jpg",
        alt: "Team Grandes",
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
    const contenedores = document.querySelectorAll('.productos-grid3');
    
    if (contenedores.length === 0) {
        console.error('No se encontró ningún .productos-grid3');
        return;
    }
    
    const contenedor = contenedores[contenedores.length - 1];
    let html = '';
    
    productos3.forEach(producto => {
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