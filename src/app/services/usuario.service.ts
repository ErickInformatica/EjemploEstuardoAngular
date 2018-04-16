import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/Observable';

@Injectable()
export class UsuarioService {

  private ruta = 'http://localhost:3000/users/';

  constructor(private http: Http) { }

  getUsuarios() {
    return this.http.get(this.ruta);
  }

  createUsuario(obj: any) {
    const BODY = obj;
    return this.http.post(this.ruta, BODY);
  }

  updateUsuario(obj: any) {
    const BODY = obj;
    return this.http.put(this.ruta, BODY);
  }

  deleteUsuario(idUsuario: number) {
    return this.http.delete(this.ruta + idUsuario);
  }
}
