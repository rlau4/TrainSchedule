// Initialize Firebase
var config = {
    apiKey: "AIzaSyAIyQTE9hIn3jzq6P4pH3EX9nI7YcGfsUc",
    authDomain: "trainschedule-b3694.firebaseapp.com",
    databaseURL: "https://trainschedule-b3694.firebaseio.com",
    projectId: "trainschedule-b3694",
    storageBucket: "",
    messagingSenderId: "97033302646"
};
firebase.initializeApp(config);


var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#train-destination").val().trim();
    var trainFrequency = $("#train-frequency").val().trim();
    var firstTrainTime = $("#train-time").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        frequency: trainFrequency,
        firstTime: firstTrainTime,
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
});

database.ref().on("child_added", function(childSnapshot){
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFrequency = childSnapshot.val().frequency;
    var firstTrainTime = childSnapshot.val().firstTime;

    
    //moment.js
    var firstTrainConvert = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTrainConvert), "minutes");
    var timeRemaining = diffTime % trainFrequency;
    var timeTillTrain = trainFrequency - timeRemaining;
    var nextTrain = moment().add(timeTillTrain, "minutes");
    var nextTrainSimple = moment(nextTrain).format("h:mm A");

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextTrainSimple),
        $("<td>").text(timeTillTrain),
    );

   $("#train-table > tbody").append(newRow);
});