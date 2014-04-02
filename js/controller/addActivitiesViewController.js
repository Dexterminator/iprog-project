var AddActivitiesViewController = function (view, model) {
	// This is the actual onClick function of each activity object
	function activityClick(event) {
		window.showForm(event.data.activity);
	}


	view.parkedActivitiesList.sortable({
		connectWith: ".connectedSortable",
		revert: 300,
		helper : 'clone', // This option prevents the click event from happening
		receive: function(event, ui) {
			//Called when an item from another list is moved to this list
			var splitted = ui.item.attr('id').split("-");
			var dayNo = splitted[0];
			var position = splitted[1];
			model.moveActivity(dayNo, position, null, 0);
		}
	}).disableSelection();

	view.addActivityButton.click(function() {
		window.showForm();
	});
}