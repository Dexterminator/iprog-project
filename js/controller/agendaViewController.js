var AgendaViewController = function (view, model, dayNo) {
	// This is the actual onClick function of each activity object
	function activityClick(event) {
		window.showForm(event.data.activity);
	}

	//Make it possible to drop items in the column, and update the model accordingly
	view.startTime.keyup(function() {
		var timeInput = view.startTime.val();
		if(/([01]\d|2[0-3])[:\.]?[0-5]\d/.test(timeInput)){
			console.log("Hej");
			timeInput = timeInput.replace(/[:\.]/, '');
			// timeInput = timeInput.replace('.', '');
			var hours = timeInput.slice(0,2);
			var minutes = timeInput.slice(2, 4);
			model.days[dayNo].setStart(parseInt(hours), parseInt(minutes), model);
		}
	});

	//Prevent the page from being reloaded when the user presses the return key
	view.startTime.keypress(function(event) {
		if (event.keyCode == 13) {
			event.preventDefault();
			view.startTime.blur();
			return false;
		};
	});
	// Set the onClick of every activity to show the form with the values entered
	function setOnClick() {
		var activities = model.getActivitiesOfADay(dayNo);
		for(var i = 0; i< $(".activity").length; i++){
			var index = i;
			$(".activity-"+i).click({activity:activities[i]}, activityClick);
		}
	}
	// Generate onClicks for activities
	setOnClick();
	//Show the latest valid time when the field loses focus
	view.startTime.blur(function() {
		view.startTime.val(model.days[dayNo].getStart());
	});

	view.agendaList.sortable({
  		stop: function( event, ui ) {
  			var splitted = ui.item.attr('id').split("-");
  			if(splitted[0] == view.dayNo){
  				var listItem = document.getElementById(ui.item.attr('id'));
				var newDay;
				var newPosition;

				if(listItem != null){
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
					model.moveActivity(splitted[0], splitted[1], newDay, newPosition);
					// Regenerate onClicks of activities
					setOnClick();
				}
  			}
  		}
	});

	view.agendaList.sortable({
		connectWith: ".connectedSortable",
		revert: 300,
		helper : 'clone', // This option prevents the click event from happening
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

			if((listItem.nextSibling == null && listItem.previousSibling == null) || model.getActivitiesOfADay(view.dayNo).length == 0){
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
			console.log(model.days[newDay].getMinEnd());
			// Regenerate onClicks of activities
			setOnClick();

			if (model.days[newDay].getMinEnd() > 1439) {
				model.moveActivity(newDay, newPosition, dayNo, position);				
				alert("End time exceeds 23:59.");
			};
		}
	}).disableSelection();
}