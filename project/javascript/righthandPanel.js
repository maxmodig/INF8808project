function addRighthandPanel(comparisonsvg, hospitals, hospitalIDs) {
		
	//DRG that is chosen
	var DRGchoice = 313;
	
	//console.log("now hospitals looks like this");
	//console.log(hospitals);
	
	var frameLineLeft = comparisonsvg.append("line")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", 0)
			.attr("y2", 500)
			.attr("stroke-width", 2)
			.attr("stroke", "black");
				
	var frameLineLeft = comparisonsvg.append("line")
			.attr("x1", 180)
			.attr("y1", 0)
			.attr("x2", 180)
			.attr("y2", 500)
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
			.attr("y1", 500)
			.attr("x2", 180)
			.attr("y2", 500)
			.attr("stroke-width", 2)
			.attr("stroke", "black");
	
	
	var DRGsvg = comparisonsvg.append("svg").attr("width", 180).attr("height", 100);
	var providerssvg = comparisonsvg.append("svg").attr("width", 180).attr("height", 700).attr("y", 70);
	
	DRGsvg.append("rect").attr("fill", "blue").style("opacity", 0.5).attr("height", 10).attr("width", 180).attr("y", 30);
	providerssvg.append("rect").attr("fill", "blue").style("opacity", 0.5).attr("height", 10).attr("width", 180);
			
	DRGsvg.append('text').text('Uncovered Charges Comparison')
			.attr('x', 5)
			.attr('y', 20)
			.attr('fill', 'black')
			.attr("font-family", "sans-serif")
			.style("font-weight","bold")
			.attr("font-size", "10px");
	
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
	
	//console.log("here is data for the hospitals that provide DRG " + DRGchoice);
	//console.log(hospitalWithDRG);
	
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
	
	//console.log("the maximum covered charges is " + maxCC + " at hospital with ID " + maxID);
		
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
	
	//add tick at top of left axis
	providerssvg.append("line")
				.attr("x1", 10)
				.attr("y1", 20)
				.attr("x2", 15)
				.attr("y2", 20)
				.attr("stroke-width", 1)
				.attr("stroke", "black");
				
	providerssvg.append('text').text("$" + maxCC)
		.attr('x', 16)
		.attr('y', 23)
		.attr('fill', 'black')
		.attr("font-family", "sans-serif")
		.attr("font-size", "6px");
					
	providerssvg.append('text').text("Average").attr('x', 5).attr('y', 156).attr('fill', 'black').attr("font-family", "sans-serif").attr("font-size", "6px");
	providerssvg.append('text').text("covered").attr('x', 5).attr('y', 162).attr('fill', 'black').attr("font-family", "sans-serif").attr("font-size", "6px");
	providerssvg.append('text').text("charges").attr('x', 5).attr('y', 168).attr('fill', 'black').attr("font-family", "sans-serif").attr("font-size", "6px");
	
	providerssvg.append('text').text("Average").attr('x', 152).attr('y', 156).attr('fill', 'black').attr("font-family", "sans-serif").attr("font-size", "6px");
	providerssvg.append('text').text("total").attr('x', 152).attr('y', 162).attr('fill', 'black').attr("font-family", "sans-serif").attr("font-size", "6px");
	providerssvg.append('text').text("Medicare").attr('x', 152).attr('y', 168).attr('fill', 'black').attr("font-family", "sans-serif").attr("font-size", "6px");
	providerssvg.append('text').text("coverage").attr('x', 152).attr('y', 174).attr('fill', 'black').attr("font-family", "sans-serif").attr("font-size", "6px");

	
	
	providerssvg.selectAll("hospitalline")
		.data(hospitalWithDRG)
		.enter()
			.append("line")
			.attr("class", "hospitalline")
			.attr("x1", 10)
			.attr("y1", function(d) { return yScale(d.avgCC); })
			.attr("x2", 165)
			.attr("y2", function(d) { return yScale(d.avgTP); })
			.attr("stroke-width", 0.02)
			.attr("stroke", "blue")
			.style("opacity", 2)
			.on("click", clickFunction);
			//.attr("stroke-width", function(d) { if ((d.avgTP / d.avgCC) > 1) return 1; else return 0.02; })
			//.attr("stroke", function(d) { if ((d.avgTP / d.avgCC) > 1) return "green"; else return "blue"; });
			
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
		if ((hospitalWithDRG[i].avgTP / hospitalWithDRG[i].avgCC) > bestCoverage[1]) {
			bestCoverage[0] = +hospitalWithDRG[i].hospitalID;
			bestCoverage[1] = +(hospitalWithDRG[i].avgTP / hospitalWithDRG[i].avgCC);
		}
	}
	
	//console.log("here is best coverage");
	//console.log(bestCoverage);
	//console.log(hospitalWithDRG);
		
	var worstCoverage = bestCoverage.slice();
	
	for (i = 0; i < hospitalWithDRG.length; i++) {
		if ((hospitalWithDRG[i].avgTP / hospitalWithDRG[i].avgCC) < worstCoverage[1]) {
			worstCoverage[0] = hospitalWithDRG[i].hospitalID;
			worstCoverage[1] = (hospitalWithDRG[i].avgTP / hospitalWithDRG[i].avgCC);
		}
	}
	
	//add rectangles for the provider with the best coverage
	providerssvg.append("rect")
				.attr("fill", "green")
				.attr("height", 30)
				.attr("width", function (d) {if (bestCoverage[1] > 1) return 160; else return bestCoverage[1] * 160; })
				.attr("y", 220)
				.attr("x", 10);
	
	providerssvg.append("rect")
				.attr("fill", "red")
				.attr("height", 30)
				.attr("width", 160 - bestCoverage[1] * 160)
				.attr("y", 220)
				.attr("x", 10 + bestCoverage[1] * 160);
				
	providerssvg.append('text').text(hospitals[bestCoverage[0]].name)
				.attr('x', 5)
				.attr('y', 200)
				.attr('fill', 'green')
				.attr("font-family", "sans-serif")
				.style("font-weight","bold")
				.attr("font-size", "7px");
				
	var bMCpercentage = bestCoverage[1] * 100;
	
	providerssvg.append('text').text("Average total medicare coverage: " + bMCpercentage.toFixed(2) + "%")
				.attr('x', 25)
				.attr('y', 212)
				.attr('fill', 'black')
				.attr("font-family", "sans-serif")
				.attr("font-size", "7px");
				
	providerssvg.append('text').text("Average covered charges: $" + hospitals[bestCoverage[0]].DRGs[DRGchoice].avgCC)
				.attr('x', 25)
				.attr('y', 237)
				.attr('fill', 'black')
				.attr("font-family", "sans-serif")
				.style("font-weight","bold")
				.attr("font-size", "7px");
	
	providerssvg.append('text').text("* Out of " + hospitals[bestCoverage[0]].DRGs[DRGchoice].discharges + " discharges")
				.attr('x', 90)
				.attr('y', 260)
				.attr('fill', 'black')
				.attr("font-family", "sans-serif")
				.attr("font-size", "7px");					
	
	
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
				
	providerssvg.append('text').text(hospitals[worstCoverage[0]].name)
				.attr('x', 5)
				.attr('y', 300)
				.attr('fill', 'red')
				.attr("font-family", "sans-serif")
				.style("font-weight","bold")
				.attr("font-size", "8px");			
	
	var wMCpercentage = worstCoverage[1] * 100;
	
	providerssvg.append('text').text("Average total medicare coverage: " + wMCpercentage.toFixed(2) + "%")
				.attr('x', 25)
				.attr('y', 312)
				.attr('fill', 'black')
				.attr("font-family", "sans-serif")
				.attr("font-size", "7px");
				
	providerssvg.append('text').text("Average covered charges: $" + hospitals[worstCoverage[0]].DRGs[DRGchoice].avgCC)
				.attr('x', 25)
				.attr('y', 337)
				.attr('fill', 'black')
				.attr("font-family", "sans-serif")
				.style("font-weight","bold")
				.attr("font-size", "7px");
	
	providerssvg.append('text').text("* Out of " + hospitals[worstCoverage[0]].DRGs[DRGchoice].discharges + " discharges")
				.attr('x', 90)
				.attr('y', 360)
				.attr('fill', 'black')
				.attr("font-family", "sans-serif")
				.attr("font-size", "7px");				

}

function clickFunction (e) {
	console.log(e);
}
