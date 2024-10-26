import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoDescripcion } from 'src/app/interfaces/producto-descripcion.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  producto: ProductoDescripcion = {};
  id?: string;

  constructor(
    private route: ActivatedRoute,
    public producService: ProductosService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((parametros) => {
      this.producService
        .getProducto(parametros['id'])
        .subscribe((producto: ProductoDescripcion) => {
          console.log('producto', producto);
          this.producto = producto;
          this.id = parametros['id'];
        });
    });
  }
}
