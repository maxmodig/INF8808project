//everything below here is just testing
	
	
function addRighthandPanel(comparisonsvg, hospitals, hospitalIDs) {
		
	//DRG that is chosen
	var DRGchoice = 39;
	
	console.log("now hospitals looks like this");
	console.log(hospitals);
	
	var DRGsvg = comparisonsvg.append("svg").attr("width", 180).attr("height", 100);
	var providerssvg = comparisonsvg.append("svg").attr("width", 180).attr("height", 700).attr("y", 70);
	
	DRGsvg.append("rect").attr("fill", "blue").style("opacity", 0.5).attr("height", 10).attr("width", 180).attr("y", 30);
	providerssvg.append("rect").attr("fill", "blue").style("opacity", 0.5).attr("height", 10).attr("width", 180);
			
	DRGsvg.append('text').text('Uncovered Charges Comparison')
			.attr('x', 5)
			.attr('y', 7)
			.attr('fill', 'black')
			.attr("font-family", "sans-serif")
			.style("font-weight","bold")
			.attr("font-size", "9px");
	
	DRGsvg.append('text').text('Diagnosis-Related Group')
			.attr('x', 5)
			.attr('y', 38)
			.attr('fill', 'black')
			.attr("font-family", "sans-serif")
			.style("font-weight","bold")
			.attr("font-size", "8px");
	
	providerssvg.append('text').text('Providers Coverage')
			.attr('x', 5)
			.attr('y', 8)
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
	
	console.log("here is data for the hospitals that provide DRG " + DRGchoice);
	console.log(hospitalWithDRG);
	
	var maxCC = 0;
	var maxMP = 0;
	var maxID = 0;
	
	for (i = 0; i < hospitalWithDRG.length; i++) {
		if (+hospitalWithDRG[i].avgCC > +maxCC) {
			maxCC = +hospitalWithDRG[i].avgCC;
			maxID = +hospitalWithDRG[i].hospitalID;
		}
		if (+hospitalWithDRG[i].avgMP > +maxMP) {
			maxMP = +hospitalWithDRG[i].avgMP;
		}
	}
	
	console.log("the maximum covered charges is " + maxCC + " at hospital with ID " + maxID);
		
	var yScale = d3.scale.linear()
					.domain([0, maxCC])
					.range([150, 20]);
		
	var leftAxis = providerssvg.append("line")
					.attr("x1", 10)
					.attr("y1", 150)
					.attr("x2", 10)
					.attr("y2", 20)
					.attr("stroke-width", 1)
					.attr("stroke", "black");
									
	var rightAxis = providerssvg.append("line")
					.attr("x1", 165)
					.attr("y1", 150)
					.attr("x2", 165)
					.attr("y2", 20)
					.attr("stroke-width", 1)
					.attr("stroke", "black");
					
	var bottomAxis = providerssvg.append("line")
					.attr("x1", 10)
					.attr("y1", 150)
					.attr("x2", 165)
					.attr("y2", 150)
					.attr("stroke-width", 1)
					.attr("stroke", "black");
	
	
	providerssvg.selectAll("hospitalline")
		.data(hospitalWithDRG)
		.enter()
			.append("line")
			.attr("class", "hospitalline")
			.attr("x1", 10)
			.attr("y1", function(d) { return yScale(d.avgCC); })
			.attr("x2", 165)
			.attr("y2", function(d) { return yScale(d.avgMP); })
			.attr("stroke-width", 0.02)
			.attr("stroke", "blue");
			//.attr("stroke-width", function(d) { if ((d.avgMP / d.avgCC) > 1) return 1; else return 0.02; })
			//.attr("stroke", function(d) { if ((d.avgMP / d.avgCC) > 1) return "green"; else return "blue"; });
			
	providerssvg.append("rect").attr("fill", "blue").style("opacity", 0.5).attr("height", 10).attr("width", 180).attr("y", 180);
	
	providerssvg.append('text').text('Best Coverage')
		.attr('x', 5)
		.attr('y', 188)
		.attr('fill', 'black')
		.attr("font-family", "sans-serif")
		.style("font-weight","bold")
		.attr("font-size", "8px");
		
	providerssvg.append("rect").attr("fill", "blue").style("opacity", 0.5).attr("height", 10).attr("width", 180).attr("y", 280);
	
	providerssvg.append('text').text('Worst Coverage')
		.attr('x', 5)
		.attr('y', 288)
		.attr('fill', 'black')
		.attr("font-family", "sans-serif")
		.style("font-weight","bold")
		.attr("font-size", "8px");	
		
		
	var bestCoverage = [];
	bestCoverage[1] = 0;
	
	
	for (i = 0; i < hospitalWithDRG.length; i++) {
		if ((hospitalWithDRG[i].avgMP / hospitalWithDRG[i].avgCC) > bestCoverage[1]) {
			bestCoverage[0] = +hospitalWithDRG[i].hospitalID;
			bestCoverage[1] = +(hospitalWithDRG[i].avgMP / hospitalWithDRG[i].avgCC);
		}
	}
	
	console.log("here is best coverage");
	console.log(bestCoverage);
	console.log(hospitalWithDRG);
		
	var worstCoverage = bestCoverage.slice();
	
	for (i = 0; i < hospitalWithDRG.length; i++) {
		if ((hospitalWithDRG[i].avgMP / hospitalWithDRG[i].avgCC) < worstCoverage[1]) {
			worstCoverage[0] = hospitalWithDRG[i].hospitalID;
			worstCoverage[1] = (hospitalWithDRG[i].avgMP / hospitalWithDRG[i].avgCC);
		}
	}
	
	//add rectangles for the provider with the best coverage
	providerssvg.append("rect")
				.attr("fill", "green")
				.attr("height", 30)
				.attr("width", function (d) {if (bestCoverage[1] > 1) return 160; else return bestCoverage[1] * 160; })
				.attr("y", 220).attr("x", 10);
	
	providerssvg.append("rect")
				.attr("fill", "red")
				.attr("height", 30)
				.attr("width", 160 - bestCoverage[1] * 160).attr("y", 220)
				.attr("x", 10 + bestCoverage[1] * 160);
	
	//add rectangles for the provider with the worst coverage
	providerssvg.append("rect")
				.attr("fill", "green")
				.attr("height", 30)
				.attr("width", worstCoverage[1] * 160)
				.attr("y", 320)
				.attr("x", 10);
	
	providerssvg.append("rect")
				.attr("fill", "red")
				.attr("height", 30)
				.attr("width", 160 - worstCoverage[1] * 160)
				.attr("y", 320)
				.attr("x", 10 + worstCoverage[1] * 160);

	
}
