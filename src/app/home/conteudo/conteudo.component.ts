import { Component, OnInit, ViewChild } from '@angular/core';
import { AutenticacaoService } from '../../services/autenticacao.service';

@Component({
  selector: 'app-conteudo',
  templateUrl: './conteudo.component.html',
  styleUrls: ['./conteudo.component.css']
})
export class ConteudoComponent implements OnInit {

  @ViewChild('publicacoes') public publicacoes: any

  constructor(
    private autenticacao: AutenticacaoService
  ) { }

  ngOnInit() {
  }

  public atualizaTimeLine(): void {
    this.publicacoes.atualizaTimeLine()
  }
}
