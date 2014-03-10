var AgendaViewController = function (view, model) {
	//Make it possible to drop items in the column, and update the model accordingly
	view.list.sortable({connectWith: ".connectedSortable", revert: 300}).disableSelection();

}