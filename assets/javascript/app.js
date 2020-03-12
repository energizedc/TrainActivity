//-------------------------------Javascript Begins Here-----------------------------
    /////////////////////////////////////////////////////////////////////////////
    //  Your web app's Firebase configuration
    /////////////////////////////////////////////////////////////////////////////

    var firebaseConfig = {
        apiKey: "AIzaSyBX2f8OHfCR8oTD01vGHspBpVzcYLnMVnE",              
        authDomain: "myhomework7-25396.firebaseapp.com",
        databaseURL: "https://myhomework7-25396.firebaseio.com",
        projectId: "myhomework7-25396",
        storageBucket: "myhomework7-25396.appspot.com",
        messagingSenderId: "714112506988",
        appId: "1:714112506988:web:c713bdc4ac3829ca64cc49",
        measurementId: "G-VWD16SPDBL"
    }
    /////////////////////////////////////////////////////////////////////////////
    // 1.  Initialize Firebase
    /////////////////////////////////////////////////////////////////////////////
    firebase.initializeApp(firebaseConfig);

      // Create a variable to reference the database.
      var database = firebase.database();
                    
   

    function getInfo(){
        var trName = $("trainName").val().trim();
        var trDestination = $("destination").val().trim();
        var trFirstTrainTime = $("firstTrainTime").val().trim();
        var trFrequency= $("frequency").val().trim();

    }      
    
    /////////////////////////////////////////////////////////////////
    // 2. Button for adding Trains                      /////////////
    /////////////////////////////////////////////////////////////////
	$("#submit").on("click", function(event){
        event.preventDefault();
        
        console.log("i am in on click function");

    ////// Grabs user input and assign to variables    /////////////////////////
    
        var trName = $("#trainName").val().trim();
        var trDestination = $("#destination").val().trim();
		var trainTimeInput = moment($("#firstTrainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");
		var frequencyInput = $("#frequency").val().trim();

		// Test for variables entered
		console.log(trName);		
		console.log(trDestination);
		console.log(trainTimeInput);
		console.log(frequencyInput);

		// Creates local "temporary" object 
		// Will push this to firebase
		var newTrain = {
			name:  trName,			
			destination: trDestination,
			trainTime: trainTimeInput,
			frequency: frequencyInput
		}

		// pushing trainInfo to Firebase
        database.ref().push(newTrain);
        
        console.log("i have pushed the data");

		// clear text-boxes
		$("#trainName").val("");
		$("#destination").val("");
		$("#firstTrainTime").val("");
		$("#frequency").val("");

		// Prevents page from refreshing
		return false;
	});

    // Firebase watcher .on("child_added"
        database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();


		// assign firebase variables to snapshots.
		var firebaseName = (sv.name);
		var firebaseDestination = (sv.destination);
		var firebaseTrainTimeInput = (sv.trainTime);
        var firebaseFrequency = (sv.frequency);
        
    /////////////////////////////////////////////////////////////////////////////
    // Using moment.js
    /////////////////////////////////////////////////////////////////////////////

		
			var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");  ///get diff in time in min
			var timeRemainder = diffTime % firebaseFrequency ;    //gets remaining time left til new train
			var minutes = firebaseFrequency - timeRemainder;
			var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
		
		// Test for correct times and info
		console.log(minutes);
		console.log(nextTrainArrival);
		console.log(moment().format("hh:mm A"));
		console.log(nextTrainArrival);
		console.log(moment().format("X"));

    /////////////////////////////////////////////////////////////////////////////
    // Final write to Dom table header
    // Append train info to table on Current Train Schedule
    /////////////////////////////////////////////////////////////////////////////

		$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" +  firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

	});