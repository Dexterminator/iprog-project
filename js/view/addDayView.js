//ExampleView Object constructor
var AddDayView = function (container,model) {
	this.addDayButton = container.find("#add-day-button");

	//No need for observer pattern

	this.makeHidden = function(){
		container.fadeOut(0, function() {
			//Animation complete
		});
	}

	this.makeVisible = function(){
		container.fadeIn(100, function() {
			//Animation complete
		});
	}
}
 
