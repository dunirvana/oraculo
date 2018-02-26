import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {AutenticacaoService} from './services/autenticacao.service'
import {AutenticacaoGuardService} from './services/autenticacao-guard.service'
import {MensagemService} from './services/mensagem.service'
import { ProgressoService } from './services/progresso.service';
import { BdService } from './services/bd.service';

import { ROUTES} from './app.routes';

import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { AcessoComponent } from './acesso/acesso.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroUsuarioComponent } from './acesso/cadastro-usuario/cadastro-usuario.component';
import { HomeComponent } from './home/home.component';
import { PesquisaComponent } from './home/pesquisa/pesquisa.component';
import { ConteudoComponent } from './home/conteudo/conteudo.component';
import { IncluirPublicacaoComponent } from './home/conteudo/incluir-publicacao/incluir-publicacao.component';
import { PublicacoesComponent } from './home/conteudo/publicacoes/publicacoes.component';
import { RodapeComponent } from './rodape/rodape.component';




@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    AcessoComponent,
    LoginComponent,
    CadastroUsuarioComponent,
    HomeComponent,
    PesquisaComponent,
    ConteudoComponent,
    IncluirPublicacaoComponent,
    PublicacoesComponent,
    RodapeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    AutenticacaoService, 
    AutenticacaoGuardService,
    MensagemService,
    ProgressoService,
    BdService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
