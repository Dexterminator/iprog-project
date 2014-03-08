// formView object constructor
var FormView = function (container, model){
	//Load objects from view
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