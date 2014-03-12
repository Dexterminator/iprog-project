// formView object constructor
var FormView = function (container, model){
	//Load objects from view
	this.formInputName = container.find("#formInputName");
	this.formInputLength = container.find("#formInputLength");
	this.formInputType = container.find("#formInputType");
	this.formInputDesc = container.find("#formInputDesc");
	this.formSubmitCancel = container.find("#formSubmitCancel");
	this.formSubmitSave = container.find("#formSubmitSave");
	this.formXButton = container.find("#formXButton");


	//Populate select field
	types = model.getAllTypes();
	console.log(types);
	for(var i = 0; i<types.length; i++){
		var opt = $("<option>");
		opt.attr("value", types[i]);
		opt.html(types[i]);
		this.formInputType.append(opt);
	}

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


	//No need for observer pattern

}