//ExampleView Object constructor
var AgendaView = function (container,model,dayNo) {
	this.startTime = container.find('#start-time');
	this.endTime = container.find('#end-time');
	this.totalLength = container.find('#total-length');

	this.agendaColumn = container.find("#agenda-column");

	this.startTime.html(model.days[dayNo].getStart());
	this.endTime.html(model.days[dayNo].getEnd());
	this.totalLength.html(model.days[dayNo].getTotalLength());


	//Register an observer to the model
	model.addObserver(this);
	
	//This function gets called when there is a change at the model
	this.update = function(arg){
		this.startTime.html(model.days[dayNo].getStart());
		this.endTime.html(model.days[dayNo].getEnd());
		this.totalLength.html(model.days[dayNo].getTotalLength());

		//TODO: update the agenda column as well.

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
 
