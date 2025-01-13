document.addEventListener('DOMContentLoaded', function() {
    // Definindo variáveis
    let timerInterval; // Variável para armazenar o intervalo do cronômetro
    let seconds = 0; // Contador de segundos
    let isRunning = false; // Indicador se o cronômetro está em execução

    // Obtendo elementos do DOM
    const timerElement = document.getElementById('timer'); // Elemento de exibição do cronômetro
    const startStopBtn = document.getElementById('startStopBtn'); // Botão de iniciar/pausar
    const resetBtn = document.getElementById('resetBtn'); // Botão de resetar

    // Função para atualizar a exibição do cronômetro
    function updateTimer() {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        // Atualiza o texto do elemento de exibição com o tempo formatado
        timerElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    // Função para iniciar o cronômetro
    function startTimer() {
        // Configura um intervalo para incrementar os segundos a cada segundo
        timerInterval = setInterval(function() {
            seconds++;
            updateTimer();
        }, 1000);

        // Atualiza o estado e o texto do botão
        isRunning = true;
        startStopBtn.textContent = 'Pausar';
    }

    // Função para pausar o cronômetro
    function pauseTimer() {
        // Limpa o intervalo para interromper a contagem
        clearInterval(timerInterval);
        
        // Atualiza o estado e o texto do botão
        isRunning = false;
        startStopBtn.textContent = 'Continuar';
    }

    // Função para resetar o cronômetro
    function resetTimer() {
        // Limpa o intervalo e reinicia os segundos
        clearInterval(timerInterval);
        seconds = 0;

        // Atualiza o estado, o texto do botão e a exibição do cronômetro
        isRunning = false;
        updateTimer();
        startStopBtn.textContent = 'Iniciar';
    }

    // Adiciona um ouvinte de evento para o clique no botão de iniciar/pausar
    startStopBtn.addEventListener('click', function() {
        // Verifica se o cronômetro está em execução e age de acordo
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    });

    // Adiciona um ouvinte de evento para o clique no botão de resetar
    resetBtn.addEventListener('click', function() {
        // Chama a função para resetar o cronômetro
        resetTimer();
    });

    // Inicializa o cronômetro ao carregar completamente o DOM
    updateTimer();
});