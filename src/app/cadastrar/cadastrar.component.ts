import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
})
export class CadastrarComponent implements OnInit {
  usuario: Usuario = new Usuario();
  confirmSenha: string;
  tipoUsuario: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    window.scroll(0, 0);
  }

  confirmarSenha(event: any) {
    this.confirmSenha = event.target.value;
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value;
  }

  cadastrar() {
    this.usuario.tipo = this.tipoUsuario;

    if (this.usuario.senha != this.confirmSenha) {
      alert('Senhas diferentes!');
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;
        this.router.navigate(['/entrar']);
        alert('Usuário cadastrado com sucesso!');
      });
    }
  }
}
