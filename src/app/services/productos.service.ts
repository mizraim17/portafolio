import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProducto();
  }

  private cargarProducto() {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          ' https://wepapp-angular-default-rtdb.firebaseio.com/productos_idx.json'
        )
        .subscribe((resp: any) => {
          console.log('res', resp);
          this.productos = resp;
          this.cargando = false;
          resolve;
        });
    });
  }

  getProducto(id: string) {
    return this.http.get(
      ` https://wepapp-angular-default-rtdb.firebaseio.com/productos/${id}.json`
    );
  }

  buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      this.cargarProducto().then(() => {
        this.filtrarProductos(termino);
      });
    } else {
      this.filtrarProductos(termino);
    }

    console.log(this.productosFiltrado);
  }

  private filtrarProductos(termino: string) {
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach((prod) => {
      const tituloLower: any = prod.titulo?.toLocaleLowerCase();

      console.log('-->', tituloLower);

      let uno: any = prod.categoria?.indexOf(termino);
      let dos: any = tituloLower.indexOf(termino);

      if (uno >= 0 || dos >= 0) {
        this.productosFiltrado.push(prod);
      }
    });
  }
}
