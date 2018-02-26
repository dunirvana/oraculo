import { Injectable } from '@angular/core';
import { Mensagem } from '../model/mensagem.model';

@Injectable()
export class MensagemService {

    public mensagens: Mensagem[] = [];

    constructor() { }

    public adicionar(mensagem: Mensagem): void {
        this.mensagens.push(mensagem);
    }

    public limpar(): void {
         this.mensagens = [];
    }
}