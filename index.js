var gm = require("gm");

var arguments = process.argv.splice(2);

if (arguments.length < 3) {
	console.log("TO: node index.js file.jpg tileWidth tileHeight")
	return;
}
console.log(arguments[0])

var imageMagick = gm.subClass({imageMagick:true});
var fileName = arguments[0];
var tileWidth = arguments[1]/1;
var tileHeight = arguments[2]/1;

imageMagick(fileName+"").size(function (err, size) { //获取original size
	console.log("fileName=%s, fileSize=[%d,%d], tileWidth=%d, tileHeight=%d", fileName, size.width, size.height, tileWidth, tileHeight);

	for (var x=0, i=0; x<=size.width; i++, x+=tileWidth) {
		for (var y=0, j=0; y<=size.height; j++, y+=tileHeight) {
			imageMagick(fileName).crop(tileWidth, tileHeight, x, y).write("./output/file_"+i+"_"+j+".jpg", function(err){
				//console.log(err)
			});
			console.log(x, y, i, j)
		}
		sleep(4000);
	}
})


function sleep(sleepTime) {
	for (var start=new Date; new Date-start<=sleepTime;) { } 
}
