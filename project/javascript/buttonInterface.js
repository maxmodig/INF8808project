

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

function moveButtons() {
	var hello = document.getElementById('drg');
	hello.style.position = "absolute";
	hello.style.left = 1200+'px';
	hello.style.top = 142+'px';
	
	var hello = document.getElementById('display');
	hello.style.position = "absolute";
	hello.style.left = 1172+'px';
	hello.style.top = 165+'px';
	
	var hello = document.getElementById('reset');
	hello.style.position = "absolute";
	hello.style.left = 1200+'px';
	hello.style.top = 192+'px';
}




function displayFunction() {
	//var displaying = "all" or "selected"
	//console.log(this);
	//console.log(e);
	
	console.log(displaying);
	console.log(comparisonsvg.selectAll(".hospitalline"));
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
						/*											
		comparisonsvg.selectAll(".hospitalline").attr("opacity", function(d) { if (markedHospitals.indexOf(parseInt(d.hospitalID)) === -1) {
																			return 0;
																		}
																	else {
																			return 1;
																	}});	*/												
		displaying = "selected";
		d3.select("#display").text("Show all hospitals");
	}
	else {
		g.selectAll(".hospitalcircle").attr("opacity", 1);
		
		comparisonsvg.selectAll(".hospitalline").attr("stroke-width", function(d) { if (markedHospitals.indexOf(parseInt(d.hospitalID)) === -1) {
																			return 0.02;
																		}
																	else {
																			return 1;
																	}});
		//comparisonsvg.selectAll(".hospitalline").attr("opacity", 1);
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