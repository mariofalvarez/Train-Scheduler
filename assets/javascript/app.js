$(document).ready(function(){
	console.log('ready')

	var firebaseConfig = {
	apiKey: "AIzaSyCrUoQP8hEOsVcATE7b2_2qjh4F2WQW9Cc",
	authDomain: "homework-7-cd52f.firebaseapp.com",
	databaseURL: "https://homework-7-cd52f.firebaseio.com",
	projectId: "homework-7-cd52f",
	storageBucket: "homework-7-cd52f.appspot.com",
	messagingSenderId: "885419055951",
	appId: "1:885419055951:web:d8e1b43b5830871cba433a"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
});