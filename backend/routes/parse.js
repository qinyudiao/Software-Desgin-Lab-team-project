var temp_url = 'https://launchlibrary.net/1.4/launch/next/5';

function parse()
{
	var response = "";
	var form_data = {
		id: id,
		name: name,
		location: location,
		wikiURL: wikiURL,
		mapURL: mapURL,
		latitude: latitude, 
		longitude: longitude,
		agencies: agencies,
		countryCode: countryCode,
		rocket: rocket,
		missions: missions,
		description: description
	};
	
	$.ajax({
		type: "POST",
		url: temp_url,
		data: form_data,
		success: function(response)
		{
			console.log(response);
			
			var json_obj = $.parseJSON(response);
			
			var output="<ul>";
            for (var i in json_obj) 
            {
                output+="<li>" + json_obj[i].Language + ",  " + json_obj[i].ID + "</li>";
            }
            output+="</ul>";
            
            $('span').html(output);
		},
		datatype: "json"
	})
}










//var getJSON = function(url, callback)
//{
//	var x = new XMLHttpRequest();
//	x.open('GET', url, true);
//	x.responseType('json');
//	x.onload = function()
//	{
//		var status = x.status;
//		if (status == 200)
//		{
//			callback(null, x.response);
//		}
//		else
//		{
//			callback(status, x.response);
//		}
//	};
//	x.send();
//}
//
//getJSON('https://launchlibrary.net/1.4/launch/next/5', function(error, data) {
//  	if (error !== null) 
//	{
//   	 	alert('Something went wrong: ' + error);
//  	} 
//	else 
//	{
//    	alert('Your query count: ' + data.query.count);
//  	}
//});