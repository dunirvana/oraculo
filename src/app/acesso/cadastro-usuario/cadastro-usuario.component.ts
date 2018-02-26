import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms'
import { Usuario } from '../../model/usuario.model'
import { AutenticacaoService } from '../../services/autenticacao.service'
import { MensagemService } from '../../services/mensagem.service';
import { Mensagem } from '../../model/mensagem.model';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()
  
  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'nome_completo': new FormControl(null),
    'nome_usuario': new FormControl(null),
    'senha': new FormControl(null)
  })

  constructor(
    private autenticacaoService: AutenticacaoService,
    private mensagemService: MensagemService
  ) { }

  ngOnInit() {

  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login')
  }

  public cadastrarUsuario(): void {

    this.mensagemService.limpar();

    let usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha
    );

    this.autenticacaoService.cadastrarUsuario(usuario)
      .then(() => this.exibirPainelLogin())
      .catch((error: Error) => {

        this.mensagemService.adicionar(new Mensagem(null, error.message, null));
    })  
  }

}

