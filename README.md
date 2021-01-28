# Covid-vaccine-client

Projeto para front-end do sistema para gerenciamento de registros de imunizaçao contra a COVID-19. Link para o sistema: 
- ambiente de homologação: http://imunizacovid19-hom.manaus.am.gov.br.
- ambiente de produção: http://imunizacovid19.manaus.am.gov.br.

## Sobre o Sistema

O sistema nomeado covid-vaccine-client tem como objetivo auxiliar o cadastro de [...]. É disponibilizado um formulário onde [...].

O sistema contempla [...].

## Implementação

Para a implementação foi utilizado o framework Vue.js (https://br.vuejs.org/).
As demais dependências encontram-se no arquivo de configuração package.json.

## Pré-Requisitos para deployment

 1. Crie um arquivo chamado .env, para colocar suas variáveis de ambiente. Há um arquivo de exemplo, nomeado .env.example, o qual você pode se guiar;

 2. A instância dos containers que dão suporte ao serviço requer a criação de uma rede, para que possa se comunicar com containers de outros serviços. 
    
    2.1 Para criar a rede, execute:

        docker network create docker-semsa

     Caso a rede já esteja criada, isso não afetará seus containers.


## Deployment

### Utilização sem o docker

1. Após efetuar o clone deste repositório, no diretório raiz execute:

        yarn install

2. Para iniciar o serviço:

        yarn server

### Utilização com o docker

1. Após efetuar o clone deste repositório, no diretório raiz execute:
        
        docker-compose up -d


## Deploy automatizado