import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { BdService } from '../../../services/bd.service';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public email: string
  public publicacoes: any

  constructor(
    private bd: BdService
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email

      this.atualizaTimeLine()
    })
  }

  public atualizaTimeLine(): void {
    this.bd.consultaPublicacoes(this.email)
      .then((publicacoes: any) => {
        this.publicacoes = publicacoes

        console.log(this.publicacoes)
      })
  }

}
