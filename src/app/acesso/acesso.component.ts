import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations:[
    trigger('animacao-painel', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({
          opacity: 0,
          transform: 'translate(50px, 0)'
        }),
        animate('1500ms 0s ease-in-out', keyframes([
          style({ offset: 0.20, opacity: 1, transform: 'translateX(0)' }),
          style({ offset: 0.40, opacity: 1, transform: 'translateX(0)' }),
          style({ offset: 0.60, opacity: 1, transform: 'translateX(0)' }),
          style({ offset: 0.80, opacity: 1, transform: 'translateX(0)' }),
          style({ offset: 1, opacity: 1, transform: 'translateX(0)' })
        ])) //duração, delay e aceleração
      ])
    ])    
  ]
})
export class AcessoComponent implements OnInit {

  public estadoBanner: string = 'criado'
  public estadoPainel: string = 'criado'

  public cadastro: boolean = false

  constructor() { }

  ngOnInit() {
  }

  public exibirPainel(event: string): void {
    this.cadastro = event === 'cadastro' ? true : false
  }

  public inicioDaAnimacao() : void {

  }

  public fimDaAnimacao() : void {

  }
  
}
