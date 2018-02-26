import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'
import {AutenticacaoService} from '../../services/autenticacao.service'
import { MensagemService } from '../../services/mensagem.service';
import { Mensagem } from '../../model/mensagem.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()
  
  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(),
    'senha': new FormControl()
  })

  constructor(
    private autenticacaoService: AutenticacaoService,
    private mensagemService: MensagemService
  ) { }

  ngOnInit() {
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro')
  }

  public autenticar(): void {

    this.autenticacaoService.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha)
      .then(() => this.mensagemService.limpar())
      .catch((error: Error) => {

        this.mensagemService.adicionar(new Mensagem(null, error.message, null));
    })    
  }
}
