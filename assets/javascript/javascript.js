$(document).ready(function() {
//Initialize firebase
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

//On click event for submit button to add new train data
$("#add-train").on('click', function(event) {
    event.preventDefault();
    var train = $("#train-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    alert("ive been clicked!");

    database.ref().push({
        Train: train,
        Destination: destination,
        FirstTrain: firstTrain,
        Frequency: frequency,
        dateAdded:
        firebase.database.ServerValue.TIMESTAMP
    })

database.ref()orderByChild("dateAdded").limitToLast(1).on("child_added", funciton(snapshot) {
    console.log(snapshot.val().name);
    $("#train-input").text(snapshot.val().name);
    $("#destination-input").text(snapshot.val().email);
    $("#first-input").text(snapshot.val().date);
    $("#frequency-display").text(snapshot.val().rate);
})    
})
})