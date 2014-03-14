var AddActivitiesViewController = function (view, model) {
	// This is the actual onClick function of each activity object
	function activityClick(event) {
		window.showForm(event.data.activity);
	}

	// Set the onClick of every activity to show the form with the values entered
	function setOnClick() {
		var activities = model.getParkedActivities();
		for(var i = 0; i< $(".activity").length; i++){
			var index = i;
			$(".activity-"+i).click({activity:activities[i]}, activityClick);
		}
	}
	// Generate onClicks for activities
	setOnClick();

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
			setOnClick();
		}
	}).disableSelection();

	view.addActivityButton.click(function() {
		window.showForm();
	});

	// This happens when a new activity has been added
	this.updateClicks = function() {
		setOnClick();
	}
}