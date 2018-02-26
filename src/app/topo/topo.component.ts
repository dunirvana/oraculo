import { Component, OnInit } from '@angular/core';
import { MensagemService } from '../services/mensagem.service';
import { AutenticacaoService } from '../services/autenticacao.service';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css']
})
export class TopoComponent implements OnInit {

  constructor(
    public mensagemService: MensagemService,
    private autenticacao: AutenticacaoService
    ) 
    { }

  ngOnInit() {
  }

  public sair(): void {
    this.autenticacao.sair()
  }

}
