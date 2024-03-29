$(function() {
	//Create test data for

	var model = new Model();
	window.model = model;
	createTestData(model);
	//Instantiate the views
	var agendaViews = [];
	var dayNo = 0;
	var newAgendaView = document.getElementById("agendaView").cloneNode(true);

	var agendaView = new AgendaView($("#agendaView"), model, dayNo);
	var agendaViewController = new AgendaViewController(agendaView, model, dayNo);
	agendaViews.push(agendaView);

	var formView = new FormView($("#formView"), model);
	var formViewController = new FormViewController(formView, model);

	var addDayView = new AddDayView($("#addDayView"), model, dayNo);
	var addDayViewController = new AddDayViewController(addDayView, model);

	var addActivitiesView = new AddActivitiesView($("#addActivitiesView"), model);
	var addActivitiesViewController = new AddActivitiesViewController(addActivitiesView, model);

	window.addDay = function(){
		dayNo++;
		model.addDay();
		
		var newAgendaView = document.getElementById("agendaView").cloneNode(true);
		newAgendaView.id = "agendaView" + dayNo;
		var before = document.getElementById("placeholder");
		var container = document.getElementById("containerRow");
		container.insertBefore(newAgendaView,before);

		var agendaView = new AgendaView($("#agendaView" + dayNo), model, dayNo);
		var agendaViewController = new AgendaViewController(agendaView, model, dayNo);
		agendaViews.push(agendaView);
		//Test if the day was added by alerting end time of each day
	}

	//This is where all navigation logic will go.
	window.showForm = function(activity){
		formView.makeVisible(activity);
	}

	window.hideForm = function(){
		formView.makeHidden();
	}
});