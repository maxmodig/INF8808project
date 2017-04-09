function loadData() {
    queue()
        .defer(d3.json, "states500.geojson")
        .defer(d3.json, "counties500.geojson")
		.defer(d3.csv, "hospitaldata.csv")
		.defer(d3.csv, "zipcodecoordinates.csv")
		.defer(d3.json, "hospitals.json")
        .await(ready);
}

function createHospitalObject(hospitalData, hospitalIDs, DRGlist) {

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


