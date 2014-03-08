// formView object constructor
var FormView = function (container, model){
	var formInputName = container.find("formInputName");
	var formInputLength = container.find("formInputLength");
	var formInputType = container.find("formInputType");
	var formInputDesc = container.find("formInputDesc");
	var formSubmitCancel = container.find("formSubmitCancel");
	var formSubmitSave = container.find("formSubmitSave");
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