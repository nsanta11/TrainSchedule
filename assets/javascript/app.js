  var config = {
    apiKey: "AIzaSyDOC7jyQUyRFwO336mFaqEMIRtl7xv-d3Q",
    authDomain: "trainstation-3e038.firebaseapp.com",
    databaseURL: "https://trainstation-3e038.firebaseio.com",
    projectId: "trainstation-3e038",
    storageBucket: "trainstation-3e038.appspot.com",
    messagingSenderId: "932763902900"
  };
  firebase.initializeApp(config);

    var dataRef = firebase.database();

    // Initial Values
    var name = "";
    var destination = "";
    var firstTrain = "";
    var frequency = "";
    var minutesAway = 0;

    // Capture Button Click
    $("#add-train").on("click", function(event) {
      event.preventDefault();

      // Data from intial user input
      name = $("#name-input").val().trim();
      destination = $("#dest-input").val().trim();
      firstTrain = $("#first-input").val().trim();
      frequency = $("#freq-input").val().trim();

      // Code for the push
      dataRef.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,

      });
    });

    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    dataRef.ref().on("child_added", function(childSnapshot, prevChildKey) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().firstTrain);
      console.log(childSnapshot.val().frequency);

    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain
    var frequency = childSnapshot.val().frequency;
    

    var t = moment(firstTrain, "HH:mm");
    console.log(t);

    // First Time (pushed back 1 day to make sure it comes before current time)
    var tConverted = moment(firstTrain, "HH:mm").subtract(24, "hours");
    console.log(tConverted);

    var b = moment(tConverted).add(frequency, 'minutes'); 
    console.log(b);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(tConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    var arrivalTime = moment(nextTrain).format("hh:mm");
    console.log(arrivalTime)
      
    $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + arrivalTime + "</td><td>" + tMinutesTillTrain + "</td></tr>");

      //Function to clear train table data
      $("#clear-trains").on("click", function() {
        //removes all data from firebase database
        dataRef.ref().remove();
      });


    // Handles errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
      
    });