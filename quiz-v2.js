$(document).ready(function () {
    var scores = { scoreA: 0, scoreB: 0, scoreC: 0, scoreD: 0 };

    // Variable to store selected answers for each question
    var selectedAnswers = [];

    // Variable to track current question
    var currentQuestion = 0;

    var questions = [
        { 
            question: "Are you comfortable with being the centre of attention of parties?", 
            thumb: "img/q1-thumb.png", 
            options: [
                { answer: "I live for it – what I always aim to be", scores: { scoreA: 1, scoreB: 1, scoreC: 0, scoreD: 0 } },
                { answer: "In the right circumstances, I can be an absolute hoot", scores: { scoreA: 0, scoreB: 0, scoreC: 1, scoreD: 0 } },
                { answer: "Prefer to take a back seat and let someone else entertain", scores: { scoreA: 0, scoreB: 0, scoreC: 0, scoreD: 1 } }
            ]
        },
        { 
            question: "If you’re a movie buff, what kind do you like?", 
            thumb: "img/q2-thumb.png", 
            options: [
                { answer: "Got to be comedy or anything that puts a smile on my face", scores: { scoreA: 1, scoreB: 0, scoreC: 0, scoreD: 0 } },
                { answer: "Like action or adventure, can’t beat the classics", scores: { scoreA: 0, scoreB: 1, scoreC: 0, scoreD: 0 } },
                { answer: "Don’t have much time for movies", scores: { scoreA: 0, scoreB: 0, scoreC: 1, scoreD: 1 } }
            ]
        },
        { 
            question: "When it comes to fancy dress, do you prefer something that’s comfortable or elaborate?", 
            thumb: "img/q3-thumb.png", 
            options: [
                { answer: "Comfort is, and always will be, my number one priority", scores: { scoreA: 0, scoreB: 0, scoreC: 1, scoreD: 0 } },
                { answer: "I think you’ve got to dress to impress, even if it’s a bit complex", scores: { scoreA: 1, scoreB: 1, scoreC: 0, scoreD: 0 } }
            ]
        },
        { 
            question: "What kind of reaction would you like to get from your costume?", 
            thumb: "img/q4-thumb.png", 
            options: [
                { answer: "I want to be the source of belly laughs", scores: { scoreA: 1, scoreB: 0, scoreC: 0, scoreD: 0 } },
                { answer: "Would like people to instantly know who I’m supposed to be", scores: { scoreA: 0, scoreB: 1, scoreC: 0, scoreD: 0 } },
                { answer: "Simple but fun is fine by me", scores: { scoreA: 0, scoreB: 0, scoreC: 1, scoreD: 0 } },
                { answer: "Surprise and delight combining my look with someone else", scores: { scoreA: 0, scoreB: 0, scoreC: 0, scoreD: 1 } }
            ]
        },
        { 
            question: "Are you attending the darts with anyone or going solo?", 
            thumb: "img/q5-thumb.png", 
            options: [
                { answer: "Solo", scores: { scoreA: 10, scoreB: 10, scoreC: 10, scoreD: 10 } },
                { answer: "Pair", scores: { scoreA: 100, scoreB: 100, scoreC: 100, scoreD: 100 } },
                { answer: "Group", scores: { scoreA: 1000, scoreB: 1000, scoreC: 1000, scoreD: 1000 } }
            ]
        }
    ];

    // outcomes
    // Wacky Wonders
    // Movie Magic
    // Simple & Silly
    // Clever Combinatioons



    // generate questions
	function generateQuestions() {
		for (var i = 0; i < questions.length; i++) {
			var questionObj = questions[i];
			var optionsHTML = '<div id="answers-' + i + '" class="answers-box">';
			optionsHTML += '<div class="progress-bar-holder"><div class="progress-bar" style="width: ' + ((i + 1) * (100 / questions.length)) + '%"></div></div>';
			optionsHTML += '<p>Question ' + (i+1) + '/' + questions.length + '</p>';
			optionsHTML += '<div class="answer-header"><div class="ans-img"><img src="' + questionObj.thumb + '" /></div>';
			optionsHTML += '<h2>' + questionObj.question + '</h2>';
			optionsHTML += '</div>';
			for (var j = 0; j < questionObj.options.length; j++) {
				optionsHTML += '<div class="answer-button"><label><input type="checkbox" name="answer" value="' + j + '"> ' + questionObj.options[j].answer + '</label></div>';
			}
			if (i > 0) {
				optionsHTML += '<button id="back-question-' + i + '" type="button" class="back-question">Back</button>';
			}
			if (i < questions.length - 1) {
				optionsHTML += '<button id="next-question-' + i + '" type="button" class="next-question">Next</button>';
			} else {
				optionsHTML += '<button id="submit-quiz" type="button" class="submit-question">Submit Quiz</button>';
			}
			optionsHTML += '</div>';
			$("#quiz-form").append(optionsHTML);
		}
	
		//  click events
		$("#quiz-form").on("click", ".next-question", function(e) {
			currentQuestion++;
			console.log(currentQuestion);
			var currentIndex = parseInt($(this).attr('id').split('-')[2]);
			$("#answers-" + currentIndex).hide();
			$("#answers-" + (currentIndex + 1)).show();
		});
	
		$("#quiz-form").on("click", ".back-question", function(e) {
			currentQuestion--;
			console.log(currentQuestion);
			var currentIndex = parseInt($(this).attr('id').split('-')[2]);
			$("#answers-" + currentIndex).hide();
			$("#answers-" + (currentIndex - 1)).show();
		});
	
		$("#quiz-form").on("click", "#submit-quiz", function(e) {
            updateScores();
            $(".answers-box").hide();
            $("#result-container").show();
		});
	}
	

    // generate all questions
    generateQuestions();

    // initial visibility
	$(".answers-box").hide();
	$("#answers-0").show();

    // Function to update scores after all questions are answered
    function updateScores() {
        // Reset scores
        var scores = { scoreA: 0, scoreB: 0, scoreC: 0, scoreD: 0 };
        
        // Iterate through each question
        $(".answers-box").each(function(index) {
            var selected = $(this).find("input:checked").map(function() {
                return $(this).val();
            }).get();
            
            // Retrieve the corresponding question object
            var question = questions[index];
    
            // Iterate through each selected answer for the current question
            selected.forEach(function(selectedIndex) {
                var option = question.options[selectedIndex]; // Retrieve the selected option
                scores.scoreA += option.scores.scoreA;
                scores.scoreB += option.scores.scoreB;
                scores.scoreC += option.scores.scoreC;
                scores.scoreD += option.scores.scoreD;
            });
        });
    
        // Determine the highest score
        var highestScore = 'scoreA';
        var highestValue = scores.scoreA;
    
        if (scores.scoreB > highestValue) {
            highestScore = 'scoreB';
            highestValue = scores.scoreB;
        }
    
        if (scores.scoreC > highestValue) {
            highestScore = 'scoreC';
            highestValue = scores.scoreC;
        }
    
        if (scores.scoreD > highestValue) {
            highestScore = 'scoreD';
            highestValue = scores.scoreD;
        }
    
        // Array to hold tied high scores
        var tiedScores = [];
    
        // Check for tied high scores
        for (var score in scores) {
            if (scores[score] === highestValue) {
                tiedScores.push(score);
            }
        }
    
        // Randomly select one of the tied high scores
        var finalOutcome = tiedScores[Math.floor(Math.random() * tiedScores.length)];
    
        // Display scores
        $("#resultA").text("ScoreA: " + scores.scoreA);
        $("#resultB").text("ScoreB: " + scores.scoreB);
        $("#resultC").text("ScoreC: " + scores.scoreC);
        $("#resultD").text("ScoreD: " + scores.scoreD);
    
        // Display the final outcome
        switch (finalOutcome) {
            case 'scoreA':
                $('#resultA').addClass('winner');
                break;
            case 'scoreB':
                $('#resultB').addClass('winner');
                break;
            case 'scoreC':
                $('#resultC').addClass('winner');
                break;
            case 'scoreD':
                $('#resultD').addClass('winner');
                break;
            default:
                break;
        }
    
        // Show the result container
        $("#quiz-container").hide();
        $("#result-container").show();
    }
    
    

});