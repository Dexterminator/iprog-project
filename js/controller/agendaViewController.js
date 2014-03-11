var AgendaViewController = function (view, model) {
	//Make it possible to drop items in the column, and update the model accordingly
	view.startTime.keyup(function() {
		console.log(view.startTime.val());
	});

	view.startTime.submit(function() {
		return false;
	});

	view.agendaList.sortable({
		connectWith: ".connectedSortable",
		revert: 300,
		receive: function(event, ui) {
			//Called when an item from another list is moved to this list
		}
	}).disableSelection();
}