function loadData() {
    queue()
        .defer(d3.json, "states500.geojson")
        .defer(d3.json, "counties500.geojson")
		.defer(d3.csv, "hospitaldata.csv")
		.defer(d3.csv, "zipcodecoordinates.csv")
		//.defer(d3.json, "hospitals.json")
		.defer(d3.json, "hospitals2.json")
        .await(ready);
}

function createHospitalObject(hospitalData) {

	var information = [];
	
	for (i = 0; i < hospitalData.length; i++) {
		if (hospitalIDs.indexOf(+hospitalData[i]['Provider Id']) == -1) {
			hospitalIDs.push(+hospitalData[i]['Provider Id']);
			information.push({
				name: hospitalData[i]['Provider Name'],
				zipCode: hospitalData[i]['Provider Zip Code']
			});		
		}
		if (DRGlist.indexOf(hospitalData[i]['DRG Definition']) == -1) {
			DRGlist.push(hospitalData[i]['DRG Definition']);
		}
	}	
}

//created for earlier version where not every hospital had coordinates
function createhospwithcoord(hospitals) {
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
	
	return hospwithcoord;
}

