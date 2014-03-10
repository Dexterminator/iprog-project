var AddActivitiesViewController = function (view, model) {
	view.parkedActivitiesList.sortable({connectWith: ".connectedSortable", revert: 300}).disableSelection();

	view.addActivityButton.click(function() {
		window.showForm();
	});
}