var AddActivitiesView = function (container,model) {
	this.addActivityButton = container.find("#addActivityButton");
	this.addActivitiesColumn = container.find("#addActivitiesColumn");
	this.parkedActivitiesList = container.find("#parkedActivitiesList");

	model.addObserver(this);

	// Generates HTML for the activities that are listed in the parked activities column
	this.generateParkedActivitiesHTML = function () {
		parkedActivities = model.getParkedActivities();

		for(var i = 0; i < parkedActivities.length; i++) {
			var actName = parkedActivities[i].getName();
			var actType = parkedActivities[i].getTypeId();
			var actLength = parkedActivities[i].getLength();

			if (actType == "Presentation") {
				actType = "activity-presentation";
			} else if (actType == "Group Work") {
				actType = "activity-groupwork"
			} else if (actType == "Discussion") {
				actType = "activity-discussion";
			} else if (actType == "Break") {
				actType = "activity-break";
			}

	        var li = $("<li>");
			actRow = $("<div>").addClass("row");
			actLenCol = $("<div>").addClass("col-md-4 col-md-offset-1");
			actLenDisplay = $("<div>").addClass("activity-time").html(actLength + " min");

			actTypeCol = $("<div>").addClass("col-md-7");
			actDisplay = $("<div>").addClass(actType).html(actName);

			actLenCol.append(actLenDisplay);
			actTypeCol.append(actDisplay);
			actRow.append(actLenCol);
			actRow.append(actTypeCol);
			
			li.html(actRow);
			li.attr('id', 'null' + "-" + i);
			this.parkedActivitiesList.append(li);
		}
	}

	this.generateParkedActivitiesHTML();

	//This function gets called when there is a change at the model
	this.update = function(arg){
		if (this.parkedActivitiesList != null) {
			this.parkedActivitiesList.html("");
		}
		
		this.generateParkedActivitiesHTML();
	}

	this.makeHidden = function(){
		container.fadeOut(0, function() {
			//Animation complete
		});
	}

	this.makeVisible = function(){
		container.fadeIn(100, function() {
			//Animation complete
		});
	}
}