import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme: Boolean = false;

  constructor(private auth:AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login( form: NgForm){
    if( form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });

    Swal.showLoading();

    this.auth.login(this.usuario).subscribe(resp => {
      console.log(resp);
      Swal.close();
      if(this.recordarme){
        localStorage.setItem('email', this.usuario.email);
      } else{
        localStorage.removeItem('email');
      }
      this.router.navigateByUrl('/home');
    }, (err) =>{
      console.log(err.error.error.message);
      Swal.fire({
        title: 'Error al autenticar',
        icon: 'error',
        text: err.error.error.message
      });
    })
  }

}
