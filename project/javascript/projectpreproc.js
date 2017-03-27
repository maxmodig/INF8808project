function loadData() {
    queue()
        .defer(d3.json, "states500.geojson")
        .defer(d3.csv, "hospitaldata.csv")
		.defer(d3.csv, "zipcodecoordinates.csv")
        .await(ready);
}

function createHospitalObject(hospitalData, hospitals, hospitalIDs) {

	var information = [];
	
	for (i = 0; i < hospitalData.length; i++) {
			if (hospitalIDs.indexOf(+hospitalData[i]['Provider Id']) == -1) {
				hospitalIDs.push(+hospitalData[i]['Provider Id']);
				information.push({
					name: hospitalData[i]['Provider Name'],
					zipCode: hospitalData[i]['Provider Zip Code']
				});
			}
		}
				
	for (i = 0; i < hospitalIDs.length; i++) {
		hospitals[hospitalIDs[i]] = {
			ID: hospitalIDs[i],
			name: information[i].name,
			zipCode: information[i].zipCode,
			DRGs: {}
		};
		
	}
	
	console.log(hospitalIDs);
	return hospitals;
}

function addDRGdata(hospitals, hospitalData) {
	for (i = 0; i < hospitalData.length; i++) {
		hospitals[hospitalData[i]['Provider Id']].DRGs[+parseInt(hospitalData[i]['DRG Definition'], 10)] = {
			DRG: hospitalData[i]['DRG Definition'],
			discharges: +hospitalData[i][' Total Discharges '],
			avgCC: +parseFloat(hospitalData[i][' Average Covered Charges '].replace(/[$,]+/g,"")),
			avgTP: +parseFloat(hospitalData[i][' Average Total Payments '].replace(/[$,]+/g,"")),
			avgMP: +parseFloat(hospitalData[i]['Average Medicare Payments'].replace(/[$,]+/g,""))
		};
	}
}

function addHospitalCoordinates(zipCodeData, hospitals, hospitalIDs) {
	console.log("how does hospitals look?");
	console.log(hospitals);
	
	for (i = 0; i < hospitalIDs.length; i++) {
		for (j = 0; j < zipCodeData.length; j++) {
			if (+hospitals[hospitalIDs[i]].zipCode == +zipCodeData[j].ZIP) {
				hospitals[hospitalIDs[i]].LAT = +zipCodeData[j].LAT;
				hospitals[hospitalIDs[i]].LNG = +zipCodeData[j].LNG;
				break;
			}
		}
	}	
}

