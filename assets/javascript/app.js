// time counter variable
var countDown = 30;
// var for keeping track of rights
var right = 0;
// var for keeping track of wrongs
var wrong = 0;
// var for unanswered questions
var unanswered = 0

//  Variable that will hold setInterval that decreases countDown 
var intervalId;

// object with questions as keys and answer arrays as values
// object is set as {Question:[Choices]}
var qAnda = {
	['What is the most popular board game of all time?']:
	["Chess", "Monopoly", "Risk", "Checkers"],

	['What is the national animal of Scotland?']:
	['Hawk', 'Bear', 'Unicorn', 'Narwhal'],

	['How many paintings did Vincent Van Gogh sell during his lifetime?']:
	['One', 'Two', 'Six', 'Fourteen'],

	['What was the name of the kleptomaniac monkey in the Disney movie "Aladdin"?']:
	['Ali', 'Abu', 'Amir', 'Aardvark'],

	['Who is credited with inventing the first mechanical computer?']:
	['Alan Turing', 'Charles Babbage', 'Sir William Thomson', 'H. L. Hazen']
};

//  stores the keys of qAnda which are the questions into an array
var getQues = Object.keys(qAnda)

// array with the right answers only
var rightAnswer = ["Chess", "Unicorn", "One", "Abu", "Charles Babbage"]

// array of images 
var imageArray = ["assets/images/chess.gif", "assets/images/unicorn.gif", "assets/images/one.jpg", "assets/images/abu.gif", "assets/images/Charles_Babbage.jpg"]

// used to keep track of questions asked
var index = 0
// test timer


// the code block will only function after the page is loaded
$(document).ready(function(){

	function timer(){
	// set so that count function is executed once per sec
	intervalId = setInterval(count, 1000);
  }

	// function set to change and display the time remaining
	function count(){
		// if the timer is not yet 0 keep the count down going
		if(countDown>0){
			// display the remaining time
			$("#timeLeft").html(countDown);
			// each time the count function is executed countDown goes down by 1
			countDown--;
		}
		// once countDown is 0 clear countDown
		else if(countDown === 0){
			$("#timeLeft").html(countDown);
			clearInterval(intervalId);
			// display the right answer. Make sure the buttons can't be pushed during the time interval before the next question is shown
			$('#image').attr("src", imageArray[index]);
			displayTimeup()
			// wait 5 secs before moving onto the next question
			unanswered++;
			index++;
			setTimeout(getQuestion, 5000);
		}
	}

	function getQuestion(){
		$('table').show();
		$('.option').show()
		$('#result').hide();

		if(index<getQues.length){
			// start timer
			countDown = 30;
			timer();
			// Displays the question from the qAnda object based on the index value
			$('#question').html(getQues[index]);
			// Displays the choices for the question
			$('#choice1').html(qAnda[getQues[index]][0]);
			$('#choice2').html(qAnda[getQues[index]][1]);
			$('#choice3').html(qAnda[getQues[index]][2]);
			$('#choice4').html(qAnda[getQues[index]][3]);
		}
		else if(index == getQues.length){
			// display final scores
			clearInterval(intervalId);
			$('table').hide();
			$('#score').show();
			$('#wins').html('Correct Answers: ' + right);
			$('#losses').html('Incorrect Answers: ' + wrong);
			$('#unanswered').html('Unanswered: ' + unanswered);
		}

	};


	// if choice1 is clicked
	$('#choice1').click(function(){
		// if corret
		if($('#choice1').text() == rightAnswer[index]){
			// display congrats message and image
			$('#image').attr("src", imageArray[index]);
			displayCorrect();
			// add 1 to the right counter
			right++;
		}
		// if incorrect
		else{
			// display the right answer
			$('#image').attr("src", imageArray[index]);
			displayWrong()
			// add 1 to the wrong counter
			wrong++;
		}
		// add 1 to index in order to move to the next question
		index++;
		// call this function to display the next question
		clearInterval(intervalId);
		setTimeout(getQuestion, 5000);
	});

	// repeat previous code for the other buttons



	$('#choice2').click(function(){
		if($('#choice2').text() == rightAnswer[index]){
			$('#image').attr("src", imageArray[index]);
			displayCorrect();
			right++;
		}
		else{
			$('#image').attr("src", imageArray[index]);
			displayWrong();
			wrong++;
		}
		index++;
		clearInterval(intervalId);
		setTimeout(getQuestion, 5000);
	});

	$('#choice3').click(function(){
		if($('#choice3').text() == rightAnswer[index]){
			$('#image').attr("src", imageArray[index]);
			displayCorrect();
			right++;
		}
		else{
			$('#image').attr("src", imageArray[index]);
			displayWrong();
			wrong++;
		}
		index++;
		clearInterval(intervalId);
		setTimeout(getQuestion, 5000);
	});

	$('#choice4').click(function(){
		if($('#choice4').text() == rightAnswer[index]){
			$('#image').attr("src", imageArray[index]);
			displayCorrect();
			right++;
		}
		else{
			$('#image').attr("src", imageArray[index]);
			displayWrong()
			wrong++;
		}
		index++;
		clearInterval(intervalId);
		setTimeout(getQuestion, 5000);
	});



	function displayCorrect(){
		$('.option').hide()
		$('#message').text('Correct!')
		$('#answer').text('')
		$('#result').show();
	}

	function displayWrong(){
		$('.option').hide()
		$('#message').text('Wrong!')
		$('#answer').text(rightAnswer[index])
		$('#result').show();
	}

	function displayTimeup(){
		$('.option').hide()
		$('#message').text('Time is up!')
		$('#answer').text(rightAnswer[index])
		$('#result').show();
	}



	// start the game when button is clicked
	$("#start").click(function(){
		getQuestion();
		// remove the start button from screen
		$("#start").hide();
	})


});