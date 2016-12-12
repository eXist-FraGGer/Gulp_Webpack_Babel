module.exports = function decodeStr(form) {
	if (!form.text.value) return;
	var str = form.text.value;

	var http = new XMLHttpRequest();

	http.open('POST', 'http://localhost:8080/md5', true);
	http.setRequestHeader('Content-type', 'application/json');
	http.onreadystatechange = () => {
		if (http.readyState == 4 && http.status == 200) {
			var result = document.getElementById('result');
			result.innerHTML = http.responseText;
		}
	};
	http.send(JSON.stringify({
		text: str
	}));
};