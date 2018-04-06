# Sorservice

O serviço de sort tem como parametros de entrada um array de objetos contendo dados de livros e um array de objetos contendo os parametros de ordenação.
  
# Instalação

  - Importe o arquivo sortingService.js em um servidor nodejs
  --ao importar, chamar a função sortingService() do objeto importado passando como parametros: um array de objetos contendo os dados de livros, um array de objetos com as configurações de ordenaçaõ.


Para facilitar, já existe no repositório um arquivo chamado server.js que realiza a importação dos arquivos e funconalidades. Para rodar e ver o resultado da função, basta executar na linha de comando:
  - node server.js

### Arquivos de Livros
O arquivo de livros deve conter um array de objetos com a seguinte estrutura:
--title : tipo string
--author : tipo string
--edition : tipo inteiro

### Arquivos de Configuração
O arquivo de configuração deve conter um array de objetos com a seguinte estrutura:
--attribute : tipo string (valores possiveis: title/author/edition)
--order : tipo string (valores possiveis: Descending/Ascending)
