// Initialize Firebase
var firebaseConfig = {
	apiKey: "AIzaSyCrUoQP8hEOsVcATE7b2_2qjh4F2WQW9Cc",
	authDomain: "homework-7-cd52f.firebaseapp.com",
	databaseURL: "https://homework-7-cd52f.firebaseio.com",
	projectId: "homework-7-cd52f",
	storageBucket: "homework-7-cd52f.appspot.com",
	messagingSenderId: "885419055951",
	appId: "1:885419055951:web:d8e1b43b5830871cba433a"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// Add Train Event Listener
$("#target").submit(function () {
	// User input assigned to variables
	var trainName = $("#train-input").val().trim();
	var destinationName = $("#destination-input").val().trim();
	var timeStart = moment($("#time-input").val().trim(), "HH:mm").format("HH:mm");
	var frequencyRate = $("#frequency-input").val().trim();

	// Local object for holding train data
	var newTrain = {
		name: trainName,
		destination: destinationName,
		start: timeStart,
		frequency: frequencyRate
	};

	// Push train data to the database
	database.ref().push(newTrain);

	// TESTING
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.start);
	console.log(newTrain.frequency);

	// Clears all of the text-boxes after data is stored
	$("#train-input").val("");
	$("#destination-input").val("");
	$("#time-input").val("");
	$("#frequency-input").val("");

	// Determine when the next train arrives
	return false;
});

// Firebase Event Handler to store data in database & edit DOM
database.ref().on("child_added", function (childSnapshot) {
	console.log(childSnapshot.val());

	// Store train info into a variable.
	var trainName = childSnapshot.val().name;
	var destinationName = childSnapshot.val().destination;
	var timeStart = childSnapshot.val().start;
	var frequencyRate = childSnapshot.val().frequency;

	// Firebase TESTING
	console.log(trainName);
	console.log(destinationName);
	console.log(timeStart);
	console.log(frequencyRate);

	// First Train Time
	var firstTimeConverted = moment(timeStart, "HH:mm").subtract(1, "years");
	console.log(firstTimeConverted);

	// Current Time
	var currentTime = moment();
	console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

	// Difference between the times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	// Time apart (remainder)
	var tRemainder = diffTime % frequencyRate;
	console.log(tRemainder);

	// Minute Until Next Train
	var tMinutesTillTrain = frequencyRate - tRemainder;
	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	// Next Train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
	var formattedTime = moment(nextTrain).format("HH:mm");

	// Append each train's data into the table
	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destinationName + "</td><td>" + frequencyRate + "</td><td>" + formattedTime + "</td><td>" + tMinutesTillTrain + "</td>");
});