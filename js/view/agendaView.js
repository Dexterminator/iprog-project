//ExampleView Object constructor
var AgendaView = function (container,model,dayNo) {
	this.dayNo = dayNo;
	this.startTime = container.find('#start-time');
	this.endTime = container.find('#end-time');
	this.totalLength = container.find('#total-length');
	this.agendaList = container.find('#agendaList');

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
    	for(var i = 0; i < activities.length; i++){
	    	var actName = activities[i].getName();
			var actType = activities[i].getTypeId();
			var actLength = activities[i].getLength();

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
