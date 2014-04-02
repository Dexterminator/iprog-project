var ActivityController = function (activity, model, dayNo, i) {
	function activityClick(event) {
		window.showForm(event.data.activity);
	}

	if (dayNo == null) { // Parked activity
		var activities = model.getParkedActivities();	
	}else{
		var activities = model.getActivitiesOfADay(dayNo);
	}
	
	activity.click({activity:activities[i]}, activityClick);
}