function vanillaAjax (url, method,  data) {
	if(method == 'get') { 
		url = url + '?' + data;
		data = '';
	}
	if( window.XDomainRequest && navigator.appVersion.indexOf("MSIE 10") == -1) { // IE 8, 9 처리
        console.log("vanillaAjax::xdr");
		var xdr = new XDomainRequest();
		xdr.onload = function() {
			console.log("xdr onload. Response:" + xdr.responseText);
		}
		xdr.onerror = function () {
			console.error("xdr onerror. responseText: " + xdr.responseText);
			return;
		}
		try {
			xdr.open(method, url);	// async
		} catch (err) {
			console.error("xdr Open Fail. Error description: " + err.description);
			return;
		}
		try {
			xdr.send(data);
		} catch (err) {
			console.error("xdr Send Fail. Error description: " + err.description);
			return;
		}
	}
	else {
        console.log("vanillaAjax::xhttp");
		if (window.XMLHttpRequest)	var xhttp = new XMLHttpRequest();
		else 						var xhttp = new ActiveXObject("Microsoft.XMLHTTP");	// IE5,6 처리
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4) {
				if(this.status == 200) console.log("Success 200. Response:" + this.responseText);	// 정상
				else {
					console.error("xhttp Request Fail. status: "	// 오류 (400에러, 404에러 등)
											+ this.status + " , statusText: " + this.statusText);
					return;
				}
			}
		};
		try {
			xhttp.open(method, url);	// async
		} catch (err) {
			console.error("xhttp Open Fail. Error description: " + err.description);
			return;
		}
		if (window.XMLHttpRequest) xhttp.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
		try {
			xhttp.send(data);
		} catch (err) {
			console.error("xhttp Send Fail. Error description: " + err.description);
			return;
		}
	}
}