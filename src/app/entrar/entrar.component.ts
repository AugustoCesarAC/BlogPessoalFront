import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css'],
})
export class EntrarComponent implements OnInit {
  
  usuarioLogin: UsuarioLogin = new UsuarioLogin();

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token != '') {
      environment.token = '';
    }

  }


  entrar() {
    this.auth.entrar(this.usuarioLogin).subscribe(
      (resp: UsuarioLogin) => {
        this.usuarioLogin = resp;

        environment.token = this.usuarioLogin.token;
        environment.nome = this.usuarioLogin.nome;
        environment.foto = this.usuarioLogin.foto;
        environment.id = this.usuarioLogin.id;

        console.log(environment.token)

        this.router.navigate(['/inicio']);
      },
      (erro) => {
        if (erro.status == 401) {
          alert('Usuário ou senha estão incorretos!');
        }
      }
    );
  }
}
