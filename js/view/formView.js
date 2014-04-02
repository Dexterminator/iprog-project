// formView object constructor
var FormView = function (container, model){
	//Load objects from view
	this.activityForm = container.find("#activityForm");
	this.formInputName = container.find("#formInputName");
	this.formInputLength = container.find("#formInputLength");
	this.formInputType = container.find("#formInputType");
	this.formInputDesc = container.find("#formInputDesc");
	this.formSubmitCancel = container.find("#formSubmitCancel");
	this.formSubmitSave = container.find("#formSubmitSave");
	this.formXButton = container.find("#formXButton");
	this.formInputTypeText = container.find("#formInputTypeText");
	// This is needed in order to edit activities
	this.editMode = false;
	this.activity = null;

	//Register as observer
	model.addObserver(this);
	//Populate select field
	this.populateSelectField = function(){
		this.formInputType.html("");
		types = model.getAllTypes();
		for(var i = 0; i<types.length; i++){
			var opt = $("<option>");
			opt.attr("value", types[i]);
			opt.html(types[i]);
			this.formInputType.append(opt);
		}
	}
	this.populateSelectField();

	this.makeHidden = function(){
		container.fadeOut(0, function() {
			//Animation complete
		});
	}

	this.makeVisible = function(activity){
		// If called with an activity, populate fields and enter edit mode
		if(activity != null){
			this.editMode = true;
			this.formInputName.val(activity.getName());
			this.formInputLength.val(activity.getLength());
			this.formInputType.val(activity.getTypeId());
			this.formInputDesc.val(activity.getDescription());
			this.activity = activity;
		}
		container.fadeIn(100, function() {
			//Animation complete
		});
	}

	this.update = function(arg){
		// Populate select field again, a new activity may have been added.
		this.populateSelectField();
	}

}