function createLayout(mapData, countiesMap, hospitals, hospitalIDs) {
	console.log(countiesMap.features);
	console.log("here is some data about the svg");
	console.log(mapsvg);
	console.log(mapsvg.style("width"));
	console.log(parseFloat(mapsvg.style("height")));
	
	var width = parseFloat(mapsvg.style("width"));
	var height = parseFloat(mapsvg.style("height"));
    

	
	var g = mapsvg.append("g");
	
	var hospwithcoord = [];
	for (i = 0; i < hospitalIDs.length; i++) {
		hospwithcoord.push({
			ID: hospitals[hospitalIDs[i]].ID,
			zipCode: hospitals[hospitalIDs[i]].zipCode,
			LAT: hospitals[hospitalIDs[i]].LAT,
			LNG: hospitals[hospitalIDs[i]].LNG,
			
		});
	}
	
	
	hospwithcoord = hospwithcoord.filter(function(d)
	{
		if(d.LAT == "undefined" || d.LNG == "undefined")
		{
			return false;
		}
		
		return true;
	});
	
				
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
		//.on("click", stateClick);
		.on("click", function(d) { stateClick(d, g, width, height, countiesMap, hospwithcoord); });
		
				
	g.selectAll(".hospitalcircle")
	.data(hospwithcoord)
	.enter()
		.append("circle")
		.attr("class", "hospitalcircle")
		.attr("cx", function(d) {
               return projection([d.LNG, d.LAT])[0];
		})
		.attr("cy", function(d) {
               return projection([d.LNG, d.LAT])[1];
		})
		.attr("r", 1.5)
		.style("fill", "red")
		.on("mouseover", function(d) {
			d3.select(this).attr("r", 7.5).style("fill", "yellow");
		})                  
		.on("mouseout", function(d) {
			d3.select(this).attr("r", 1.5).style("fill", "red");
		})
		.on("click", hospitalClick);		

		
	/*
	var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        g.attr("transform","translate("+ 
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        g.selectAll("circle")
            .attr("d", path.projection(projection));
        g.selectAll("path")  
            .attr("d", path.projection(projection)); 

	});
	*/
	//mapsvg.call(zoom)		
		
			
}

function stateClick(d, g, width, height, countiesMap, hospwithcoord) {
	console.log("ENTERING STATECLICK");
	
	zoomlevel = "state";

	g.selectAll(".hospitalcircle").remove();
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
			.on("click", function(d) { countyClick(d, g, width, height, countiesMap, hospwithcoord); });
		
		
	g.selectAll(".hospitalcircle")
	.data(hospwithcoord)
	.enter()
		.append("circle")
		.attr("class", "hospitalcircle")
		.attr("cx", function(d) {
               return projection([d.LNG, d.LAT])[0];
		})
		.attr("cy", function(d) {
               return projection([d.LNG, d.LAT])[1];
		})
		.attr("r", 0.6)
		.style("fill", "red")
		.on("mouseover", function(d) {
			d3.select(this).attr("r", 3).style("fill", "yellow");
		})                  
		.on("mouseout", function(d) {
			d3.select(this).attr("r", 0.6).style("fill", "red");
		})
		.on("click", hospitalClick);

	g.transition()
		.duration(500)
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
		.style("stroke-width", 1.5 / k + "px");
			  
		
		
}

function hospitalClick(e) {
	console.log(e);
	
}

function countyClick(d, g, width, height, countiesMap, hospwithcoord) {
	console.log("ENTERING COUNTYCLICK");
	
	var x, y, k;
	var circleradius;
	
	zoomlevel = "county";
	g.selectAll(".hospitalcircle").remove();
	
	
	//if we click a county other than the one that we are currently zoomed in on
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
	
	console.log(zoomlevel);
	if (zoomlevel === "country") {
	g.selectAll(".hospitalcircle")
		.data(hospwithcoord)
		.enter()
			.append("circle")
			.attr("class", "hospitalcircle")
			.attr("cx", function(d) {
				   return projection([d.LNG, d.LAT])[0];
			})
			.attr("cy", function(d) {
				   return projection([d.LNG, d.LAT])[1];
			})
			.attr("r", 1.5)
			.style("fill", "red")
			.on("mouseover", function(d) {
				d3.select(this).attr("r", 7.5).style("fill", "yellow");
			})                  
			.on("mouseout", function(d) {
				d3.select(this).attr("r", 1.5).style("fill", "red");
			})
			.on("click", hospitalClick);
	}
		
	else {
	g.selectAll(".hospitalcircle")
		.data(hospwithcoord)
		.enter()
			.append("circle")
			.attr("class", "hospitalcircle")
			.attr("cx", function(d) {
				   return projection([d.LNG, d.LAT])[0];
			})
			.attr("cy", function(d) {
				   return projection([d.LNG, d.LAT])[1];
			})
			.attr("r", 0.2)
			.style("fill", "red")
			.on("mouseover", function(d) {
				d3.select(this).attr("r", 1).style("fill", "yellow");
			})                  
			.on("mouseout", function(d) {
				d3.select(this).attr("r", 0.2).style("fill", "red");
			})
			.on("click", hospitalClick);
	}

	 
	g.transition()
		.duration(500)
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
		.style("stroke-width", 1.5 / k + "px");	 
	
}