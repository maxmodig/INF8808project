function createLayout(mapData, countiesMap, hospitals, hospwithcoord) {
	
	var width = parseFloat(mapsvg.style("width"));
	var height = parseFloat(mapsvg.style("height"));
    		
	g.selectAll("statepath")
		.data(mapData.features)
		.enter()
		.append("path")
		.attr("d", path)
		.attr("class", "area")
		.attr("fill", "blue")
		//.attr("id", function(d) { console.log("state" + parseInt(d.properties.STATE)); })//return d.id; })
		.attr('opacity', 0.5)
		.style('stroke', 'black')
		.style('stroke-width', 0.5)
		.on("mouseover", function(d) {
			d3.select(this).attr('opacity', 1);
		})                  
		.on("mouseout", function(d) {
		  d3.select(this).attr('opacity', 0.5);
		})
		.on("click", function(d) { stateClick(d, width, height, countiesMap, hospwithcoord, hospitals); });
		
	createHospitalCircles(hospwithcoord, hospitals);
	
	

		
	/*  un-comment this to be able to zoom with the mousewheel. I think we have too much data to do that, it lags too much
	var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        g.attr("transform","translate("+ 
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        g.selectAll("circle")
            .attr("d", path.projection(projection));
        g.selectAll("path")  
            .attr("d", path.projection(projection)); 

	});
	
	mapsvg.call(zoom)		
	*/	
			
}

function stateClick(d, width, height, countiesMap, hospwithcoord, hospitals) {
	console.log("ENTERING STATECLICK");
	
	zoomlevel = "state";

	
	g.selectAll(".countypath").remove();

	var x, y, k;
	var circleradius;
	
	var centroid = path.centroid(d);

	x = centroid[0];
	y = centroid[1];
	k = 4;
	centered = d.properties.STATE;
	circleradius = 1;

		 	
	//create an array with features only from the counties in the state that we have selected
	var selectedCounties = [];	
	for (i = 0; i < countiesMap.features.length; i++) {
		if (countiesMap.features[i].properties.STATE == d.properties.STATE)
			selectedCounties.push(countiesMap.features[i]);
	}
		
	console.log("here are our selected counties");
	console.log(selectedCounties);
	
	g.selectAll("countypath")
		.data(selectedCounties)
		.enter()
			.append("path")
			.attr("d", path)
			.attr("fill", "blue")
			.attr("class", "countypath")
			.style('stroke', 'black')
			.style('stroke-width', 0.2)
			.attr('opacity', 0.5)
			.on("mouseover", function(d) {
				d3.select(this).attr('opacity', 1);
			})                  
			.on("mouseout", function(d) {
			  d3.select(this).attr('opacity', 0.5);
			})
			.on("click", function(d) { countyClick(d, width, height, countiesMap, hospwithcoord, hospitals); });
		
	createHospitalCircles(hospwithcoord, hospitals);	
	
	g.transition()
		.duration(500)
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
		.style("stroke-width", 1.5 / k + "px");		
}



function countyClick(d, width, height, countiesMap, hospwithcoord, hospitals) {
	console.log("ENTERING COUNTYCLICK");
	
	var x, y, k;
	var circleradius;
	
	zoomlevel = "county";
	
	
	//if we click a county other than the one that we are currently zoomed in on, we change focus to that
	if (centeredCounty !== d.properties.COUNTY) {
		console.log("we enter the if"); 
		var centroid = path.centroid(d);
		console.log("here is centroid");
		console.log(centroid);
		x = centroid[0];
		y = centroid[1];
		k = 18;
		centeredCounty = d.properties.COUNTY;
		circleradius = 1;
	} else { //if we clicked the same county as the one that is currently zoomed in on, then we zoom out to see the whole country again
		console.log("we enter the else");
		x = width / 2;
		y = height / 2;
		k = 1;
		centered = null;
		circleradius = 1;
		g.selectAll(".countypath").remove();
		zoomlevel = "country";
	}
	
	
	createHospitalCircles(hospwithcoord, hospitals);
	
	console.log(zoomlevel);
	 
	g.transition()
		.duration(500)
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
		.style("stroke-width", 1.5 / k + "px");	 
	
}

function createHospitalCircles(hospwithcoord, hospitals) {
	g.selectAll(".hospitalcircle").remove();
	
	
	
	//console.log(d3.select("select").property("value"));
	//console.log("We have chosen another DRG in the menu: " + d3.select("select").property("value") + " aka " + parseInt(d3.select("select").property("value")));
	
	
	var hospitalsToShow = [];
	
	if (d3.select("select").property("value") === "All DRGs") {
		hospitalsToShow = hospwithcoord;
	}
	else {
		for (i = 0; i < hospwithcoord.length; i++) {
			if (hospitals[hospwithcoord[i].ID].DRGs[parseInt(d3.select("select").property("value"))]) {
				hospitalsToShow.push(hospwithcoord[i]);
			}
		}
	}
	
	console.log("we are displaying " + hospitalsToShow.length + " out of " + hospwithcoord.length + " hospitals");
	

	
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
	console.log("here is hospitalsToShow");
	console.log(hospitalsToShow);
	g.selectAll(".hospitalcircle")
		.data(hospitalsToShow)
		.enter()
			.append("circle")
			.attr("class", "hospitalcircle")
			.attr("id", function(d) { return "hospitalcircle" + d.ID; })
			.attr("cx", function(d) {
				   return projection([d.LNG, d.LAT])[0];
			})
			.attr("cy", function(d) {
				   return projection([d.LNG, d.LAT])[1];
			})
			.attr("r", function(d) {if (markedHospitals.indexOf(parseInt(d.ID)) === -1) {
											return circleradius;
										}
										else {
											return circleradius * 2.5;
										}		
			})
			.style("fill", function(d) {if (markedHospitals.indexOf(parseInt(d.ID)) === -1) {
											return "red";
										}
										else {
											return "green";
										}		
			})
			.on("mouseover", function(d) {
				d3.select(this).attr("r", circleradius * 5).style("fill", "yellow");
			})                  
			.on("mouseout", function(d) {if (markedHospitals.indexOf(parseInt(d.ID)) === -1) {
											d3.select(this).attr("r", circleradius).style("fill", "red");
										}
										else {
											d3.select(this).attr("r", (circleradius * 2.5)).style("fill", "green");
										}		
			})
			.on("click", function(d) { hospitalClick(parseInt(d.ID), hospitals); });
			
	console.log("Look at all these circles!");
	console.log(g.selectAll(".hospitalcircle"));
		
}


function hospitalClick(clickedID, hospitals) {
	console.log("entering hospitalClick");
	console.log(clickedID);
	
	bottomsvg.selectAll("svg > *").remove();
	
	if (markedHospitals.indexOf(clickedID) === -1) {
		console.log("adding " + clickedID + " to the array");
		markedHospitals.push(clickedID);
	}
	else {
		console.log("removing " + clickedID + " from the array");
		markedHospitals.splice(markedHospitals.indexOf(clickedID), 1);
	}
	
	
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
	
	if (markedHospitals.indexOf(clickedID) === -1) {
		d3.select("#hospitalline" + clickedID).attr("stroke-width", 0.02).attr("stroke", "red");
		d3.select("#hospitalcircle" + clickedID).style("fill", "red").attr("r", circleradius);
	}
	else {
		d3.select("#hospitalline" + clickedID).attr("stroke-width", 1).attr("stroke", "green");
		d3.select("#hospitalcircle" + clickedID).style("fill", "green").attr("r", circleradius * 2.5);
	}	
	
	
	
		
	//the bottom panel displays information about the last hospital that was added to the array (and that hasnt been removed)
	//for example, we choose in order: a, b, c, d, e. It will display information for each of them until the next one is added.
	//then we remove b and d. now it still displays info for e. Then we remove e, and it will display info for c
	
	if (markedHospitals.length > 0) {
		addBottomPanel(bottomsvg, hospitals, markedHospitals[markedHospitals.length - 1])
	}
	else {
		emptyBottomPanel()
	}
	
}