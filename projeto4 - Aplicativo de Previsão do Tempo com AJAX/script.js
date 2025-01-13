$(document).ready(function () {
    $('#getWeatherBtn').on('click', function () {
      var city = $('#cityInput').val();
      if (city.trim() !== '') {
        getWeather(city);
      }
    });
  
    function getWeather(city) {
      var apiKey = '6880cfc5f3db94c5cd88de15eeb8a314';
      var apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  
      $.ajax({
        url: apiUrl,
        type: 'GET',
        data: {
          q: city,
          appid: apiKey,
          units: 'metric', // Use 'imperial' for Fahrenheit
        },
        success: function (data) {
          displayWeather(data);
        },
        error: function (error) {
          showError();
        }
      });
    }
  
    function displayWeather(data) {
      var weatherInfo = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperatura: ${data.main.temp} °C</p>
        <p>Condição: ${data.weather[0].description}</p>
        <p>Umidade: ${data.main.humidity} %</p>
      `;
      $('#weatherInfo').html(weatherInfo);
    }
  
    function showError() {
      $('#weatherInfo').html('<p>Erro ao obter a previsão do tempo. Por favor, tente novamente.</p>');
    }
  });