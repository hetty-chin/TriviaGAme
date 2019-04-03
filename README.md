# TriviaGAme
###Javascript Assignment 2

In this assignment, I created a timed questionnaire about tree care. 
There are 5 questions. The first will be displayed after the player hits start. 
The player is given 60 seconds per question. 
If the player answers correctly, the selection will turn green and a little blurb and photo wil show up. 
If the player answer incorrecrly, the selection will turn red and the correct answer till turn green. Again, the blurb and photo will show up. 
If the player does not answer after 60 seconds, the correct answer will turn green, again with the blurb and photo. 
At the end of the questions, a screen will display with the number of correct answers, wrong answers, and missed answers and an option to try again. 

I used a mixture of vanilla javascript and jquery. 
I reemphasized some learned concepts such as .show and .slideDown and .slideUp. 
I learned some new concepts such as .addClass and .removeClass, clearInterval, setInterval, setTimeout. This is also my first time using this, parent, and .next. This is my first time referencing an element that I created: see currentQuizId = "#quiz-" + questionNumber); and then $(currentQuizId).slideDown('slow', function() {{});

It took a while to get the hang of getting something to load sequentially, and to hide sequentially. This was a lot more code than I expected. Maybe next time, I'll learn to do it more efficiently. 

I meant to add more comments, but I'm super sick so I hope this will do for now, and I'll try and add comments in later on. 

I kept a bunch of the console.logs in there to make it easier to see what's happening. 

Also, ideally I would have done something to prevent the possibility of multiple clicks. You can see in the console logs what happens when someone clicks on answers multiple times. I didn't have time to figure that out. 


