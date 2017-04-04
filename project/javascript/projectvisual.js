function createLayout(mapData, hospitals, hospitalIDs) {
	
	var group = mapsvg.selectAll("g")
		.data(mapData.features)
		.enter()
		.append("g");

	var projection = d3.geo.albersUsa()
					.scale(1070);//.translate([0,1980]);
	var path = d3.geo.path().projection(projection);

	var areas = group.append("path")
		.attr("d", path)
		.attr("class", "area")
		.attr("fill", "none")
		.style('stroke', 'black')
		.style('stroke-width', 0.5);
			

	var hospwithcoord = [];
	for (i = 0; i < hospitalIDs.length; i++) {
		hospwithcoord.push({
			ID: hospitals[hospitalIDs[i]].ID,
			zipCode: hospitals[hospitalIDs[i]].zipCode,
			LAT: hospitals[hospitalIDs[i]].LAT,
			LNG: hospitals[hospitalIDs[i]].LNG
		});
	}
	//console.log(hospwithcoord);
	
	hospwithcoord = hospwithcoord.filter(function(d)
	{
		if(d.LAT == "undefined" || d.LNG == "undefined")
		{
			return false;
		}
		
		return true;
	});
	
	mapsvg.selectAll(".circle")
		.data(hospwithcoord)
		.enter()
			.append("circle")
			.attr("r", 3)
			.style("fill", "red")
			.attr("transform", function(d) { return "translate(" + projection([d.LNG, d.LAT]) + ")";})
			.on("click", clickFunction);	
}

function clickFunction(e) {	
		//console.log(this);
		//console.log(e);
}