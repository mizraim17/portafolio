import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { InfoPagina } from '../interfaces/info-pagina.interfaces';

@Injectable({
  providedIn: 'root',
})
export class InfoPaginaService {
  info: InfoPagina = {};
  cargada: boolean = false;

  constructor(private http: HttpClient) {
    // console.log('pagina cargada');

    this.http
      .get('assets/data/data-page.json')
      .subscribe((resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;

        console.log(resp);
      });
  }
}
