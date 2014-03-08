var AddActivitiesView = function (container,model) {
	this.addActivityButton = container.find("#addActivityButton");
	this.addActivitiesColumn = container.find("#addActivitiesColumn");

	// This section should populate the activities column dynamically.
	// var colText = $("<p>").html("Column for activities");
	// this.addActivitiesColumn.append(colText);

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