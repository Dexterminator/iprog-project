var AddActivitiesView = function (container,model) {
	this.addActivityButton = container.find("#addActivityButton");
	this.addActivitiesColumn = container.find("#addActivitiesColumn");
	this.parkedActivitiesList = container.find("#parkedActivitiesList");
	var actRow;
	// This section should populate the activities column dynamically.
	// var colText = $("<p>").html("Column for activities");
	// this.addActivitiesColumn.append(colText);

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

			actRow = $("<div>").addClass("row");
			actCol = $("<div>").addClass("col-md-8");
			act = $("<div>").addClass(actType).html(actName + " (" + actLength + " min)");

			actCol.append(act);
			actRow.append(actCol);
			var li = $("<li>");
			li.html(actRow);
			this.parkedActivitiesList.append(li);
			// this.addActivitiesColumn.append(actRow);
		}
	}

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