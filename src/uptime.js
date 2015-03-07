var started = new Date();
var options = {
	type: "basic",
	title: "Browser Uptime",
	iconUrl: "icon_128.png"
};
var segments = {
	day: 86400000,
	hour: 3600000,
	minute: 60000,
	second: 1000,
	millisecond: 1,
};
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-115818-5']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

function lz(num, size) {
	var pad = new Array(1 + size).join('0');
	return (pad + num).slice(-pad.length);
}

function getUptime(from, to) {
	var result = {};
	var interval = to - from;
	Object.keys(segments).forEach(function(key) {
		result[key] = ~~(interval / segments[key])
		interval -=  (result[key] * segments[key]);
	});
	return result;
}

function formatResult(times) {
	result = [];
	if (times.day > 1) {
		result.push(times.day + ' days');
	}
	if (times.day === 1) {
		result.push(times.day + ' day');
	}
	result.push(' ');
	result.push(lz(times.hour, 2));
	result.push(':');
	result.push(lz(times.minute, 2));
	result.push(':');
	result.push(lz(times.second, 2));
	result.push('.');
	result.push(lz(times.millisecond, 3));
	return result.join('');
}

chrome.browserAction.onClicked.addListener(function(tab) {
	options.message = 'Up ' + formatResult(getUptime(started, new Date()));
	chrome.notifications.create('', options, function(notificationId){});
	 _gaq.push(['_trackEvent', 'uptime', 'clicked']);
});