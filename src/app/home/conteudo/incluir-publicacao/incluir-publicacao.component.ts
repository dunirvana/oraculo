import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'
import * as firebase from 'firebase'
import {BdService} from '../../../services/bd.service'
import { ProgressoService } from '../../../services/progresso.service';

import {Observable} from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeUntil';
import { Conhecimento } from '../../../model/conhecimento.model';
//import 'rxjs'


@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  @Output() public atualizaTimeLine: EventEmitter<any> = new EventEmitter<any>()

  public email: string
  public arquivo: any
  public progressoPublicacao: string = 'pendente'
  public porcentagemUpload: number

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(),
    'descricao': new FormControl(),
    'tags': new FormControl()
  })

  constructor(
    private bd: BdService,
    private progresso: ProgressoService
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
    })
  }

  public publicar(): void {

    console.log('IncluirPublicacaoComponent Publicar:', this.formulario)
    console.log('arquivo: ',this.arquivo)

    let conhecimento = 
      new Conhecimento(
        this.formulario.value.titulo,
        this.formulario.value.descricao,
        this.arquivo !== undefined ? this.arquivo[0] : null,
        this.formulario.value.tags.indexOf(';') !== -1 ? this.formulario.value.tags.split(";") : this.formulario.value.tags,
        this.email,
        Date.now(),
        this.arquivo !== undefined ? this.arquivo[0].name : null,
      )

    this.bd.publicar(conhecimento)

    let acompanhamentoUpload = Observable.interval(1500)

    let continua = new Subject()
    continua.next(true)

    acompanhamentoUpload
      .takeUntil(continua)
      .subscribe(() => {
        //console.log('acompanhamentoUpload:', this.progresso)

        if (this.progresso.status === 'concluido'){
          this.progressoPublicacao = 'concluido'

          //emitir um evento do componente parent (home)
          this.atualizaTimeLine.emit()
          
          continua.next(false)
        }
        else {               
          this.progressoPublicacao = 'andamento'
          this.porcentagemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes ) * 100)
        }
      })
  }
  
  public prepararArquivoUpload(event: Event): void {

    console.log(event)
    console.log((<HTMLInputElement>event.target).files)
    this.arquivo = (<HTMLInputElement>event.target).files
  }
}
