const gestor = new Gestor();
gestor.mesaActual = 1;
const catalogo = new Catalogo();

const categorias = ["Bebidas", "Tostadas", "Bollería"];

catalogo.addProducto(1, "Café con leche", 0.95, 0);
catalogo.addProducto(2, "Té", 1.05, 0);
catalogo.addProducto(3, "Cola-cao", 1.35, 0);
catalogo.addProducto(4, "Chocolate a la taza", 1.95, 0);
catalogo.addProducto(5, "Media con aceite", 1.25, 1);
catalogo.addProducto(6, "Entera con aceite", 1.95, 1);
catalogo.addProducto(7, "Media con aceite y jamón", 1.95, 1);
catalogo.addProducto(8, "Entera con aceite y jamón", 2.85, 1);
catalogo.addProducto(9, "Media con mantequilla", 1.15, 1);
catalogo.addProducto(10, "Entera con mantequilla", 1.75, 1);
catalogo.addProducto(11, "Media con manteca colorá", 1.45, 1);
catalogo.addProducto(12, "Entera con manteca colorá", 2.15, 1);
catalogo.addProducto(13, "Croissant", 0.95, 2);
catalogo.addProducto(14, "Napolitana de chocolate", 1.45, 2);
catalogo.addProducto(15, "Caracola de crema", 1.65, 2);
catalogo.addProducto(16, "Caña de chocolate", 1.35, 2);

const mesas = document.querySelectorAll(".mesa");
const categoriasSelect = document.querySelector("select[name='categorias']");
const productosSelect = document.querySelector("select[name='productos']");
const panelCuenta = document.getElementById("cuenta");
productosIniciales();

//Ponemos todas las mesas en verde 
mesas.forEach((mesa) => {
    mesa.classList.add("libre");
});

// Si se hace click en alguna mesa la ponemos como seleccionada en el gestor
mesas.forEach((mesa) => { 
    mesa.addEventListener("click", () => {
        gestor.mesaActual = mesa.textContent;
        const cuentaExistente = gestor.cuentas.find(cuenta => cuenta.mesa === gestor.mesaActual);

        if (!cuentaExistente) {
            const cuenta = new Cuenta(mesa.textContent, false);
            gestor.cuentas.push(cuenta);
        }

        calcularTotal()
    });
});

// Añadimos las categorias al select de categorias
categorias.forEach((categoria) => {
    const option = document.createElement("option");
    option.value = categoria; 
    option.textContent = categoria;

    categoriasSelect.appendChild(option);
});

// Si cambia la categoria actualizamos las opciones para que correspondan con la categoria seleccionada
categoriasSelect.addEventListener("change", (event) => {
    productosSelect.innerHTML = "";
    const categoriaSeleccionada = categorias.indexOf(event.target.value);

    catalogo.productos.forEach((producto) => {
        if (producto.idCategoria === categoriaSeleccionada) {
            const option = document.createElement("option");
            option.value = producto.nombreProducto;
            option.textContent = producto.nombreProducto;

            productosSelect.appendChild(option);
        }
    });
});

const tecladoUnidades = document.querySelectorAll(".tecla")

// Cuando pulse las unidades de un producto añadimos ese producto a la cuenta de la mesa seleccionada
tecladoUnidades.forEach((tecla) => { 
    tecla.addEventListener("click", () => {
        //Por si mete directamente productos sin pulsar la mesa 1
        if (gestor.mesaActual === 1) {
            const cuenta = new Cuenta(1, false);
            gestor.cuentas.push(cuenta);
            mesas.forEach((mesa) => {
                if (mesa.textContent == gestor.mesaActual) {
                    mesa.classList.add("ocupada");
                }
            })
        }

        const unidades = Number(tecla.value);
        const producto = catalogo.productos.find((producto) => producto.nombreProducto === productosSelect.value);
        const cuentaMesa = gestor.cuentas.find((cuenta) => cuenta.mesa === gestor.mesaActual);
        let lineaDeCuenta = cuentaMesa.lineasDeCuenta.find(linea => linea.idProducto === producto.idProducto);

        if (!cuentaMesa.pagada) {
            // Ponemos la mesa como ocupada
            mesas.forEach((mesa) => {
                if (mesa.textContent === gestor.mesaActual) {
                    mesa.classList.add("ocupada");
                }
            });

            // Si repite producto le avisamos que si quiere añadir mas lo haga con los botones de + y -
            if (lineaDeCuenta) {
                alert("Producto ya añadido. Si quieres añadir mas unidades hazlo desde el panel de Cuenta");
            } else {
                // Si no esta ese producto añadido lo añadimos a su cuenta
                lineaDeCuenta = new LineaCuenta(producto.idProducto, unidades);
                cuentaMesa.lineasDeCuenta.push(lineaDeCuenta);
            }

            calcularTotal();
        }
    });
});

// Productos iniciales al cargar la pagina
function productosIniciales() {
    catalogo.productos.forEach((producto) => {
        if (producto.idCategoria === 0) {
            const option = document.createElement("option");
            option.value = producto.nombreProducto;
            option.textContent = producto.nombreProducto;

            productosSelect.appendChild(option);
        }
    });
}

// Funcion para calcular el total a pagar de la cuenta
function calcularTotal() {
    panelCuenta.innerHTML = "";
    const datosMesaSeleccionada = gestor.cuentas.find((cuenta) => cuenta.mesa === gestor.mesaActual);
    let total = 0;

    datosMesaSeleccionada.lineasDeCuenta.forEach((linea) => {
        const productoSeleccionado = catalogo.productos.find(producto => producto.idProducto === linea.idProducto);

        total += linea.unidades * productoSeleccionado.precioUnidad;
    });


    const h1Mesa = document.createElement("h1");
    h1Mesa.textContent = `Mesa ${gestor.mesaActual}`;
    h1Mesa.id = "h1Mesa";
    panelCuenta.appendChild(h1Mesa);

    const h1Total = document.createElement("h1");
    h1Total.textContent = `Total: ${total.toFixed(2)}€`;
    h1Total.id = "h1Total";
    panelCuenta.appendChild(h1Total);

    // Verifica si la tabla ya existe y la elimina
    const tablaExistente = document.getElementById("tablaCuenta");
    if (tablaExistente) {
        tablaExistente.remove();
    }

    pintarTabla(total, datosMesaSeleccionada)
}

// Funcion para generar la tabla con la cuenta de la mesa seleccionada
function pintarTabla(total, datosMesaSeleccionada) {

    pagar(datosMesaSeleccionada)

    const tabla = document.createElement("table");
    tabla.id = "tablaCuenta";

    const theader = document.createElement("thead");
    const tr = document.createElement("tr");
    const camposDeLaTabla = ["Modificar", "Uds", "Id", "Producto", "Precio"];
    
    theader.appendChild(tr);
    
    camposDeLaTabla.forEach((campo) => {
        const th = document.createElement("th");
        th.textContent = campo;
        tr.appendChild(th);
    });
    
    const tbody = document.createElement("tbody");
    
    datosMesaSeleccionada.lineasDeCuenta.forEach((linea) => {
        const productoSeleccionado = catalogo.productos.find(producto => producto.idProducto === linea.idProducto);
        const trBody = document.createElement("tr");

        const tdBotones = document.createElement("td");

        const botonAñadir = document.createElement("button");
        botonAñadir.textContent = "+";
        botonAñadir.classList.add("boton");

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "-";
        botonEliminar.classList.add("boton");

        const tdUds = document.createElement("td");
        tdUds.textContent = linea.unidades;
        
        const tdId = document.createElement("td");
        tdId.textContent = linea.idProducto;
        
        const tdProducto = document.createElement("td");
        tdProducto.textContent = productoSeleccionado.nombreProducto;
        
        const tdPrecio = document.createElement("td");
        tdPrecio.textContent = productoSeleccionado.precioUnidad;
        
        botonAñadir.addEventListener("click", () => {
            linea.unidades++;
            tdUds.textContent = linea.unidades;

            const h1Total = document.getElementById("h1Total");

            total += productoSeleccionado.precioUnidad;
            
            h1Total.textContent = `${total.toFixed(2)} €`; 
        })

        botonEliminar.addEventListener("click", () => {
            // Si quiere eliminar unidades y pone menos de una unidad que se borre el producto de la cuenta
            if (linea.unidades > 1) {
                linea.unidades--;
                tdUds.textContent = linea.unidades;

                const h1Total = document.getElementById("h1Total");

                total -= productoSeleccionado.precioUnidad;
                
                h1Total.textContent = `${total.toFixed(2)} €`;  
            }
            else {
                if (confirm("Esta seguro de que quieres eliminar el producto de su cuenta")) {
                    const indiceProducto = datosMesaSeleccionada.lineasDeCuenta.findIndex(linea => linea.idProducto == productoSeleccionado.idProducto)

                    if (indiceProducto !== -1) {
                        datosMesaSeleccionada.lineasDeCuenta.splice(indiceProducto, 1);

                        total -= productoSeleccionado.precioUnidad;
                        
                        const h1Total = document.getElementById("h1Total");
                        h1Total.textContent = `${total.toFixed(2)} €`;
                        
                        calcularTotal();  
                    }
                }
            }
        })

        tdBotones.appendChild(botonAñadir);
        tdBotones.appendChild(botonEliminar);
        trBody.appendChild(tdBotones);
        trBody.appendChild(tdUds);
        trBody.appendChild(tdId);
        trBody.appendChild(tdProducto);
        trBody.appendChild(tdPrecio);
        
        tbody.appendChild(trBody);
    });

    tabla.appendChild(theader);
    tabla.appendChild(tbody);

    panelCuenta.appendChild(tabla);
}

// Funcion para que al pulsar al boton de pagar se borre la tabla, la cuenta, etc
function pagar(datosMesaSeleccionada) {
    const botonPagar = document.createElement("button");
    botonPagar.textContent = "PAGAR Y LIBERAR MESA";
    botonPagar.classList.add("boton");

    botonPagar.addEventListener("click", () => {
        datosMesaSeleccionada.pagada = true;
        alert("Cuenta pagada. Muchas gracias");
        indiceCuenta = gestor.cuentas.findIndex(cuenta => cuenta.mesa === gestor.mesaActual);

        if (indiceCuenta !== -1) {
            gestor.cuentas.splice(indiceCuenta, 1);
        }

        const h1Total = document.getElementById("h1Total");
        const h1Mesa = document.getElementById("h1Mesa");
        const tabla = document.getElementById("tablaCuenta");

        h1Mesa.remove();
        h1Total.remove();
        tabla.remove();
        botonPagar.remove();
        
        mesas.forEach((mesa) => {
            if (mesa.textContent == gestor.mesaActual) {
                mesa.classList.remove("ocupada");
            }
        })
    })

    panelCuenta.appendChild(botonPagar);
}