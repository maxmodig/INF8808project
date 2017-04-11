// Tool Tip for the right hand panel ** I AM NOT SURE WHAT I SHOULD PUT IN THE RETURN

function RightHandToolTip(scatterPlot) {

   var tip = d3.tip();
   
	tip.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function() {
			var info = {};
			
			d3.select(this).attr("r", function(d) {
				info.name = d.hospitals[hospitalIDs[i]].DRGs[DRGchoice].name ;
				info.avgCC = d.hospitals[hospitalIDs[i]].DRGs[DRGchoice].avgCC;
				info.avgTP = d.hospitals[hospitalIDs[i]].DRGs[DRGchoice].avgTP;
				return r(d.otherValue.avgCC);
			});
			
			return "<br>" + info.name + "</br>" +
				"<br>Average covered charges: " + info.avgCC + " </br>" +
				"<br>Average total medicare coverage : " + info.avgTP + "</br>";
		}); 
    return tip;
};

//Tool Tip for the map *** I AM NOT SURE ABOUT THE HOSPITAL ADRESS  ** I AM NOT SURE WHAT I SHOULD PUT IN THE RETURN

function MapToolTip(scatterPlot) {

   var tip = d3.tip();
 
	tip.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function() {
			var info = {};
			
			d3.select(this).attr("r", function(d) {
				info.name = d.hospitals[hospitalIDs[i]].DRGs[DRGchoice].name ;
				info.adress = d.hospitals[hospitalIDs[i]].adress;
				info.avgCC = d.hospitals[hospitalIDs[i]].DRGs[DRGchoice].avgCC;
				info.avgTP = d.hospitals[hospitalIDs[i]].DRGs[DRGchoice].avgTP;
				info.discharges= d.hospitals[hospitalIDs[i]].discharges ;
				return r(d.otherValue.name);
			});
			
			return "<br>" + info.name + "</br>" +
				"<br>Average covered charges: " + info.avgCC + " </br>" +
				"<br>" + info.adress + " </br>" +
				"<br>Average total medicare coverage : " + info.avgTP + "</br>" +
				"<br>* Out of : " + info.discharges+ "discharges</br>";
		}); 
    return tip;
};


//Tool Tip for the bottom panel ** I AM NOT SURE WHAT I SHOULD PUT IN THE RETURN

function BottomToolTip(scatterPlot) {

   var tip = d3.tip();

	tip.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function() {
			var info = {};
			
			d3.select(this).attr("r", function(d) {
				info.avgCC = d.hospitals[hospitalIDs[i]].DRGs[DRGchoice].avgCC;
				info.avgTP = d.hospitals[hospitalIDs[i]].DRGs[DRGchoice].avgTP;
				info.discharges= d.hospitals[hospitalIDs[i]].discharges ;
				return r(d.otherValue.hospitalIDs[i]].DRGs[DRGchoice]);
			});
			
			return "<br>Average covered charges: " + info.avgCC + " </br>" +
				"<br>Average total medicare coverage : " + info.avgTP + "</br>" +
				"<br>* Out of : " + info.discharges+ "discharges</br>";
		}); 
    return tip;
};
