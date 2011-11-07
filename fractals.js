var border = 5;
//koh
//var	initiator = [0];
//var generator = [0, 60, 300, 0];
//serpinski triangle
var initiator = [60, -60, 180];
var generator = [0, 120, 0, -120, 0];
//peano square
//var initiator = [0];
//var generator = [0, 270, 0, 90, 180, 90, 0, 270, 0];
var defaultSegmentLength = 25;

function degreeToRadian(degree)
{
	return (degree * Math.PI) / 180;
}

function radianToDegree(radian)
{
	return (radian * 180) / Math.PI;
}

function clearCanvas()
	{
		var canvas = document.getElementById("mainCanvas");
		var context = canvas.getContext("2d");
		context.fillStyle = "#000000";
		context.fillRect(0,0,canvas.width,canvas.height);
	}

function drawBackground()
{
	clearCanvas();
	var canvas = document.getElementById("mainCanvas");
	var context = canvas.getContext("2d");
	context.fillStyle = "#808080";
	context.fillRect(border, border, canvas.width - 2*border, canvas.height - 2*border);
	context.strokeStyle = "#000000";
	for (x=0; x<canvas.width; x+=50)
	{
		context.beginPath();
		context.moveTo(x, 0);
		context.lineTo(x, canvas.height);
		context.stroke();
	}
	for (y=0; y<canvas.height; y+=50)
	{
		context.beginPath();
		context.moveTo(0, y);
		context.lineTo(canvas. width, y);
		context.stroke();
	}
}

function getFractalCurveLength(iterationNumber)
{
	return initiator.length * Math.pow(generator.length, iterationNumber);
}

function div(a,b)
{
	return Math.floor(a/b)
}

function getSegmentAngle(iterationNumber, segmentNumber)
{
	if (iterationNumber == 0)
		return initiator[segmentNumber]
	else
		return getSegmentAngle(iterationNumber - 1, div(segmentNumber, generator.length)) +
			generator[segmentNumber % generator.length];
}

function getSegmentAngleInString(iterationNumber, segmentNumber)
//function is not usable, but its fun
{
	if (iterationNumber == 0)
	{
		return "initiator[" + segmentNumber + "] + "
	}
	else
	{
		return getSegmentAngleInString(iterationNumber - 1, div(segmentNumber, generator.length)) +
			"generator[" + segmentNumber % generator.length + "] + ";
	}
}


function formNumReprOfCurve(iterationNumber)
//test function for <getSegmentAngle()>
{
	var curve = new Array();
	curveLength = getFractalCurveLength(iterationNumber);
	for (i=0; i<curveLength; i++)
	{
		curve[i] = getSegmentAngle(iterationNumber, i) % 360;
	}
	alert(curve.toString());
}


function drawSegment(startX,startY,angle,len)
//draw a line, starts in (startX;startY), that forms an <angle> with Ox, with fixed <len>
//angle expressed in degrees
{
	var canvas = document.getElementById("mainCanvas");
	var context = canvas.getContext("2d");
	var endX = startX + len * Math.cos(degreeToRadian(angle)); //maybe right is to use <- angle>
	var endY = startY - len * Math.sin(degreeToRadian(angle));
	//alert("Line from (" + startX + ";" + startY + ") to (" + endX + ";" + endY + ").");
	context.beginPath();
	context.moveTo(startX, startY);
	context.lineTo(endX, endY);
	//context.closePath();
	context.strokeStyle = "#000000";
	context.lineWidth = 2;
	context.stroke();
}


function drawFractalCurve(startX, startY, segmentLength, iterationNumber)
{
	drawBackground();
	var currentX = startX;
	var currentY = startY;
	var curveLength = getFractalCurveLength(iterationNumber);
	var canvas = document.getElementById("mainCanvas");
	var context = canvas.getContext("2d");
	context.strokeStyle = "#000000";
	context.lineWidth = 1;
	context.beginPath();
	context.moveTo(currentX, currentY);
	for (segmentNumber=0; segmentNumber < curveLength; segmentNumber++)
	{
		angle = getSegmentAngle(iterationNumber, segmentNumber);
		currentX = currentX + segmentLength * Math.cos(degreeToRadian(angle)); //maybe right is to use <- angle>
		currentY = currentY + segmentLength * Math.sin(degreeToRadian(angle));
		context.lineTo(currentX, currentY);
	}
	context.stroke();
}
