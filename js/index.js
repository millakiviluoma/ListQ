var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    
    bindEvents: function() {
       document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    
//    onDeviceReady: function() {
//        app.receivedEvent('deviceready');
//    },
    
    // Update DOM on a Received Event
    
 /*   receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
}; */

onDeviceReady: function() {
//function db1(){
var db = window.openDatabase('listat', '1.0', 'Listakanta', '1000000');
  function transaction() {
        db.transaction(populateDB, errorCB);
        db.transaction(queryDB, errorCB);
    };

//db.transaction(populateDB, errorCB);
//db.transaction(queryDB, errorCB);

// Save entered item to database
    $('#btnsave').click(function() {
         db.transaction(insertRow, errorCB, emptyFields);
         db.transaction(queryDB, errorCB);
});       

// Remove all
    $('#btnclear').click(function() {
         db.transaction(populateDB, errorCB);
         db.transaction(queryDB, errorCB);
});       

// Delete one todo
    $("#datalist").on('click', 'li', function (e) {
         var booksid = $(this).attr("id");
            
        db.transaction(
            function(tx){
                tx.executeSql('DELETE FROM Books WHERE id=?', [todoid]);
             },
            errorCB
	       );

         db.transaction(queryDB, errorCB);   
    });


function populateDB(tx) {
        tx.executeSql('DROP TABLE IF EXISTS Books');
        tx.executeSql('CREATE TABLE IF NOT EXISTS Books (id INTEGER PRIMARY KEY, item, rate)');
    tx.executeSql('INSERT INTO Books (title, rate) VALUES ("Baby Jane", "5")');
    
    }

// Insert new
  function insertRow(tx) {
        tx.executeSql('INSERT INTO Books (title, rate) VALUES (?,?)', [$('#item').val(), $('#rate').val()]);
    }

// Fetch all from DB
function queryDB(tx) {
        tx.executeSql('SELECT * FROM Books', [], querySuccess, errorCB);
    }

// Populate listview
 function querySuccess(tx, results) {
        var len = results.rows.length;
        console.log(len + " rows found.");
        $('#datalist').empty(); // remove all rows
        for (var i = 0; i < len; i++){
            $('#datalist').append("<li data-icon='delete' id='" +  results.rows.item(i).id + "'><a href='#'>" + results.rows.item(i).item + " " + results.rows.item(i).rate + "</a></li>");
        }
        
        // Always refresh listview after updating listview with JS
        $('#datalist').listview('refresh');
    }

// Transaction error callback
    function errorCB(err) {
        console.log("Error processing SQL: "+ err.code);
    }
    
	function onSuccessExecuteSql( tx, results ){
		console.log( 'Execute SQL completed' );
	}

    function emptyFields() {
        $('#item').val('');
        $('#rate').val('');
    } 
}
    
};
