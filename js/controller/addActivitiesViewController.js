var AddActivitiesViewController = function (view, model) {
	view.parkedActivitiesList.sortable({connectWith: ".connectedSortable"}).disableSelection();

	view.addActivityButton.click(function() {
		window.showForm();
	});
}