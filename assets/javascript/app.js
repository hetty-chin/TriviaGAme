window.onload = function () {

    var correctCounter = 0;
    var incorrectCounter = 0;
    var missedCounter = 0;
    // timer counts down from 60
    var countDownNumber;
    var intervalId;
    var questionNumber = 1;
    var currentQuizId;
    
    document.getElementById("start").onclick = function() {
        run();
        document.getElementById("start").style.display = "none";
        $(".start-game").show(1000);
        $("#quiz-1").slideDown('slow');
    };

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

    function run() {
        clearInterval(intervalId);
        countDownNumber = 61;
        intervalId = setInterval (decrement, 1000);
    }

    function decrement() {
        countDownNumber--; 

        var timeRemainingElement = document.getElementById("time-remaining");

        timeRemainingElement.innerHTML = countDownNumber;

        // once number hits 0 stop the function
        if (countDownNumber === 0) {
            console.log('missed');
            stop();
            missedFunction();
        }
    }
    
    //missed function
    function missedFunction() {
        missedCounter ++;
        console.log("missed #: " + missedCounter);
        $('.correct').addClass('green');
        $('.quiz-correct-answer').slideDown('slow');
        setTimeout(nextFunction,10000);
        $('#missed-prompt').show(3000);
        $('#missed-prompt').hide(5000);
    }

    //when someone selects an answer
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

    function nextFunction () {
        $(".quiz-answer").removeClass("green red");
        console.log('next function');
        questionNumber ++;
        console.log("now, we're going to: " + questionNumber);
        currentQuizId = ("#quiz-" + questionNumber);
        $('.quiz-correct-answer').slideUp('slow');
        $('.quiz').slideUp('slow', function(){});
        // when all the questions have been asked
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

    // the stop function
    function stop() {
        clearInterval(intervalId);
    }
}
