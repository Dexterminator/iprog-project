// Constructor for formViewController objects
var FormViewController = function (view, model){
	view.formSubmitSave.click(function() {
		var act = new Activity(view.formInputName.val(),view.formInputLength.val(),view.formInputType.val(),view.formInputDesc.val());
		view.formInputName.val("");
		view.formInputLength.val("");
		view.formInputDesc.val("");
		model.addParkedActivity(act);

		window.showAgendas();
	});

	view.formSubmitCancel.click(function() {
		window.showAgendas();
	});

}