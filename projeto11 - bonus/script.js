// script.js

// Cria um mapa Leaflet e define a visualização inicial
var mymap = L.map('map').setView([-23.550520, -46.633308], 13);

// Declaração de variáveis para os marcadores A e B, e o controle de rota
var markerA, markerB;
var routingControl;

// Adiciona um layer do OpenStreetMap ao mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mymap);

// Adiciona marcadores iniciais A e B ao mapa com popups
// markerA = L.marker([-23.550520, -46.633308]).addTo(mymap);
// markerA.bindPopup("<b>Ponto A</b><br>São Paulo, Brasil.").openPopup();

// markerB = L.marker([-23.559616, -46.658920]).addTo(mymap);
// markerB.bindPopup("<b>Ponto B</b><br>Outro local em São Paulo.").openPopup();

// Função para criar a rota entre os pontos A e B
function createRoute() {
    // Remove a rota existente (se houver)
    if (routingControl) {
        mymap.removeControl(routingControl);
    }

    // Cria um novo controle de rota
    routingControl = L.Routing.control({
        waypoints: [
            L.latLng(markerA.getLatLng()), // Ponto A
            L.latLng(markerB.getLatLng())  // Ponto B
        ],
        routeWhileDragging: true
    }).addTo(mymap);
}

// Adiciona um evento de clique no botão de busca por rota
$('#search-route-button').on('click', function () {
    // Obtém o endereço do ponto A do campo de entrada
    var addressA = $('#address-input-A').val();
    // Obtém o endereço do ponto B do campo de entrada
    var addressB = $('#address-input-B').val();

    // Chama a função para obter as coordenadas a partir dos endereços
    getCoordinatesFromAddress(addressA, 'A');
    getCoordinatesFromAddress(addressB, 'B');
});

// Adiciona um evento de clique no botão de limpar rota
$('#clear-route-button').on('click', function () {
    // Remove a rota existente (se houver)
    if (routingControl) {
        mymap.removeControl(routingControl);
    }
});

// Função para obter coordenadas a partir do endereço usando a API do OpenStreetMap
function getCoordinatesFromAddress(address, point) {
    $.ajax({
        url: `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // Verifica se há resultados válidos
            if (data && data.length > 0) {
                // Obtém as coordenadas do primeiro resultado
                var lat = parseFloat(data[0].lat);
                var lon = parseFloat(data[0].lon);

                // Atualiza a posição do marcador no mapa
                updateMarkerPosition(lat, lon, point);

                // Ajusta a visualização do mapa para a nova localização
                mymap.setView([lat, lon], 13);

                // Cria a rota entre os pontos A e B
                createRoute();
            } else {
                alert(`Endereço do ponto ${point} não encontrado. Por favor, verifique o endereço digitado.`);
            }
        },
        error: function (error) {
            console.error(`Erro ao obter coordenadas do ponto ${point}:`, error);
            alert(`Ocorreu um erro ao obter as coordenadas do ponto ${point}. Por favor, tente novamente.`);
        }
    });
}

// Função para atualizar a posição do marcador no mapa
function updateMarkerPosition(lat, lon, point) {
    // Remove o marcador existente (se houver)
    if (point === 'A') {
        if (markerA) {
            mymap.removeLayer(markerA);
        }
        // Adiciona um novo marcador na nova posição para o ponto A
        markerA = L.marker([lat, lon]).addTo(mymap);
        markerA.bindPopup(`<b>Ponto A</b><br>Latitude: ${lat}<br>Longitude: ${lon}`).openPopup();
    } else if (point === 'B') {
        if (markerB) {
            mymap.removeLayer(markerB);
        }
        // Adiciona um novo marcador na nova posição para o ponto B
        markerB = L.marker([lat, lon]).addTo(mymap);
        markerB.bindPopup(`<b>Ponto B</b><br>Latitude: ${lat}<br>Longitude: ${lon}`).openPopup();
    }
}