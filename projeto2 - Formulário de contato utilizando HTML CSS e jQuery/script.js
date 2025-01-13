$(document).ready(function() {
    // Intercepta o envio do formulário
    $('#contactForm').submit(function(event) {
        // Impede o envio padrão do formulário
        event.preventDefault();
  
        // Validação simples (pode ser expandida conforme necessário)
        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();
  
        if (name === '' || email === '' || message === '') {
            alert('Por favor, preencha todos os campos do formulário.');
            return;
        }
  
        // Simulação de envio bem-sucedido (pode ser substituído por uma solicitação AJAX real)
        alert('Formulário enviado com sucesso!\nNome: ' + name + '\nE-mail: ' + email + '\nMensagem: ' + message);
  
        // Limpa os campos do formulário após o envio
        $('#name, #email, #message').val('');
    });
  });