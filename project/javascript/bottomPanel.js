function addBottomPanel(bottomsvg, hospitals, hospitalChoice) {
	console.log("ENTERING BOTTOMPANEL");
	
	bottomsvg.append("line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", 0)
		.attr("y2", 200)
		.attr("stroke-width", 2)
		.attr("stroke", "black");
				
	bottomsvg.append("line")
			.attr("x1", 500)
			.attr("y1", 0)
			.attr("x2", 500)
			.attr("y2", 200)
			.attr("stroke-width", 2)
			.attr("stroke", "black");
			
	bottomsvg.append("line")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", 500)
			.attr("y2", 0)
			.attr("stroke-width", 2)
			.attr("stroke", "black");
			
	bottomsvg.append("line")
			.attr("x1", 0)
			.attr("y1", 200)
			.attr("x2", 500)
			.attr("y2", 200)
			.attr("stroke-width", 2)
			.attr("stroke", "black");

			
	bottomsvg.append('text').text(hospitals[hospitalChoice].name + " (Hospital ID: " + hospitals[hospitalChoice].ID + ")")
			.attr('x', 5)
			.attr('y', 15)
			.attr('fill', 'blue')
			.attr("font-family", "sans-serif")
			.style("font-weight","bold")
			.attr("font-size", "14px");
			
	bottomsvg.append('text').text("Top 5 most frequent diagnostic-related groups")
			.attr('x', 5)
			.attr('y', 25)
			.attr('fill', 'black')
			.attr("font-family", "sans-serif")
			.style("font-weight","bold")
			.attr("font-size", "10px");
			
	bottomsvg.append('text').text("% Average total medicare coverage (number of discharges)")
		.attr('x', 230)
		.attr('y', 32)
		.attr('fill', 'black')
		.attr("font-family", "sans-serif")
		.attr("font-size", "7px");
		
	var DRGsAtHospital = [];
	
	for (i = 0; i < DRGlist.length; i++) {
		if (hospitals[hospitalChoice].DRGs[DRGlist[i].substring(0,3)]) {
			//DRGsAtHospital.push(+parseInt(DRGlist[i]));
			DRGsAtHospital.push(DRGlist[i]);
		}
	}	

	
	var dischargesArray = [];
	
	for (i = 0; i < DRGsAtHospital.length; i++) {

		
		dischargesArray.push({
			DRG: DRGsAtHospital[i],
			discharges: +hospitals[hospitalChoice].DRGs[DRGsAtHospital[i].substring(0,3)].discharges
		});
	}
	
	
	dischargesArray.sort(function(a, b) {
		return parseInt(b.discharges) - parseInt(a.discharges);
	});
		
	var top5discharges = dischargesArray.slice(0, 5);
	
	bottomsvg.selectAll("listtext")
		.data(top5discharges)
		.enter()
			.append("text")
			.attr("class", "listtext")
			.text(function (d) {return d.DRG; })
			.attr('x', 10)
			.attr('y', function (d, i) {return 55 + i * 30; })
			.attr('fill', 'black')
			.attr("font-family", "sans-serif")
			.attr("font-size", "8px");
			
	for (i = 0; i < top5discharges.length; i++) {
		top5discharges[i].avgCC = +parseFloat(hospitals[hospitalChoice].DRGs[top5discharges[i].DRG.substring(0,3)].avgCC.replace(/[$,]+/g,""));
		top5discharges[i].avgTP = +parseFloat(hospitals[hospitalChoice].DRGs[top5discharges[i].DRG.substring(0,3)].avgTP.replace(/[$,]+/g,""));
		top5discharges[i].coverage = (top5discharges[i].avgTP / top5discharges[i].avgCC);
	}
	
	
	bottomsvg.selectAll("greenrect")
			.data(top5discharges)
			.enter()
				.append("rect")
				.attr("class", "greenrect")
				.attr("fill", "green")
				.attr("height", 21)
				.attr("width", function (d) {if (d.coverage > 1) return 250; else return d.coverage * 250; })
				.attr('x', 200)
				.attr('y', function (d, i) {return 42 + i * 30; });
				
			
	bottomsvg.selectAll("redrect")
			.data(top5discharges)
			.enter()
				.append("rect")
				.attr("class", "redrect")
				.attr("fill", "red")
				.attr("height", 21)
				.attr("width", function (d) { return 250 - d.coverage * 250; })
				.attr('y', function (d, i) {return 42 + i * 30; })
				.attr("x", function (d) { return 200 + d.coverage * 250; });
				
	bottomsvg.selectAll("recttext")
			.data(top5discharges)
			.enter()
				.append("text")
				.attr("class", "recttext")
				.text(function (d) {return Number(d.coverage * 100).toFixed(2) + "%" + " (" + d.discharges + ")"; })
				.attr('x', 210)
				.attr('y', function (d, i) {return 54 + i * 30; })
				.attr('fill', 'black')
				.style("font-weight","bold")
				.attr("font-family", "sans-serif")
				.attr("font-size", "7px");
	
	

}

//create a bottomPanel with no data, only the borders
function emptyBottomPanel() {
	bottomsvg.append("line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", 0)
		.attr("y2", 200)
		.attr("stroke-width", 2)
		.attr("stroke", "black");
				
	bottomsvg.append("line")
			.attr("x1", 500)
			.attr("y1", 0)
			.attr("x2", 500)
			.attr("y2", 200)
			.attr("stroke-width", 2)
			.attr("stroke", "black");
			
	bottomsvg.append("line")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", 500)
			.attr("y2", 0)
			.attr("stroke-width", 2)
			.attr("stroke", "black");
			
	bottomsvg.append("line")
			.attr("x1", 0)
			.attr("y1", 200)
			.attr("x2", 500)
			.attr("y2", 200)
			.attr("stroke-width", 2)
			.attr("stroke", "black");
		
	bottomsvg.append('text').text("CLICK ON A HOSPITAL ON THE MAP OR IN THE RIGHT-HAND PANEL TO GET SOME INFORMATION!!!!")
			.attr('x', 5)
			.attr('y', 15)
			.attr('fill', 'red')
			.attr("font-family", "sans-serif")
			.style("font-weight","bold")
			.attr("font-size", "14px");
}
