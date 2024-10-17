import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { InfoPagina } from '../interfaces/info-pagina.interfaces';

@Injectable({
  providedIn: 'root',
})
export class InfoPaginaService {
  info: InfoPagina = {};
  cargada: boolean = false;

  equipo: any = {};

  constructor(private http: HttpClient) {
    // console.log('pagina cargada');

    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    this.http
      .get('assets/data/data-page.json')
      .subscribe((resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;
      });
  }

  private cargarEquipo() {
    this.http
      .get('https://wepapp-angular-default-rtdb.firebaseio.com/Equipo.json')
      .subscribe((resp: any) => {
        this.equipo = resp;

        console.log('peticion', this.equipo);
      });
  }
}
