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
			var splitted = ui.item.attr('id').split("-");
			var dayNo;
			if(splitted[0] == "null") {
				dayNo = null;
			}else {
				dayNo = splitted[0];
			}
			var position = splitted[1];
			model.moveActivity(dayNo, position, null, 0);
			//Called when an item from another list is moved to this list
		}
	}).disableSelection();
}