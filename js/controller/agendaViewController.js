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

			var listItem = document.getElementById(ui.item.attr('id'));
			var newDay;
			var newPosition;
			if(listItem.nextSibling == null && listItem.previousSibling == null){
				newDay = view.dayNo;
				newPosition = 0;
			}else if(listItem.nextSibling == null){
				var newSplitted = listItem.previousSibling.getAttribute('id').split("-");
				newDay = newSplitted[0];
				newPosition = parseInt(newSplitted[1]) + 1;
			}else {
				var newSplitted = listItem.nextSibling.getAttribute('id').split("-");
				newDay = newSplitted[0];
				newPosition = newSplitted[1];
			}

			model.moveActivity(dayNo, position, newDay, newPosition);
		}
	}).disableSelection();
}