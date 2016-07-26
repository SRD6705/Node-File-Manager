var fs = require('fs');

var useStdin = function() {
	var input = process.stdin.read();
	if (input !== null) {
		var inputSplit = input.toString().trim().split(" ");
		if (inputSplit[0] == "cat") {
			//cat <filename>
			catFile(inputSplit[1]);
		} else if (inputSplit[0] == "touch") {
			//touch <filename>
			createNewFile(inputSplit[1]);
		} else if (inputSplit[0] == "rm"){
			deleteNewFile(inputSplit[1]);
		} else if(inputSplit[0] == "replace"){
			replaceWord(inputSplit[1], inputSplit[2], inputSplit[3]);
		} else if (inputSplit[0] == "grep"){
			findALine(inputSplit[1], inputSplit[2]);
		}
	}
};

//create a file (touch)
function createNewFile(fileName) {
	fs.writeFile(fileName, "", function(err){
		if (err) {
			console.log("Could not write to file");
		} else {
			console.log("File created and saved");
		}
	});
}
// deleteNewFile function 
function deleteNewFile(fileName){
	fs.unlink(fileName, function(err){
		if (err) {
		console.log("could not delete file");
		} else {
			console.log("file was deleted");
		}
	});
}
// find word
function findALine(fileName, findWord){
	fs.readFile(fileName, function(err, data){
		if (err){
			console.log("no line to read");
		}else {
			data = data.toString().split("\n");
			var newdata =[];
			for(var i = 0; i < data.length; i++){
				newdata.push(data[i].split(" "));


				for (var j = 0; j < newdata.length; j++){
					if (newdata[i][j] == findWord){
						console.log(newdata[i].join(" "));
					}
				}
			}



		}
	})
}
// replace hello w/ goodbye
function replaceWord(fileName, oldWord, newWord){
	fs.readFile(fileName, function(err, data){
		if (err){
			console.log("no file to read");
		} else {
			data = data.toString().split(" ");
			for (var i = 0; i < data.length; i++){
				if (data[i] == oldWord){
					data[i] = newWord;
				}
			}
			data = data.join(" ");
			fs.writeFile(fileName, data, function(err){
				if (err) {
					console.log("not working");
				}
			});
		}
	});
}
//read from a file (cat)
function catFile(fileName) {
	fs.readFile(fileName, function(err, data) {
		if (err) {
			console.log("Unable to read from file");
		} else {
			console.log(data.toString());
		}
	});
}

process.stdin.on('readable', useStdin);

/*
Your assignment is to implement the following functionality:
	* remove a file
		"rm" <file name>
		> rm hello.txt
			entirely deletetouch  the file hello.txt

	* find and replace a word in the file
		"replace" <file to search> <word to replace> <replacement word>
		> replace hello.txt hello goodbye
			replace all instances of hello in hello.txt with goodbye
		> replace what.txt there their
			replace all instances of there in what.txt with their

	* find a line in a file
		"grep" <file name> <word to find>
		> grep hello.txt hello
			print out all of the lines in hello.txt that contain "hello"
		> grep what.txt there
			print out all of the lines in what.txt that contain "there"

	Bonus work:
		* Ask for confirmation before deleting a file
		* Don't let people delete files that are above the current working directory (i.e. disallow "../")
		* Have grep take a regular expression as the word to find
		* Create mkdir and rmdir
*/

