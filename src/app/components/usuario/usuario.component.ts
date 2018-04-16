import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  closeResult: string;
  lista = [];
  listaFija = [];
  idUsuario: number;
  username: string;
  email: string;
  password: string;
  msgError = false;

  constructor(private usuarioService: UsuarioService,private modalService: NgbModal) { }

  ngOnInit() {
    this.getUsuarios();
  }
  
  buscarUsuario(text: any) {
    this.lista = this.listaFija;
    const list: any = [];
    if (text !== '') {
      for (const elemento of this.lista){
        if (elemento.username.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
           elemento.email.toLowerCase().indexOf(text.toLowerCase()) > -1 ) {
          list.push(elemento);
          this.lista = list;
          this.msgError = false;
        }else {
          if (list.length === 0) {
            this.lista = [];
            this.msgError = true;
          }
        }
      }
    }else {
      this.getUsuarios();
      this.msgError = false;
    }
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(res => {
      this.lista = res.json();
      this.listaFija = res.json();
    });
  }

  createUsuario( username: string,email: string, password: string) {
    const usuario = {
      username: username,
      email: email,
      password: password
    };

    this.usuarioService.createUsuario(usuario).subscribe(
      (datos) => {
        this.getUsuarios();
      }
    );

  }

  updateUsuario() {
    const usuario = {
      idUsuario: this.idUsuario,
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.usuarioService.updateUsuario(usuario).subscribe(
      (datos) => {
        this.getUsuarios();
      }
    );
  }

  deleteUsuario() {
    this.usuarioService.deleteUsuario(this.idUsuario).subscribe(
      (data) => {
        this.getUsuarios();
      }
    );
  }

  setData(item: any) {
    this.idUsuario = item.idUsuario;
    this.username = item.username;
    this.email = item.email;
    this.password = item.password;
  }

  deleteData(item: any) {
    this.username = '';
    this.email = '';
    this.password = '';
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
