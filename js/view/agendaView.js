//ExampleView Object constructor
var AgendaView = function (container,model,dayNo) {
	this.dayNo = dayNo;
	this.startTime = container.find('#start-time');
	this.endTime = container.find('#end-time');
	this.totalLength = container.find('#total-length');
	this.agendaList = container.find('#agendaList');
	this.ratioBox = container.find('#ratioBox');

	this.agendaList.html("");

	this.agendaColumn = container.find("#agenda-column");

	var actRow;

	this.startTime.val(model.days[dayNo].getStart());
	this.endTime.html(model.days[dayNo].getEnd());
	this.totalLength.html(model.days[dayNo].getTotalLength());

	//Register an observer to the model
	model.addObserver(this);

	this.timeString = function(minutes) {
		var hour = Math.floor(minutes/60);
		if(hour < 10){
			hour = "0" + hour;
		}
		minutes = minutes % 60;
		if(minutes < 10){
			minutes = "0" + minutes;
		}
		return hour + ":" + minutes;
	}

	this.generateActivities = function(){
		activities = model.getActivitiesOfADay(dayNo);

		var currStart = model.days[dayNo].getStart();
		var currStartMin = model.days[dayNo].getMinStart();
		// Counters to keep track of ratio
		var breaks = 0;
		var presentations = 0;
		var groupWorks = 0;
		var discussions = 0;
    	for(var i = 0; i < activities.length; i++){
	    	var actName = activities[i].getName();
			var actType = activities[i].getTypeId();
			var actLength = activities[i].getLength();

			// Set correct activity type and increment counters
			if (actType == "Presentation") {
				actType = "activity-presentation";
				presentations += actLength;
			} else if (actType == "Group Work") {
				actType = "activity-groupwork"
				groupWorks += actLength;
			} else if (actType == "Discussion") {
				actType = "activity-discussion";
				discussions += actLength;
			} else if (actType == "Break") {
				actType = "activity-break";
				breaks += actLength;
			}

			actRow = $("<div>").addClass("row activity activity-"+i);

			actTimeCol = $("<div>").addClass("col-md-3 col-md-offset-1");

			act = $("<div>").addClass("activity-time").html(currStart);
			actTimeCol.append(act);

			actNameCol = $("<div>").addClass("col-md-8");
			act = $("<div>").addClass(actType).html(actName);
			actNameCol.append(act);

			actRow.append(actTimeCol);
			actRow.append(actNameCol);
			var li = $("<li>");
			li.html(actRow);
			li.attr('id', dayNo + "-" + i);
			this.agendaList.append(li);

			currStartMin += actLength;
			currStart = this.timeString(currStartMin);
    	}
    	// Calculate ratios in percent
    	var dayLength = model.days[dayNo].getTotalLength();
    	var presRatio = parseFloat(presentations / dayLength) * 100;
    	var groupRatio = parseFloat(groupWorks / dayLength) * 100;
    	var discRatio = parseFloat(discussions / dayLength) * 100;
    	var breakRatio = parseFloat(breaks / dayLength) * 100;
    	// Show the ratios of activities in ratio box using the attr function as css() overrides itself 
    	//when called multiple times or with multiple values for same property
    	var css = "";
    	if(presRatio != 0){
    		css = css + "#5E9FA3, #5E9FA3 "+presRatio+"%"
    	}
    	if(discRatio != 0){
    		if(presRatio != 0){
    			css = css + ", ";
    		}
    		css = css + "#FAB87F, #FAB87F "+(discRatio+presRatio)+"%"
    	}

    	if(breakRatio != 0){
    		if(presRatio != 0 || discRatio != 0 || groupRatio != 0){
    			css = css + ", ";
    		}
    		css = css + "#B05574, #B05574 "+(discRatio+presRatio+breakRatio)+"%"
    	}
    	if(groupRatio != 0){
    		if(presRatio != 0 || discRatio != 0){
    			css = css + ", ";
    		}
    		css = css + "#F87E7B, #F87E7B "+(groupRatio+discRatio+presRatio)+"%"
    	}
    	console.log(presRatio);
    	this.ratioBox
    		.attr('style', "background-image: -webkit-linear-gradient(top, "+css+");"+
    			"background-image: -moz-linear-gradient(top, "+css+")");

    }

    this.generateActivities();
	
	//This function gets called when there is a change at the model
	this.update = function(arg){
		this.startTime.html(model.days[dayNo].getStart());
		this.endTime.html(model.days[dayNo].getEnd());
		this.totalLength.html(model.days[dayNo].getTotalLength());

		//TODO: update the agenda column as well.
		this.agendaList.html("");
		this.generateActivities();

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
