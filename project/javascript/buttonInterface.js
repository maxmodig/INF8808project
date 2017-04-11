
//adds the DRGs to the dropdown menu
function menuItems() {
	var optionsList = [];
	optionsList.push("All DRGs");
	for (i = 0; i < DRGlist.length; i++) {
		optionsList.push(DRGlist[i]);
	}
	
	
	d3.select("select").selectAll("option")
		.data(optionsList)
		.enter()
		.append("option")
		.text(function(d) {
			return d;
	})
}

//previously used to move the dropdown menu and buttons
function moveButtons() {
	var moveit = document.getElementById('drg');
	moveit.style.position = "absolute";
	moveit.style.left = 1200+'px';
	moveit.style.top = 142+'px';
	
	var moveit = document.getElementById('display');
	moveit.style.position = "absolute";
	moveit.style.left = 1172+'px';
	moveit.style.top = 165+'px';
	
	var moveit = document.getElementById('reset');
	moveit.style.position = "absolute";
	moveit.style.left = 1200+'px';
	moveit.style.top = 192+'px';
}




function displayFunction() {
	//displaying = "all" or "selected"
	
	
	//if we are currently displaying all hospitals, then display only the ones we have selected
	if (displaying === "all") {
		g.selectAll(".hospitalcircle").attr("opacity", function(d) { if (markedHospitals.indexOf(parseInt(d.ID)) === -1) {
																			return 0;
																		}
																	else {
																			return 1;
																	}});
																	
		comparisonsvg.selectAll(".hospitalline").attr("stroke-width", function(d) { if (markedHospitals.indexOf(parseInt(d.hospitalID)) === -1) {
																			return 0;
																		}
																	else {
																			return 1;
																	}});
													
		displaying = "selected";
		d3.select("#display").text("Show all hospitals");
	}
	//if we are currently displaying only the selected hospitals, then display all hospitals
	else {
		g.selectAll(".hospitalcircle").attr("opacity", 1);
		
		comparisonsvg.selectAll(".hospitalline").attr("stroke-width", function(d) { if (markedHospitals.indexOf(parseInt(d.hospitalID)) === -1) {
																			return 0.02;
																		}
																	else {
																			return 1;
																	}});

		displaying = "all";
		d3.select("#display").text("Show marked hospitals");
	}
}

function resetFunction() {
	
	var circleradius;
		
	if (zoomlevel == "country") {
		circleradius = 1.5;
	}
	else if (zoomlevel == "state") {
		circleradius = 0.6;
	}	
	else {
		circleradius = 0.2;
	}	
	g.selectAll(".hospitalcircle").style("fill", "red").attr("r", circleradius).attr("opacity", 1);
	d3.selectAll(".hospitalline").attr("stroke-width", 0.02).attr("stroke", "red");
	
	bottomsvg.selectAll("svg > *").remove();
	emptyBottomPanel();
	markedHospitals = [];
	displaying = "all";
	d3.select("#display").text("Show marked hospitals");
	
}