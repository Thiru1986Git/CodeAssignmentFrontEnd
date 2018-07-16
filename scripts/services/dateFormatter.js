app.factory("dateFormatter", function() {
	return {
		convertDate : function(inputFormat) {
			function format(sec) {
				return (sec < 10) ? '0' + sec : sec;
			}
			var date = new Date(inputFormat);
			return [ format(date.getDate()), format(date.getMonth() + 1),
					date.getFullYear() ].join('/');
		}
	}
})