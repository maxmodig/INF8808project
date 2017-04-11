function addRighthandPanel(comparisonsvg, hospitals, DRGchoice) {
	
	
	//Frame around the panel
	var frameLineLeft = comparisonsvg.append("line")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", 0)
			.attr("y2", 520)
			.attr("stroke-width", 2)
			.attr("stroke", "black");
				
	var frameLineLeft = comparisonsvg.append("line")
			.attr("x1", 180)
			.attr("y1", 0)
			.attr("x2", 180)
			.attr("y2", 520)
			.attr("stroke-width", 2)
			.attr("stroke", "black");
			
	var frameLineLeft = comparisonsvg.append("line")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", 180)
			.attr("y2", 0)
			.attr("stroke-width", 2)
			.attr("stroke", "black");
			
	var frameLineLeft = comparisonsvg.append("line")
			.attr("x1", 0)
			.attr("y1", 520)
			.attr("x2", 180)
			.attr("y2", 520)
			.attr("stroke-width", 2)
			.attr("stroke", "black");
			
			
	//Text at the top		
	comparisonsvg.append('text').text('Uncovered Charges Comparison')
		.attr('x', 5)
		.attr('y', 18)
		.attr('fill', 'black')
		.attr("font-family", "sans-serif")
		.style("font-weight","bold")
		.attr("font-size", "10px");		
			
	//First blue rectangle with text
	comparisonsvg.append("rect").attr("fill", "blue").style("opacity", 0.5).attr("height", 10).attr("width", 180).attr("y", 30);
	
	comparisonsvg.append('text').text('Diagnosis-Related Group')
		.attr('x', 5)
		.attr('y', 37)
		.attr('fill', 'black')
		.attr("font-family", "sans-serif")
		.style("font-weight","bold")
		.attr("font-size", "8px");
	
	//Second blue rectangle with text
	comparisonsvg.append("rect").attr("fill", "blue").style("opacity", 0.5).attr("height", 10).attr("width", 180).attr("y", 128);
			
	comparisonsvg.append('text').text('Providers Coverage')
			.attr('x', 5)
			.attr('y', 136)
			.attr('fill', 'black')
			.attr("font-family", "sans-serif")
			.style("font-weight","bold")
			.attr("font-size", "8px");
			
	//create array that will hold relevant information about every hospital providing the chosen DRG
	var hospitalWithDRG = [];
	
	//go through all hospitals in our hospitals-object and if it provides the chosen DRG, add information about it to hospitalWithDRG
	for (i = 0; i < hospitalIDs.length; i++) {
		if (hospitals[hospitalIDs[i]].DRGs[DRGchoice]) {
			hospitalWithDRG.push({
				hospitalID: +hospitalIDs[i],
				avgCC: +hospitals[hospitalIDs[i]].DRGs[DRGchoice].avgCC,
				avgMP: +hospitals[hospitalIDs[i]].DRGs[DRGchoice].avgMP,
				avgTP: +hospitals[hospitalIDs[i]].DRGs[DRGchoice].avgTP,
				discharges: +hospitals[hospitalIDs[i]].DRGs[DRGchoice].discharges				
			});
		}
	}
	
	
	var maxCC = 0;
	var maxTP = 0;
	var maxID = 0;
	
	for (i = 0; i < hospitalWithDRG.length; i++) {
		if (+hospitalWithDRG[i].avgCC > +maxCC) {
			maxCC = +hospitalWithDRG[i].avgCC;
			maxID = +hospitalWithDRG[i].hospitalID;
		}
		if (+hospitalWithDRG[i].avgTP > +maxTP) {
			maxTP = +hospitalWithDRG[i].avgTP;
		}
	}
	
	
	//The skeleton for the graph with all the lines
	var yScale = d3.scale.linear()
					.domain([0, maxCC])
					.range([280, 150]);
		
	var leftAxis = comparisonsvg.append("line")
					.attr("x1", 10)
					.attr("y1", 280)
					.attr("x2", 10)
					.attr("y2", 150)
					.attr("stroke-width", 1)
					.attr("stroke", "black");
									
	var rightAxis = comparisonsvg.append("line")
					.attr("x1", 165)
					.attr("y1", 280)
					.attr("x2", 165)
					.attr("y2", 150)
					.attr("stroke-width", 1)
					.attr("stroke", "black");
					
	var bottomAxis = comparisonsvg.append("line")
					.attr("x1", 10)
					.attr("y1", 280)
					.attr("x2", 165)
					.attr("y2", 280)
					.attr("stroke-width", 1)
					.attr("stroke", "black");
	
	//add tick at top of left axis
	comparisonsvg.append("line")
				.attr("x1", 10)
				.attr("y1", 150)
				.attr("x2", 15)
				.attr("y2", 150)
				.attr("stroke-width", 1)
				.attr("stroke", "black");
				
	comparisonsvg.append('text').text("$" + maxCC)
		.attr('x', 16)
		.attr('y', 153)
		.attr('fill', 'black')
		.attr("font-family", "sans-serif")
		.attr("font-size", "6px");
	
	//small text at the bottom of graph with lines
	comparisonsvg.append('text').text("Average").attr('x', 5).attr('y', 290).attr('fill', 'black').attr("font-family", "sans-serif").attr("font-size", "6px");
	comparisonsvg.append('text').text("covered").attr('x', 5).attr('y', 298).attr('fill', 'black').attr("font-family", "sans-serif").attr("font-size", "6px");
	comparisonsvg.append('text').text("charges").attr('x', 5).attr('y', 306).attr('fill', 'black').attr("font-family", "sans-serif").attr("font-size", "6px");
	
	comparisonsvg.append('text').text("Average").attr('x', 152).attr('y', 290).attr('fill', 'black').attr("font-family", "sans-serif").attr("font-size", "6px");
	comparisonsvg.append('text').text("total").attr('x', 152).attr('y', 298).attr('fill', 'black').attr("font-family", "sans-serif").attr("font-size", "6px");
	comparisonsvg.append('text').text("Medicare").attr('x', 152).attr('y', 306).attr('fill', 'black').attr("font-family", "sans-serif").attr("font-size", "6px");
	comparisonsvg.append('text').text("coverage").attr('x', 152).attr('y', 314).attr('fill', 'black').attr("font-family", "sans-serif").attr("font-size", "6px");

	//Create all the lines
	comparisonsvg.selectAll(".hospitalline")
		.data(hospitalWithDRG)
		.enter()
			.append("line")
			.attr("opacity", 1)
			.attr("class", "hospitalline")
			.attr("x1", 10)
			.attr("id", function(d) { return "hospitalline" + d.hospitalID; })
			.attr("y1", function(d) { return yScale(d.avgCC); })
			.attr("x2", 165)
			.attr("y2", function(d) { return yScale(d.avgTP); })
			.attr("stroke-width", 0.02)
			.attr("stroke", "red")
			.style("opacity", 2)
			.on("click", function(d) { hospitalClick(parseInt(d.hospitalID), hospitals); });
	
	
	//PANEL FOR BEST COVERAGE
	var bestCoverage = [];
	bestCoverage[1] = 0;
	
	console.log(hospitalWithDRG);
	
	
	for (i = 0; i < hospitalWithDRG.length; i++) {
		if ((hospitalWithDRG[i].avgTP / hospitalWithDRG[i].avgCC) > bestCoverage[1]) {
			bestCoverage[0] = +hospitalWithDRG[i].hospitalID;
			bestCoverage[1] = +(hospitalWithDRG[i].avgTP / hospitalWithDRG[i].avgCC);
		}
	}
	
	var bMCpercentage = bestCoverage[1] * 100;
	
	comparisonsvg.append("rect").attr("fill", "blue").style("opacity", 0.5).attr("height", 10).attr("width", 180).attr("y", 325);
	
	comparisonsvg.append('text').text('Best Coverage')
		.attr('x', 5)
		.attr('y', 333)
		.attr('fill', 'black')
		.attr("font-family", "sans-serif")
		.style("font-weight","bold")
		.attr("font-size", "8px");
		
	comparisonsvg.append('text').text(hospitals[bestCoverage[0]].name)
			.attr('x', 5)
			.attr('y', 345)
			.attr('fill', 'green')
			.attr("font-family", "sans-serif")
			.style("font-weight","bold")
			.attr("font-size", "7px");
	
	comparisonsvg.append('text').text("Average total medicare coverage: " + bMCpercentage.toFixed(2) + "%")
				.attr('x', 25)
				.attr('y', 357)
				.attr('fill', 'black')
				.attr("font-family", "sans-serif")
				.attr("font-size", "7px");
			
	//add rectangles for the provider with the best coverage
	comparisonsvg.append("rect")
				.attr("fill", "green")
				.attr("height", 30)
				.attr("width", function (d) {if (bestCoverage[1] > 1) return 160; else return bestCoverage[1] * 160; })
				.attr("y", 365)
				.attr("x", 10)
				.on("click", function(d) { clickedRectangle(bestCoverage[0]) });
	
	comparisonsvg.append("rect")
				.attr("fill", "red")
				.attr("height", 30)
				.attr("width", 160 - bestCoverage[1] * 160)
				.attr("y", 365)
				.attr("x", 10 + bestCoverage[1] * 160)
				.on("click", function(d) { clickedRectangle(bestCoverage[0]) });
				
				
	comparisonsvg.append('text').text("Average covered charges: $" + hospitals[bestCoverage[0]].DRGs[DRGchoice].avgCC)
				.attr('x', 25)
				.attr('y', 382)
				.attr('fill', 'black')
				.attr("font-family", "sans-serif")
				.style("font-weight","bold")
				.attr("font-size", "7px");
	
	comparisonsvg.append('text').text("* Out of " + hospitals[bestCoverage[0]].DRGs[DRGchoice].discharges + " discharges")
				.attr('x', 90)
				.attr('y', 405)
				.attr('fill', 'black')
				.attr("font-family", "sans-serif")
				.attr("font-size", "7px");					
	
	
	
	
	
	
	
	
	//PANEL FOR WORST COVERAGE
	var worstCoverage = bestCoverage.slice();
	
	for (i = 0; i < hospitalWithDRG.length; i++) {
		if ((hospitalWithDRG[i].avgTP / hospitalWithDRG[i].avgCC) < worstCoverage[1]) {
			worstCoverage[0] = hospitalWithDRG[i].hospitalID;
			worstCoverage[1] = (hospitalWithDRG[i].avgTP / hospitalWithDRG[i].avgCC);
		}
	}
		var wMCpercentage = worstCoverage[1] * 100;
	
	comparisonsvg.append("rect").attr("fill", "blue").style("opacity", 0.5).attr("height", 10).attr("width", 180).attr("y", 420);
	
	comparisonsvg.append('text').text('Worst Coverage')
		.attr('x', 5)
		.attr('y', 428)
		.attr('fill', 'black')
		.attr("font-family", "sans-serif")
		.style("font-weight","bold")
		.attr("font-size", "8px");	
		
	comparisonsvg.append('text').text(hospitals[worstCoverage[0]].name)
			.attr('x', 5)
			.attr('y', 440)
			.attr('fill', 'red')
			.attr("font-family", "sans-serif")
			.style("font-weight","bold")
			.attr("font-size", "8px");		
	
	comparisonsvg.append('text').text("Average total medicare coverage: " + wMCpercentage.toFixed(2) + "%")
			.attr('x', 25)
			.attr('y', 452)
			.attr('fill', 'black')
			.attr("font-family", "sans-serif")
			.attr("font-size", "7px");
	

	//add rectangles for the provider with the worst coverage
	
	comparisonsvg.append("rect")
				.attr("fill", "green")
				.attr("height", 30)
				.attr("width", worstCoverage[1] * 160)
				.attr("y", 460)
				.attr("x", 10)
				.on("click", function(d) { clickedRectangle(worstCoverage[0]) });
	
	comparisonsvg.append("rect")
				.attr("fill", "red")
				.attr("height", 30)
				.attr("width", 160 - worstCoverage[1] * 160)
				.attr("y", 460)
				.attr("x", 10 + worstCoverage[1] * 160)
				.on("click", function(d) { clickedRectangle(worstCoverage[0]) });
								
	comparisonsvg.append('text').text("Average covered charges: $" + hospitals[worstCoverage[0]].DRGs[DRGchoice].avgCC)
				.attr('x', 25)
				.attr('y', 477)
				.attr('fill', 'black')
				.attr("font-family", "sans-serif")
				.style("font-weight","bold")
				.attr("font-size", "7px");
	
	comparisonsvg.append('text').text("* Out of " + hospitals[worstCoverage[0]].DRGs[DRGchoice].discharges + " discharges")
				.attr('x', 90)
				.attr('y', 500)
				.attr('fill', 'black')
				.attr("font-family", "sans-serif")
				.attr("font-size", "7px");				

}

function emptyRighthandPanel() {
		//Frame around the panel
	var frameLineLeft = comparisonsvg.append("line")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", 0)
			.attr("y2", 520)
			.attr("stroke-width", 2)
			.attr("stroke", "black");
				
	var frameLineLeft = comparisonsvg.append("line")
			.attr("x1", 180)
			.attr("y1", 0)
			.attr("x2", 180)
			.attr("y2", 520)
			.attr("stroke-width", 2)
			.attr("stroke", "black");
			
	var frameLineLeft = comparisonsvg.append("line")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", 180)
			.attr("y2", 0)
			.attr("stroke-width", 2)
			.attr("stroke", "black");
			
	var frameLineLeft = comparisonsvg.append("line")
			.attr("x1", 0)
			.attr("y1", 520)
			.attr("x2", 180)
			.attr("y2", 520)
			.attr("stroke-width", 2)
			.attr("stroke", "black");
			
			
	//Text at the top		
	comparisonsvg.append('text').text('Uncovered Charges Comparison')
		.attr('x', 5)
		.attr('y', 18)
		.attr('fill', 'black')
		.attr("font-family", "sans-serif")
		.style("font-weight","bold")
		.attr("font-size", "10px");		
			
	//First blue rectangle with text
	comparisonsvg.append("rect").attr("fill", "blue").style("opacity", 0.5).attr("height", 10).attr("width", 180).attr("y", 30);
	
	comparisonsvg.append('text').text('Diagnosis-Related Group')
		.attr('x', 5)
		.attr('y', 37)
		.attr('fill', 'black')
		.attr("font-family", "sans-serif")
		.style("font-weight","bold")
		.attr("font-size", "8px");
	
	//Second blue rectangle with text
	comparisonsvg.append("rect").attr("fill", "blue").style("opacity", 0.5).attr("height", 10).attr("width", 180).attr("y", 128);
			
	comparisonsvg.append('text').text('Providers Coverage')
			.attr('x', 5)
			.attr('y', 136)
			.attr('fill', 'black')
			.attr("font-family", "sans-serif")
			.style("font-weight","bold")
			.attr("font-size", "8px");
			
	
	
	
	
	

	
	comparisonsvg.append("rect").attr("fill", "blue").style("opacity", 0.5).attr("height", 10).attr("width", 180).attr("y", 325);
	
	comparisonsvg.append('text').text('Best Coverage')
		.attr('x', 5)
		.attr('y', 333)
		.attr('fill', 'black')
		.attr("font-family", "sans-serif")
		.style("font-weight","bold")
		.attr("font-size", "8px");
		

	
	
	comparisonsvg.append("rect").attr("fill", "blue").style("opacity", 0.5).attr("height", 10).attr("width", 180).attr("y", 420);
	
	comparisonsvg.append('text').text('Worst Coverage')
		.attr('x', 5)
		.attr('y', 428)
		.attr('fill', 'black')
		.attr("font-family", "sans-serif")
		.style("font-weight","bold")
		.attr("font-size", "8px");	
		
	
				
}

function clickedRectangle(e) {
	//console.log(e);
	var circleradius;
	var currentcolor;
	//var currentcolor = d3.select("#hospitalcircle" + e).style("fill");
	//console.log(currentcolor);
	
	if (zoomlevel == "country") {
		circleradius = 1.5;
	}
	else if (zoomlevel == "state") {
		circleradius = 0.6;
	}	
	else {
		circleradius = 0.2;
	}
	
	if (markedHospitals.indexOf(parseInt(e)) !== -1) {
		circleradius = +circleradius * 2.5;
		currentcolor = "green";
	}
	else {
		currentcolor = "red";
	}
	
	
	console.log(markedHospitals);
									

	if (currentcolor === "rgb(255, 0, 0)") {
		console.log("the circle is red");
		d3.select("#hospitalcircle" + e).transition().duration(2000).attr("r", circleradius * 25).style("fill", "yellow").transition().duration(100).attr("r", circleradius).style("fill", "red");
	}
	else {
		console.log("the circle is green");
		d3.select("#hospitalcircle" + e).transition().duration(2000).attr("r", circleradius * 25).style("fill", "yellow").transition().duration(100).attr("r", circleradius).style("fill", "green");
	}
}
