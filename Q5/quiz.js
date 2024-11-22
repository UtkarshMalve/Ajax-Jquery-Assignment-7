$(document).ready(function() {
    const apiUrl = "https://opentdb.com/api.php";
    let currentQuestionIndex = 0;
    let score = 0;
    let questions = [];

    // Function to fetch quiz questions
    function fetchQuestions(category, difficulty) {
        $.ajax({
            url: apiUrl,
            method: "GET",
            data: {
                amount: 5,
                category: category,
                difficulty: difficulty,
                type: "multiple"
            },
            success: function(response) {
                questions = response.results;
                renderQuestion();
            },
            error: function() {
                alert("Error fetching questions. Please try again later.");
            }
        });
    }

    // Function to render the current question
    function renderQuestion() {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            let options = [...question.incorrect_answers, question.correct_answer];
            options = shuffle(options);

            let questionHtml = `
                <div class="question">
                    <h2>${question.question}</h2>
                    <div class="options">
            `;

            options.forEach((option, index) => {
                questionHtml += `
                    <label>
                        <input type="radio" name="question${currentQuestionIndex}" value="${option}">
                        ${option}
                    </label><br>
                `;
            });

            questionHtml += `</div></div>`;

            $('#questions').html(questionHtml);
            currentQuestionIndex++;
            $('#submitQuiz').show();
        } else {
            showResults();
        }
    }

    // Function to shuffle the answer options
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to check the user's answers and display the score
    function checkAnswers() {
        score = 0;
        questions.forEach((question, index) => {
            const selectedAnswer = $(`input[name="question${index}"]:checked`).val();
            if (selectedAnswer === question.correct_answer) {
                score++;
            }
        });
        $('#score').text(score);
        $('#quizContent').hide();
        $('#results').show();
    }

    // Event listeners
    $('#startQuiz').click(function() {
        const category = $('#category').val();
        const difficulty = $('#difficulty').val();
        $('#quizContent').show();
        $('#quizSettings').hide();
        fetchQuestions(category, difficulty);
    });

    $('#submitQuiz').click(function() {
        checkAnswers();
    });
});
