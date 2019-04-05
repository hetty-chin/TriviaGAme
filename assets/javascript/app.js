window.onload = function () {
    // setting my global variables at initial values
    var correctCounter = 0;
    var incorrectCounter = 0;
    var missedCounter = 0;
    var countDownNumber;
    var intervalId;
    var questionNumber = 1;
    var currentQuizId;
    
    // an event listening for when someone clicks the start button to start display question 1 and begin the counter
    document.getElementById("start").onclick = function() {
        run();
        document.getElementById("start").style.display = "none";
        $(".start-game").show(1000);
        $("#quiz-1").slideDown('slow');
    };

    // an event listener for when someone clicks to restart button after the game ends that resets all the initial values; begin the countdown again and start with question 1. I also have to hide the game over text and the correct answers, and because green and red classes were added to the correct and wrong choices they have to be removed else it'll show in the second time around
    document.getElementById("restart").onclick = function() {
        run();
        document.getElementById("restart").style.display = "none";
        correctCounter = 0;
        incorrectCounter = 0;
        missedCounter = 0;
        countDownNumber = 60;
        questionNumber = 1;
        currentQuizId = 0;
        $("#game-over").hide(1000);
        $('.quiz-correct-answer').hide(1000);
        $(".quiz-answer").removeClass("green red");
        $(".start-game").show(1000);
        $("#quiz-1").slideDown('slow');
    };

    // this start the timer, I set it for 61 because I think there were a bunch of bells and whistles that cause the timer not to display right away. if i set if to 60, it would show 59 as the first number of the count down
    function run() {
        clearInterval(intervalId);
        countDownNumber = 61;
        intervalId = setInterval (decrement, 1000);
    }

    // this substracts 1 from the countdown number and shows it in the html file
    function decrement() {
        countDownNumber--; 

        var timeRemainingElement = document.getElementById("time-remaining");

        timeRemainingElement.innerHTML = countDownNumber;

        // once number hits 0 stop the countdown, and run the missed function
        if (countDownNumber === 0) {
            console.log('missed');
            stop();
            missedFunction();
        }
    }
    
    //missed function - increase the missed answers by 1, show the correct answer in green, show the blurb, after 10 seconds run the next function, show that the player missed the answer (I had this in the if function initially but I thought it made the somethings not global so I took it out but I don't think that made a difference so this could be excessive)
    function missedFunction() {
        missedCounter ++;
        console.log("missed #: " + missedCounter);
        $('.correct').addClass('green');
        $('.quiz-correct-answer').slideDown('slow');
        setTimeout(nextFunction,10000);
        $('#missed-prompt').show(3000);
        $('#missed-prompt').hide(5000);
    }

    //when someone selects an answer, if the answer is correct (you can tell because I added a "correct" class to the correct answer), the correct counter goes up, the selection turns green, the blurb comes down, a congratulatory message displays, and after 10 seconds the next function goes off. if someone selects the wrong answer, the correct answer shows in green, the wrong answer in red and again the blurb shows, and incorrect message shows and after 10 seconds, the next function goes off. 
    $('.quiz-answer').click(function(){
        console.log('answer function');
        stop();
        if ($(this).hasClass('correct')) {
            console.log('is correct');
            correctCounter ++;
            console.log("correct #: " + correctCounter);
            $(this).addClass('green');
            $(this).parent().next('.quiz-correct-answer').slideDown('slow');
            setTimeout(nextFunction,10000);
            $('#correct-prompt').show(3000);
            $('#correct-prompt').hide(5000);
        } else {
            console.log('not correct');
            incorrectCounter ++;
            console.log("incorrect #:" + incorrectCounter);
            $(this).addClass('red');
            $(this).parent().children('.correct').addClass('green');
            $(this).parent().next('.quiz-correct-answer').slideDown('slow');
            setTimeout(nextFunction,10000);
            $('#incorrect-prompt').show(3000);
            $('#incorrect-prompt').hide(5000);
        }
    });

    //Ideally, I would have done something to prevent the possibility of mulitple clicks because it still adds to the score and still runs the ensuing function, but I didn't have time to figure that out. 

    // the next function, removes the added green and reds from previous operations. each time the next function goes off, I added to the question number, then used the question number to identify which quiz number we're now on. the next function, slides the previous quiz up. Originally $('.quiz').slideUp took care of removing the questions, the options and the blurb but for some reason after a missed function, the blurb contstantly shows, so I called to the blurb $('.quiz-correct-answer') as well even thought it's a child of .quiz. 
    function nextFunction () {
        $(".quiz-answer").removeClass("green red");
        console.log('next function');
        questionNumber ++;
        console.log("now, we're going to: " + questionNumber);
        currentQuizId = ("#quiz-" + questionNumber);
        $('.quiz-correct-answer').slideUp('slow');
        $('.quiz').slideUp('slow', function(){});
        // when all the questions have been asked the game is over and I display all the scores. I only had 5 questions so if the question number is 6, there is no 6th question - it's the game done prompts
        if (questionNumber === 6) {
            stop();
            $("#correct-answers-counter").html(correctCounter);
            $("#incorrect-answers-counter").html(incorrectCounter);
            $("#missed-answers-counter").html(missedCounter);
            $("#game-over").show(1000);
            $("#restart").show(1000);
            $(".start-game").hide(1000);
        } else {
            console.log(currentQuizId);
            $(currentQuizId).slideDown('slow', function(){});
            run();
        }
    }

    // the stop function clears the countdown otherwise the number would keep decreasing to be in the negatives
    function stop() {
        clearInterval(intervalId);
    }
}
