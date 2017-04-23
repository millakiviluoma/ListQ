$(function() {
		
	var totalDeFilhos = $("#lista").children().size();
	
	if (totalDeFilhos > 3) {
		$("#lists").removeClass("altura");
	}
	  
	$("#lista").keypress(function(event){
	  	totalDeFilhos = $("#lista").children().size();
        
        if (totalDeFilhos > 3) {
          	$('#lists').removeClass('altura');
        }
    })
	  
});