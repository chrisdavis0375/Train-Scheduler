$(document).ready(function() {
//Initialize firebase

console.log(config);
var config = {
    apiKey: "AIzaSyCmribDLNL6EnZgDHmg_hWusm-fwSoZEy0",
    authDomain: "train-scheduler-13120.firebaseapp.com",
    databaseURL: "https://train-scheduler-13120.firebaseio.com",
    projectId: "train-scheduler-13120",
    storageBucket: "train-scheduler-13120.appspot.com",
    messagingSenderId: "765758833203"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

//On click event for submit button to add new train data to firebase

$("#add-train").on('click', function(event) {
    event.preventDefault();
    var train = $("#train-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    console.log("Train was added successfully!");

    var trainData = {
      name: train,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    };
  

    database.ref().push(trainData);

    alert("New train has been successfully added!");

    console.log(trainData.name);
    console.log(trainData.destination);
    console.log(trainData.firstTrain);
    console.log(trainData.frequency);
//Clearing inputs

$("#train-input").val("");
$("#destination-input").val("");
$("#first-input").val("");
$("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());

  var name = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var frequency = childSnapshot.val().frequency;
  var first = childSnapshot.val().firstTrain;

  //Using moment
  var array = first.split(":");
  var max = moment().max(moment(), time);
  var time = moment().hours(array[0]).minutes(array[1]);
  var tMinutes;
  var tArrival;

  if (max === time) {
    tArrival = trainTime.format("hh:mm A");
    tMinutes = trainTime.diff(moment(), "minutes");
  } else {
    var differenceTimes = moment().diff(time, "minutes");
    var tRemainder = differenceTimes % frequency;
    tMinutes = frequency - tRemainder;
    tArrival = moment().add(tMinutes, "m").format("hh:mm A");
  }
  console.log("tMinutes:", tMinutes);
  console.log("tArrival:", tArrival);

  $("#train-data").append(
    $("<tr>").append(
      $("<td>").text(name),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(tArrival),
      $("<td>").text(tMinutes)
    )

    );
  });
});  