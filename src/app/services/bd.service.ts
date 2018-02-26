import {Injectable} from '@angular/core'
import * as firebase from 'firebase'
import { ProgressoService } from './progresso.service';
import { Conhecimento } from '../model/conhecimento.model';


@Injectable()
export class BdService {

    constructor(
        private progresso: ProgressoService
    ){}

    public publicar(conhecimento: Conhecimento): void {

        console.log('Bd service Publicar:', conhecimento)
        
        firebase.database().ref(`conhecimentos/${btoa(conhecimento.autorEmail)}`)
            .push( conhecimento )
            .then((resposta: any) => {
                
                if (conhecimento.arquivo !== null && conhecimento.arquivo.size > 0){

                    console.log('vai mandar arquivo')

                    let nomeImagem = resposta.key + '_' + conhecimento.nomeArquivo

                    firebase.storage().ref()
                    .child(`arquivos/${nomeImagem}`)
                    .put(conhecimento.arquivo)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                        //ação para o acompanhamento do progresso do upload
                        (snapshot: any) => {                    
                            this.progresso.status = 'andamento'
                            this.progresso.estado = snapshot

                            console.log(this.progresso.status)
                        },
                        (error) => {
                            //no caso de erro
                            this.progresso.status = 'erro'
        
                            console.log(this.progresso.status)
                        },
                        () => {
                            //fim do processo
                            this.progresso.status = 'concluido'
                                    
                            console.log(this.progresso.status)
                        }
                    )
                }
                else{
                    this.progresso.status = 'concluido'

                    console.log('fim', this.progresso.status)
                }
            })
    }

    public consultaPublicacoes(emailUsuario: string): Promise<any> {

        return new Promise((resolve, reject) => {
            //consultar publicações no database
            firebase.database().ref(`conhecimentos/${btoa(emailUsuario)}`)
                .orderByKey()
                .once('value')
                .then((snapshot: any) => {

                    let publicacoes: any[] = []

                    snapshot.forEach((childSnapshot: any) => {

                        let conhecimento = childSnapshot.val()
                        conhecimento.key = childSnapshot.key
                        
                        publicacoes.push(conhecimento)
                    })//snapshot.forEach((childSnapshot: any) => {

                    return publicacoes.reverse()
                })//.then((snapshot: any) => {
                .then((publicacoes: any) => {

                    publicacoes.forEach((conhecimento: any) => {

                    //consultar o nome do usuário responsável pela publicação
                    firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                        .once('value')
                        .then((snapshot: any) => {

                            conhecimento.nome_usuario = snapshot.val().nome_completo

                            if (conhecimento.nomeArquivo !== undefined){

                                //consultar a url da imagem (storage)
                                firebase.storage().ref()
                                    .child(`arquivos/${conhecimento.key + '_' + conhecimento.nomeArquivo}`)
                                    .getDownloadURL()
                                    .then((url: string) => {
    
                                        conhecimento.url_imagem = url
                                    })
                            }

                        })                                
                        

                    })//publicacoes.forEach((conhecimento: any) => {
                    
                    resolve(publicacoes)

                })//.then((publicacoes: any) => {
                
        })//promise
    }
}

