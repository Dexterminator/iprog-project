var AddActivitiesView = function (container,model) {
	this.addActivityButton = container.find("#addActivityButton");
	this.addActivitiesContainer = container.find("#addActivitiesContainer");

	var activityCol = $("<div>").addClass("activity-column");
	var colText = $("<p>").html("Column for activities");
	activityCol.append(colText);
	this.addActivitiesContainer.append(activityCol);

	model.addObserver(this);

	//This function gets called when there is a change at the model
	this.update = function(arg){
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