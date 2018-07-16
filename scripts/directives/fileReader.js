app.directive('fileReaderDirective', function(csvService) {
	return {
		scope : {
			fileReader : "="
		},

		link : function(scope, element) {
			element.on('change', function(changeEvent) {
				var files = changeEvent.target.files;
				if (!files || (files && !files.length))
					return;
				scope.fileData = csvService.getFileData(files);

				scope.fileData.onload = function(e) {
					var contents = e.target.result;
					scope.$apply(function() {
						scope.fileReader = csvService.convertToJson(contents);
						console.log(scope.fileReader)
					});
				};
			});
		}
	}
});