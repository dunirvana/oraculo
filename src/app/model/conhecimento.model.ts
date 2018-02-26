export class Conhecimento {
    constructor(
        public titulo: string,
        public descricao: string,
        public arquivo: any,
        public tags: string[],
        public autorEmail: string,
        public data: number,
        public nomeArquivo: string
    ){

    }    
}