import {Injectable} from '@angular/core'
import {Router} from '@angular/router'
import { Usuario } from '../model/usuario.model'
import * as firebase from 'firebase'
import { Route } from '@angular/compiler/src/core';

@Injectable()
export class AutenticacaoService {

    public token_id: string

    constructor(
        private router: Router
    ){}

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
     console.log('Service, CadastrarUsuario:', usuario)   

     return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
        .then((resposta: any) => {
            
            //remover a senha do atributo
            delete usuario.senha

            //registrando dados complementares
            firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                .set(usuario)
        })
    }

    public autenticar(email: string, senha: string): Promise<any> {

        //console.log('email: ' + email + ' senha: ' + senha)
        
        return firebase.auth().signInWithEmailAndPassword(email, senha)
        .then((resposta: any) => {
            //console.log(resposta)

            firebase.auth().currentUser.getIdToken()
                .then((idToken: string) => {
                    this.token_id = idToken

                    localStorage.setItem('idToken', idToken)

                    this.router.navigate(['/home'])
                })
        })
    }

    public autenticado(): boolean {

        if (this.token_id === undefined && localStorage.getItem('idToken') != null){
            this.token_id = localStorage.getItem('idToken')
        }

        if (this.token_id === undefined){
            this.router.navigate(['/'])
        }

        return this.token_id !== undefined
    }

    public sair(): void {

        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('idToken')
                this.token_id = undefined   
                
                this.router.navigate(['/'])
            })        
    }
}