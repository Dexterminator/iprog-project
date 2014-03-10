var AddActivitiesViewController = function (view, model) {
	view.parkedActivitiesList.sortable({
		connectWith: ".connectedSortable",
		revert: 300,
		receive: function(event, ui) {
			//Called when an item from another list is moved to this list
		}
	}).disableSelection();

	view.addActivityButton.click(function() {
		window.showForm();
	});
}