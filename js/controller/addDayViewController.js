var AddDayViewController = function (view, model) {
	view.addDayButton.click(function() {
		window.addDay();
		//TODO: Also add day to model
	});
}