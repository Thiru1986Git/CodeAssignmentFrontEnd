app
		.service("csvService",
				function(dateFormatter) {

					this.getFileData = function(files) {
						if (files.length) {
							var readFile = new FileReader();
							readFile.readAsText(files[0]);
							return readFile;
						}
					}

					this.convertToJson = function(csv) {
						var str = csv.replace(/"/g, ""), lines = str
								.split("\r\n"), result = [], headers = lines[0]
								.split(",");
						for (var i = 1; i < lines.length - 1; i++) {
							var obj = {}, currentline = lines[i].split(",");
							for (var j = 0; j < headers.length; j++) {
								headers[j] = headers[j].replace(/ /g, '');
								obj[headers[j]] = currentline[j];
								if (headers[j] === "Dateofbirth") {
									obj[headers[j]] = dateFormatter
											.convertDate(currentline[j]);
								}
							}
							result.push(obj);
							result.sort(function(a, b) {
								return parseFloat(a.Issuecount)
										- parseFloat(b.Issuecount);
							});

						}
						return result;
					}
				});
