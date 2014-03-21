// Constructor for formViewController objects
var FormViewController = function (view, model){
	view.formSubmitSave.click(function() {
		// Makes sure user inputs correct values
		if(view.formInputName.val() == "" || view.formInputLength.val() == ""  || view.formInputDesc.val() == ""){
			alert("You must enter all values.")
		}else if (/d/.test(view.formInputLength.val())) {
			alert("Only numbers are allowed for the activity length.");
		} else {
			// Make sure the text input for type takes precedence
			var type = "";
			if(view.formInputTypeText.val() != ""){
				type = view.formInputTypeText.val();
				model.addType(type);
			} else {
				type = view.formInputType.val();
			}
			var act = new Activity(view.formInputName.val(),parseInt(view.formInputLength.val()),type,view.formInputDesc.val());
			view.formInputName.val("");
			view.formInputLength.val("");
			view.formInputDesc.val("");
			model.addParkedActivity(act);

			// Reset and hide form
			view.activityForm[0].reset();
			window.hideForm();
		}
	});

	view.formSubmitCancel.click(function() {
		// Reset and hide form
		view.activityForm[0].reset();
		window.hideForm();
	});

	view.formXButton.click(function() {
		// Exactly as the cancel button, reset and hide form
		view.activityForm[0].reset();
		window.hideForm();
	});
}