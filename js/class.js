class Producto {
  _idProducto;
  _nombreProducto;
  _precioUnidad;
  _idCategoria;

  constructor(idProducto, nombreProducto, precioUnidad, idCategoria) {
    this._idProducto = idProducto;
    this._nombreProducto = nombreProducto;
    this._precioUnidad = precioUnidad;
    this._idCategoria = idCategoria;
  }

  get idProducto() {
    return this._idProducto;
  }
  set idProducto(idProducto) {
    this._idProducto = idProducto;
  }

  get nombreProducto() {
    return this._nombreProducto;
  }
  set nombreProducto(nombreProducto) {
    this._nombreProducto = nombreProducto;
  }

  get precioUnidad() {
    return this._precioUnidad;
  }
  set precioUnidad(precioUnidad) {
    this._precioUnidad = precioUnidad;
  }

  get idCategoria() {
    return this._idCategoria;
  }
  set idCategoria(idCategoria) {
    this._idCategoria = idCategoria;
  }
}

class Catalogo {
  _productos;

  constructor() {
    this._productos = [];
  }

  get productos() {
    return this._productos;
  }
  set productos(productos) {
    this._productos = productos;
  }

  addProducto(idProducto, nombreProducto, precioUnidad, idCategoria) {
    this._productos.push(new Producto(idProducto, nombreProducto, precioUnidad, idCategoria));
  }
}

class LineaCuenta {
  _unidades;
  _idProducto;

  constructor(idProducto, unidades) {
    this._idProducto = idProducto;
    this._unidades = unidades;
  }

  get idProducto() {
    return this._idProducto;
  }
  set idProducto(idProducto) {
    this._idProducto = idProducto;
  }

  get unidades() {
    return this._unidades;
  }
  set unidades(unidades) {
    this._unidades = unidades;
  }
}

class Cuenta {
  _mesa;
  _lineasDeCuenta;
  _pagada;

  constructor(mesa, pagada) {
    this._mesa = mesa;
    this._lineasDeCuenta = [];
    this._pagada = pagada;
  }

  get mesa() {
    return this._mesa;
  }
  set mesa(mesa) {
    this._mesa = mesa;
  }

  get lineasDeCuenta() {
    return this._lineasDeCuenta;
  }
  set lineasDeCuenta(lineasDeCuenta) {
    this._lineasDeCuenta = lineasDeCuenta;
  }

  get pagada() {
    return this._pagada;
  }
  set pagada(pagada) {
    this._pagada = pagada;
  }
}

class Gestor {
  _cuentas;
  _mesaActual;

  constructor() {
    this._cuentas = [];
    this._mesaActual = 1;
  }

  get cuentas() {
    return this._cuentas;
  }
  set cuentas(cuentas) {
    this._cuentas = cuentas;
  }

  get mesaActual() {
    return this._mesaActual;
  }
  set mesaActual(mesaActual) {
    this._mesaActual = mesaActual;
  }
}
