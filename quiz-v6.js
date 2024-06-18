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
            question: "Who would you like to attend the darts with?", 
            thumb: "img/q5-thumb.png", 
            options: [
                { answer: "I'll go by myself", scores: { scoreA: 10, scoreB: 10, scoreC: 10, scoreD: 10 } },
                { answer: "One other person", scores: { scoreA: 100, scoreB: 100, scoreC: 100, scoreD: 100 } },
                { answer: "In a group", scores: { scoreA: 1000, scoreB: 1000, scoreC: 1000, scoreD: 1000 } }
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
                optionsHTML += '<div class="answer-button"><label><input type="radio" name="answer-' + i + '" value="' + j + '"> ' + questionObj.options[j].answer + '</label></div>';
            }
            if (i > 0) {
                optionsHTML += '<button id="back-question-' + i + '" type="button" class="back-question white">Back</button>';
            }
            if (i < questions.length - 1) {
                optionsHTML += '<button id="next-question-' + i + '" type="button" class="next-question">Next</button>';
            } else {
                optionsHTML += '<button id="next-question-' + i + '" type="button" class="submit-question" data-umami-event="Submit Quiz button">Submit Quiz</button>';
            }
            optionsHTML += '</div>';
            $("#quiz-form").append(optionsHTML);
        }
        
        // click events
        
        $("#startscreen").on("click", "#startquiz", function(e) {
            $("#startscreen").hide();
            $("#quiz-container").show();
        });

        $("#quiz-form").on("click", ".next-question", function(e) {
            var currentIndex = parseInt($(this).attr('id').split('-')[2]);
            // Check if any radio button is checked
            var isChecked = $("#answers-" + currentIndex + " input[type='radio']:checked").length > 0;
            if (!isChecked) {
                $("#answers-" + currentIndex + " input[type='radio']:not(:checked)").parent().addClass('flash-label');
                setTimeout(function() {
                    $("#answers-" + currentIndex + " input[type='radio']:not(:checked)").parent().removeClass('flash-label');
                }, 500); 
                return; 
            }
            currentQuestion++;
            $("#answers-" + currentIndex).hide();
            $("#answers-" + (currentIndex + 1)).show();
        });
        
        $("#quiz-form").on("click", ".back-question", function(e) {
            var currentIndex = parseInt($(this).attr('id').split('-')[2]);
            currentQuestion--;
            $("#answers-" + currentIndex).hide();
            $("#answers-" + (currentIndex - 1)).show();
        });
        
        $("#quiz-form").on("click", ".submit-question", function(e) {
            var currentIndex = parseInt($(this).attr('id').split('-')[2]);
            // Check if any radio button is checked
            var isChecked = $("#answers-" + currentIndex + " input[type='radio']:checked").length > 0;
            if (!isChecked) {
                $("#answers-" + currentIndex + " input[type='radio']:not(:checked)").parent().addClass('flash-label');
                setTimeout(function() {
                    $("#answers-" + currentIndex + " input[type='radio']:not(:checked)").parent().removeClass('flash-label');
                }, 500); 
                return; 
            }
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

        // build html
        var finalHTML = "<div>";
        finalHTML += "<p>You should dress as ... </p>";
        
        if (highestValue < 100) {     // solo 
            switch (finalOutcome) {
                case 'scoreA':
                    var finalImageURL = "img/outcome-dartboard.png";
                    finalHTML += "<h2>A Dartboard</h2>";
                    finalHTML += "<div id='results-image-holder-mobile'><img src='" + finalImageURL + "'></div>";
                    finalHTML += "<h6>Everyone will really think you’ve hit the bullseye with this one!</h6>";
                    $('#resultA').addClass('winner');
                    break;
                case 'scoreB':
                    var alternatives = [
                        { 
                            title: "Ali G",
                            description: "Just be prepared to do the voice all night.",
                            imageURL: "img/outcome-alig.png"
                        },
                        { 
                            title: "Alan from The Hangover",
                            description: "Who needs a wolf pack?",
                            imageURL: "img/outcome-alan.png"
                        }
                    ];
                    var randomIndex = Math.floor(Math.random() * alternatives.length);
                    var selectedAlternative = alternatives[randomIndex];
                    
                    var finalImageURL = selectedAlternative.imageURL;
                    finalHTML += "<h2>" + selectedAlternative.title + "</h2>";
                    finalHTML += "<div id='results-image-holder-mobile'><img src='" + finalImageURL + "'></div>";
                    finalHTML += "<h6>" + selectedAlternative.description + "</h6>";
                    $('#resultB').addClass('winner');
                    break;
                case 'scoreC':
                    var finalImageURL = "img/outcome-adultbaby.png";
                    finalHTML += "<h2>An adult baby</h2>";
                    finalHTML += "<div id='results-image-holder-mobile'><img src='" + finalImageURL + "'></div>";
                    finalHTML += "<h6>No need to queue for the toilets with this outfit -  so you won't miss any darts.</h6>";
                    $('#resultC').addClass('winner');
                    break;
                case 'scoreD':
                    var finalImageURL = "img/outcome-dartboard.png";
                    finalHTML += "<h2>A Dartboard</h2>";
                    finalHTML += "<div id='results-image-holder-mobile'><img src='" + finalImageURL + "'></div>";
                    finalHTML += "<h6>When in Rome (The Ally Pally), do as the Romans (darts lovers) do!</h6>";
                    $('#resultD').addClass('winner');
                    break;
                default:
                    break;
            }
        } else if (highestValue < 1000) {     // pairs
            switch (finalOutcome) {
                case 'scoreA':
                    var finalImageURL = "img/outcome-penguins.png";
                    finalHTML += "<h2>Penguins</h2>";
                    finalHTML += "<div id='results-image-holder-mobile'><img src='" + finalImageURL + "'></div>";
                    finalHTML += "<h6>Penguins are the funniest animal, and that’s a fact.</h6>";
                    $('#resultA').addClass('winner');
                    break;
                case 'scoreB':
                    var alternatives = [
                        { 
                            title: "Marty McFly & Doc Brown",
                            description: "Try not to let everyone know who wins the darts from reading your sports almanac.",
                            imageURL: "img/outcome-martydoc.png"
                        },
                        { 
                            title: "Vincent & Mia",
                            description: "Get your dancing shoes on to repeatedly replicate their dance from Pulp Fiction.",
                            imageURL: "img/outcome-vincentmia.png"
                        }
                    ];
                    var randomIndex = Math.floor(Math.random() * alternatives.length);
                    var selectedAlternative = alternatives[randomIndex];
                    
                    var finalImageURL = selectedAlternative.imageURL;
                    finalHTML += "<h2>" + selectedAlternative.title + "</h2>";
                    finalHTML += "<div id='results-image-holder-mobile'><img src='" + finalImageURL + "'></div>";
                    finalHTML += "<h6>" + selectedAlternative.description + "</h6>";
                    $('#resultB').addClass('winner');
                    break;
                case 'scoreC':
                    var finalImageURL = "img/outcome-horse.png";
                    finalHTML += "<h2>A horse</h2>";
                    finalHTML += "<div id='results-image-holder-mobile'><img src='" + finalImageURL + "'></div>";
                    finalHTML += "<h6>The old classic, but you might have to swap who is the face and bum in order to watch the darts.</h6>";
                    $('#resultC').addClass('winner');
                    break;
                case 'scoreD':
                    var alternatives = [
                        { 
                            title: "Colonel Sanders & a chicken drumstick",
                            description: "To remind you to eat on the way home.",
                            imageURL: "img/outcome-colonelchicken.png"
                        },
                        { 
                            title: "Beans & toast",
                            description: "The rare double-act that works just as well separate as together.",
                            imageURL: "img/outcome-beanstoast.png"
                        }
                    ];
                    var randomIndex = Math.floor(Math.random() * alternatives.length);
                    var selectedAlternative = alternatives[randomIndex];
                    
                    var finalImageURL = selectedAlternative.imageURL;
                    finalHTML += "<h2>" + selectedAlternative.title + "</h2>";
                    finalHTML += "<div id='results-image-holder-mobile'><img src='" + finalImageURL + "'></div>";
                    finalHTML += "<h6>" + selectedAlternative.description + "</h6>";
                    $('#resultD').addClass('winner');
                    break;
                default:
                    break;
            }
        } else if (highestValue >= 1000) {   // group 
            switch (finalOutcome) {
                case 'scoreA':
                    var alternatives = [
                        { 
                            title: "Traffic cones",
                            description: "Extra points if you start trying to ‘direct traffic’ inside the venue.",
                            imageURL: "img/outcome-trafficcones.png"
                        },
                        { 
                            title: "Bowling pins",
                            description: "You’ll have people in a spin with this strike of an outfit.",
                            imageURL: "img/outcome-bowlingpins.png"
                        }
                    ];
                    var randomIndex = Math.floor(Math.random() * alternatives.length);
                    var selectedAlternative = alternatives[randomIndex];
                    
                    var finalImageURL = selectedAlternative.imageURL;
                    finalHTML += "<h2>" + selectedAlternative.title + "</h2>";
                    finalHTML += "<div id='results-image-holder-mobile'><img src='" + finalImageURL + "'></div>";
                    finalHTML += "<h6>" + selectedAlternative.description + "</h6>";
                    $('#resultA').addClass('winner');
                    break;
                case 'scoreB':
                    var finalImageURL = "img/outcome-oompaloompa.png";
                    finalHTML += "<h2>Oompa Loompas</h2>";
                    finalHTML += "<div id='results-image-holder-mobile'><img src='" + finalImageURL + "'></div>";
                    finalHTML += "<h6>When else do you get the chance to wear fake tan?</h6>";
                    $('#resultB').addClass('winner');
                    break;
                case 'scoreC':
                    var finalImageURL = "img/outcome-promnight.png";
                    finalHTML += "<h2>Tacky prom night</h2>";
                    finalHTML += "<div id='results-image-holder-mobile'><img src='" + finalImageURL + "'></div>";
                    finalHTML += "<h6>Get your cummerbunds and ruffled tuxedo shirts out, it’s prom night!</h6>";
                    $('#resultC').addClass('winner');
                    break;
                case 'scoreD':
                    var finalImageURL = "img/outcome-trafficcones.png";
                    finalHTML += "<h2>Traffic cones</h2>";
                    finalHTML += "<div id='results-image-holder-mobile'><img src='img/outcome-trafficcones.png'></div>";
                    finalHTML += "<h6>Extra points if you start trying to ‘direct traffic’ inside the venue.</h6>";
                    $('#resultD').addClass('winner');
                    break;
                default:
                    break;
            }
        }

        finalHTML += "<button id='retry-quiz' class='white' data-umami-event='Retry button'>Retry</button>";
        finalHTML += "</div>";

        finalHTML += "<div class='socials'>";
        finalHTML += "    <p>Share with friends</p>";
        finalHTML += "    <div>";
        finalHTML += "        <span id='social-whatsapp' data-umami-event='Whatsapp share button'></span>";
        finalHTML += "        <span id='social-facebook' data-umami-event='Facebook share button'></span>";
        finalHTML += "        <span id='social-twitter' data-umami-event='Twitter share button'></span>";
        finalHTML += "    </div>";
        finalHTML += "</div>";

        // debug
        // finalHTML += "<p id='resultA'>ScoreA: " + scores.scoreA + "</p>";
        // finalHTML += "<p id='resultB'>ScoreB: " + scores.scoreB + "</p>";
        // finalHTML += "<p id='resultC'>ScoreC: " + scores.scoreC + "</p>";
        // finalHTML += "<p id='resultD'>ScoreD: " + scores.scoreD + "</p>";


        var finalCTA = "<div class='cta'>";
        finalCTA += "<p>The BetMGM Premier League Darts play-offs take place on May 23 at the O2 Arena in London. Visit <a href='https://www.betmgm.co.uk/'  data-umami-event='BeGambleAware 18+ share link'>betmgm.co.uk</a> <br />BeGambleAware 18+</p>";
        finalCTA += "</div>";

        // insert html
        $("#results-text").html(finalHTML);
        $("#results-image").html("<div id='results-image-holder'><img src='" + finalImageURL + "'></div>" + finalCTA);
        $("#results-cta").html(finalCTA); // insert finalCTA third col


        // retry quiz
        $("#retry-quiz").click(function() {
            $('input[type="radio"]').prop('checked', false);
            currentQuestion = 0;
            // Show first question
            $(".answers-box").hide();
            $("#answers-0").show();
            // Show quiz container, hide result container
            $("#quiz-container").show();
            $("#result-container").hide();
        });


        // share buttons 
        $('#social-facebook').click(function() {
            // umami.track('Facebook share button');
            var urlToShare = 'https://www.betmgm.co.uk/';
            var facebookShareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + urlToShare;
            window.open(facebookShareUrl, '_blank');
        });
        $('#social-twitter').click(function() {
            var url = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent('https://www.betmgm.co.uk/') + '&text=' + encodeURIComponent('Check out this Fancy Dress Generator!');
            window.open(url, '_blank');
        });
        $('#social-whatsapp').click(function() {
            var url = 'https://api.whatsapp.com/send?text=' + encodeURIComponent('Check out this Fancy Dress Generator! https://www.betmgm.co.uk/');
            window.open(url, '_blank');
        });


    
        // Show the result container
        $("#quiz-container").hide();
        $("#result-container").show();
    }
    
    

});