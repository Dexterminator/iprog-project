// Constructor for formViewController objects
var FormViewController = function (view, model){
	view.formSubmitSave.click(function() {
		window.showAgendas();
	});
	view.formSubmitCancel.click(function() {
		window.showAgendas();
	});

}