var AddActivitiesViewController = function (view, model) {
	view.parkedActivitiesList.sortable({
		connectWith: ".connectedSortable",
		revert: 300,
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