$(function() {
	//Create test data for

	var model = new Model();
	createTestData(model);
	//Instantiate the views
	var agendaView = new AgendaView($("#agendaView"), model, 0);
	var agendaViewController = new AgendaViewController(agendaView, model);

	//This is where all navigation logic will go.

});