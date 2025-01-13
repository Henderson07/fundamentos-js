$(document).ready(function() {
    const questions = [
        {
            question: 'Qual é a capital da França?',
            options: ['Londres', 'Paris', 'Berlim', 'Madrid'],
            correctAnswer: 'Paris'
        },
        {
            question: 'Quanto é 2 + 2?',
            options: ['3', '4', '5', '6'],
            correctAnswer: '4'
        },
        {
            question: 'Quem escreveu "Romeu e Julieta"?',
            options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'F. Scott Fitzgerald'],
            correctAnswer: 'William Shakespeare'
        }
    ];

    const quizContainer = $('#question-container');
    const resultContainer = $('#result-container');
    const submitButton = $('#submit-btn');

    // Inicializar o Quiz
    function initQuiz() {
        for (let i = 0; i < questions.length; i++) {
            const questionHTML = `
                <div class="question" id="question${i}">
                    <p>${questions[i].question}</p>
                    ${generateOptions(questions[i].options, i)}
                </div>
            `;
            quizContainer.append(questionHTML);
        }
    }

    // Gerar opções de resposta
    function generateOptions(options, questionIndex) {
        let optionsHTML = '';
        for (let i = 0; i < options.length; i++) {
            optionsHTML += `
                <label>
                    <input type="radio" name="q${questionIndex}" value="${options[i]}"> ${options[i]}
                </label>
            `;
        }
        return optionsHTML;
    }

    // Verificar respostas ao clicar em "Enviar Respostas"
    submitButton.click(function() {
        let score = 0;

        for (let i = 0; i < questions.length; i++) {
            const selectedOption = $(`input[name=q${i}]:checked`).val();

            if (selectedOption === questions[i].correctAnswer) {
                score++;
                $(`#question${i}`).css('color', 'green');
            } else {
                $(`#question${i}`).css('color', 'red');
            }
        }

        const resultText = `Você acertou ${score} de ${questions.length} perguntas!`;
        resultContainer.text(resultText);
    });

    // Inicializar o Quiz ao carregar a página
    initQuiz();
});