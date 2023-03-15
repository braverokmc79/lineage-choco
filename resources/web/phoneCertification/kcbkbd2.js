function KCBKBD_Loading() {
	//TK_Loading();
}
function doKcbKbdSubmit(frm){
	/*if(makeEncData(frm)){
		frm.submit();
	}*/
	frm.submit();
}
function doKcbMakeEncData(frm){
	//makeEncData(frm);
	return true;
}
function inKcbSerialize (form) {
    if (!form || form.nodeName !== "FORM") {
            return;
    }
    var i, j, q = [];
    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
            if (form.elements[i].name === "") {
                    continue;
            }
            switch (form.elements[i].nodeName) {
            case 'INPUT':
                    switch (form.elements[i].type) {
                    case 'text':
                    case 'hidden':
                    case 'password':
                    case 'button':
                    case 'reset':
                    case 'submit':
                            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                            break;
                    case 'checkbox':
                    case 'radio':
                            if (form.elements[i].checked) {
                                    q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                            }                                               
                            break;
                    }
                    break;
                    case 'file':
                    break; 
            case 'TEXTAREA':
                    q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                    break;
            case 'SELECT':
                    switch (form.elements[i].type) {
                    case 'select-one':
                            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                            break;
                    case 'select-multiple':
                            for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                                    if (form.elements[i].options[j].selected) {
                                            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
                                    }
                            }
                            break;
                    }
                    break;
            case 'BUTTON':
                    switch (form.elements[i].type) {
                    case 'reset':
                    case 'submit':
                    case 'button':
                            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                            break;
                    }
                    break;
            }
    }
    return q.join("&");
}
function inKcbGetAjax() {
	var xhr;
    if (typeof XMLHttpRequest !== 'undefined') {
        xhr = new XMLHttpRequest();  
    }
    var versions = ["MSXML2.XmlHttp.6.0","MSXML2.XmlHttp.5.0","MSXML2.XmlHttp.4.0","MSXML2.XmlHttp.3.0","MSXML2.XmlHttp.2.0","Microsoft.XmlHttp"];
    for(var i = 0; i < versions.length; i++) {  
        try {  
            xhr = new ActiveXObject(versions[i]);  
            break;  
        } catch (e) {
        }  
    }
    if ( xhr == undefined ) {
    	alert('Browser is not Support AJAX');
    }
    return xhr;
}

function inKcbAjaxSend(url, method, data, fnSuccess, fnError) {
    var x = inKcbGetAjax();
    x.open(method, url, true); 
    x.onreadystatechange = function() {
        if (x.readyState == 4) {
        	if (x.status == 200) {
        		if (typeof fnSuccess == 'function')
        			fnSuccess(x.responseText);
        	}
        	else {
        		if (typeof fnError == 'function')
        			fnError(x.responseText);
        	}
        }
    };
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    x.send(data);
};

function doKcbCallAjax( url, form1, fnSuccess, fnError ) {
    /*var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    inKcbAjaxSend(url + (query.length ? '?' + query.join('&') : ''), 'GET', null, fnSuccess, fnError);
    */
	var serialStr = inKcbSerialize(form1);
	inKcbAjaxSend(url + (serialStr ? '?' + serialStr : ''), 'GET', null, fnSuccess, fnError);
	
};

function doKcbCallAjaxPost( url, form1, fnSuccess, fnError ) {
    /*var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    inKcbAjaxSend(url, 'POST', query.join('&'), fnSuccess, fnError);
    */
	var serialStr = inKcbSerialize(form1);
	inKcbAjaxSend(url, 'POST', serialStr, fnSuccess, fnError);
};

function kcbAddOnLoadEvent(func) { 
	var oldonload = window.onload; 
	if (typeof window.onload != 'function') { 
	    window.onload = func; 
	} else { 
	    window.onload = function() { 
	    	if (oldonload) { 
	    		oldonload(); 
	    	} 
		    func(); 
	    };
	} 
} 

kcbAddOnLoadEvent(KCBKBD_Loading);
