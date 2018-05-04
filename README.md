# Oraculo

Aplicativo para administração de conhecimento!

## Estruturas de dados

```
{
  "conhecimentos" : {
    "id-do-usuario" : {
      "id-do-conhecimento" : {
        "autorEmail" : texto,
        "data" : número,
        "descricao" : texto,
        "nomeArquivo" : texto,
        "tags" : [ texto ],
        "titulo" : texto
      },
    }
  },
  
  "usuario_detalhe" : {
    "id-do-usuario" : {
      "email" : texto,
      "nome_completo" : texto,
      "nome_usuario" : texto
    },
  }
}
```

## Estruturas de arquivos

**arquivos/** id-do-conhecimento + nome-original-do-arquivo
