function consultarCEP() {
    const cepInput = $('#cepInput');
    const resultDiv = $('#result');
    const cep = cepInput.val().replace(/\D/g, '');

    resultDiv.removeClass('visible');

    if (cep.length !== 8) {
        alert('Digite um CEP válido');
        return;
    }

    $.get(`https://viacep.com.br/ws/${cep}/json/`, function(data) {
        exibirResultado(data);
        console.log(data);
    });
}

function exibirResultado(resultado) {
    const resultDiv = $('#result');
    resultDiv.html(`
        <p><strong>Logradouro:</strong> ${resultado.logradouro}</p>
        <p><strong>Bairro:</strong> ${resultado.bairro}</p>
        <p><strong>Cidade:</strong> ${resultado.localidade}</p>
        <p><strong>IBGE:</strong> ${resultado.ibge}</p>
        <p><strong>UF:</strong> ${resultado.uf}</p>
    `);
    resultDiv.addClass('visible');
}