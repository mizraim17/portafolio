import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProducto();
  }

  private cargarProducto() {
    this.http
      .get(
        ' https://wepapp-angular-default-rtdb.firebaseio.com/productos_idx.json'
      )
      .subscribe((resp: any) => {
        this.productos = resp;
        console.log('productos', resp);

        this.cargando = false;
      });
  }
}
