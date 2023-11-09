var req = new XMLHttpRequest(); // Variável usada para a requisição a API
const KEY = 'f550da5380fbb0fdeb540ba91608c28d'; // Chave para acessar a API

// Variáveis onde se coleta as divs do html que serão manipuladas aqui
var buttonn = document.querySelector("#buttonn");
var weatherInfoContainer = document.getElementById('weather-info-container');
var cityName = document.getElementById('city-name');
var temp = document.getElementById('temp');
var tempMax = document.getElementById('temp-max');
var tempMin = document.getElementById('temp-min');
var kelvinButton = document.getElementById('kelvin-button');
var celsiusButton = document.getElementById('celsius-button');
var description = document.getElementById('description');
var weatherIcon = document.getElementById('weather-icon');
var sunrise = document.getElementById('sunrise');
var sunset = document.getElementById('sunset');
var windSpeed = document.getElementById('wind-speed');
var temperatureInKelvin = false;

// Função que detecta quando se pressiona a tecla Enter no campo de busca
document.getElementById("name").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        searchWeather();
    }
});

// Função que só será acionada se o usuário clicar no botão procurar 
buttonn.onclick = function () {
    searchWeather();
}

// Função para converter JSON em XML
const convertToXml = (obj, xml = '') => {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object') {
        xml += `<${key}>${convertToXml(value)}</${key}>`;
      } else {
        xml += `<${key}>${value}</${key}>`;
      }
    }
    return xml;
  };

/*
    Função responsável por realizar a busca dos dados da cidade na API
    e faz todas as alterações necessárias nas divs do html
    */
function searchWeather() {
    var cidade = document.getElementById("name").value;

    req.onload = function () {
        if (req.status === 200) {
            let resp = req.responseText;
            console.log(resp);
            let city_json = JSON.parse(resp);

            let xmlData = convertToXml(city_json);
            console.log(xmlData);

            // Mostrar a div com informações
            weatherInfoContainer.style.display = 'block';

            // Preencher os elementos com os dados da cidade a partir do XML
            cityName.textContent = cidade;
            var tempValue = `${/\<temp\>(.*?)\<\/temp\>/.exec(xmlData)[1]}`

            // Chama a função que define a cor de fundo com base na temperatura
            setBackgroundColorBasedOnTemperature(parseInt(tempValue));

            temp.textContent = `${tempValue}°C`;
            tempMax.textContent = `Máxima: ${/\<temp_max\>(.*?)\<\/temp_max\>/.exec(xmlData)[1]}°C`;
            tempMin.textContent = `Mínima: ${/\<temp_min\>(.*?)\<\/temp_min\>/.exec(xmlData)[1]}°C`;
            description.textContent = `Condição Climática: ${/\<description\>(.*?)\<\/description\>/.exec(xmlData)[1]}`;
            weatherIcon.src = `https://openweathermap.org/img/wn/${/\<icon\>(.*?)\<\/icon\>/.exec(xmlData)[1]}.png`;
            sunrise.textContent = timestampToHours(/\<sunrise\>(.*?)\<\/sunrise\>/.exec(xmlData)[1]) + " h";
            sunset.textContent = timestampToHours(/\<sunset\>(.*?)\<\/sunset\>/.exec(xmlData)[1]) + " h";
            windSpeed.textContent = `${/\<timezone\>(.*?)\<\/timezone\>/.exec(xmlData)[1]}  m/s`;

            // Botões para a alteração entre Celsius e Kelvin
            celsiusButton.addEventListener('click', function () {
                temperatureInKelvin = false;
                temp.textContent = `${tempValue}°C`;
                tempMax.textContent = `Máxima: ${/\<temp_max\>(.*?)\<\/temp_max\>/.exec(xmlData)[1]}°C`;
                tempMin.textContent = `Mínima: ${/\<temp_min\>(.*?)\<\/temp_min\>/.exec(xmlData)[1]}°C`;

                // Defina a cor do botão celsiusButton
                celsiusButton.style.backgroundColor = '#ff6200';
                // Reset a cor para o botão kelvinButton
                kelvinButton.style.backgroundColor='';
                kelvinButton.style.color = '';
            });
            kelvinButton.addEventListener('click', function () {
                temperatureInKelvin = true;
                temp.textContent = `${convertToKelvin(parseInt(tempValue))}K`;
                tempMax.textContent = `Máxima: ${convertToKelvin(parseFloat(/\<temp_max\>(.*?)\<\/temp_max\>/.exec(xmlData)[1]))}K`;
                tempMin.textContent = `Mínima: ${convertToKelvin(parseFloat(/\<temp_min\>(.*?)\<\/temp_min\>/.exec(xmlData)[1]))}K`;
               
                // Defina a cor do botão kelvinButton
                kelvinButton.style.backgroundColor = '#ff6200';
                // Reset a cor para o botão celsiusButton
                celsiusButton.style.backgroundColor = '';
                celsiusButton.style.color = '';
            });
            console.log("\n\nChegou aqui");
        } else {
            // Ocultar a div com informações se a cidade não for encontrada
            document.body.style.backgroundColor = "#ccc";
            weatherInfoContainer.style.display = 'none';
            alert("A cidade fornecida não existe!");

        }
    };

    req.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + cidade + '&lang=pt_br&units=metric&appid=' + KEY);
    req.send();
}

function timestampToHours(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Função responsável por converter temperatura de Celsius para Kelvin
function convertToKelvin(celsius) {
    return (celsius + 273.15).toFixed(2);
}

/*
    Função responsável por calcular a cor que deve ser exibida através do valor da temperatura da 
    cidade fornecida pelo usuário
*/
function setBackgroundColorBasedOnTemperature(temperature) {
    const minTemperature = -50; // Temperatura mínima (azul)
    const maxTemperature = 50; // Temperatura máxima (vermelho)
    const minHue = 240; // Cor do azul (em graus)
    const maxHue = 0; // Cor do vermelho (em graus)

    const temperatureRange = maxTemperature - minTemperature;
    const hueRange = maxHue - minHue;
    const normalizedTemperature = (temperature - minTemperature) / temperatureRange;
    const hue = minHue + normalizedTemperature * hueRange;

    const backgroundColor = `hsl(${hue}, 100%, 50%)`;
    document.body.style.backgroundColor = backgroundColor;
}
