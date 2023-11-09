# LanguageXML-Webservices
### -> Atividade Manipulando um arquivo XML

## Atividadde 1
- Na atividade 1 o objetivo era utilizar o arquivo biblioteca.xml presente neste repositório na pasta Exercise_XML.
- Com isso a atividade era resolver essas questões:
    - a) Qual a porcentagem de livros da biblioteca que estão emprestados;
    - b) Quantos títulos diferentes do autor "Deitel" a biblioteca possui?
    - c) Qual o nome do livro da biblioteca que possui menos páginas?
    - d) Qual o nome do livro (ou livros) que possui mais de um autor?

## Atividade 2
- Na atividade 2 o objetivo é utilizar a implementação do site feita em outra atividade só que desta vez ao invés de manipular os dados através de um json, seria com um xml.
  -Link do repositório: https://github.com/LeticiaKOSilva/ClimaNet-WebServices
- O site vai basicamente fazer :
  - O site vai extrair da API do site OpenWeatherMap as seguintes informações:
    
    - A temperatura atual, máxima e mínima para a cidade, em graus Celsius;
    - Uma opção para visualizar essas mesmas temperaturas em Kelvin;
    - A descrição textual da condição climática;
    - Uma imagem com a condição do tempo (fornecida pela própria API);
    - O horário do nascimento e do pôr do sol (converter os timestamps);
    - A velocidade do vento.
  
  - O site terá uma UI/UX com:
    -  A temperatura atual deverá ser exibida em destaque, no centro da página, com fonte extra grande;
      -  A cor de fundo da página deverá ser atualizada de acordo com a temperatura: quanto mais quente, mais vermelho, quanto mais frio mais azul. Usar no mínimo 10 variações de cores possíveis;
    -  Deverá ser utilizada pelo menos um fonte tipográfica externa (Google Fonts);
    -  Deverão ser utilizados pelo menos 3 ícones (Font Awesome Icons ou outra biblioteca de fontes CSS).
  
  - Para este projeto foram criados 3 arquivos:
    - climaNet.js;
    - index.html;
    - climaNet.css;
  
  - No arquivo index.html foi feito:
    - Link da fonte do google utilizada que foi o Roboto;
    - Link do google icons para utilizar os 3 ícones escolhidos, que foram para representar: A velocidade do vento, narcer do sol e pôr do sol;
    - Header que contém o nome do site "ClimaNet" e um campo de busca para que o usuário busque uma cidade específica;
    - Divs que ficaram ocultas até que o usuário precione a tecla Enter ou clique no botão procurar e assim a API openWeather
   encontra e o arquivo climaNet.js manipule e os organize os dados dentro das divs.
  
  - No arquivo climaNet.css foi feito:
     - A divisão de pixels para computadores, tablets e celulares;
     - Estilização do cabeçalho;
     - Estilização das divs.
  
  - No arquivo climaNet.js foi feito:
    - Requisição a API OpenWeather;
    - Conversão do json em xml;
    - Manipulação dos dados no arquivo xml;
    - Manipulação e inserção dos dados dentro do site;
    - Método para converter graus Celsius para Kelvin.

## ->Funcionamento

### Página antes da requisição:
<img src="https://github.com/LeticiaKOSilva/LanguageXML-Webservices/blob/main/Imagens/climaNet.png" width = "900px">

### Página depois da requisição:
<img src="https://github.com/LeticiaKOSilva/LanguageXML-Webservices/blob/main/Imagens/climaNetResult.png" width = "900px">
