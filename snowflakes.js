var	defaultSnowflakeLength = 500;
var snowflakePartsCount = 8;
var defaultSegmentLength = 5;
var maxSegmentAngle = 360 / snowflakePartsCount;
var allowedAngles = [0, 45, 90, 135, 180, 225, 270, 315];

function randomFromInterval(start, end)
{
	return start + Math.floor(Math.random()*(end - start + 1))	
}

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

/*function generateSnowflake()
{
	var snowflake = new Array();
	for (var i=0; i<snowflakeLength; i++)
		snowflake[i] = randomFromInterval(1, maxSegmentAngle);
	return snowflake;
}


function drawSnowflake(startX, startY)
{
	drawBackground();
	var currentX = startX;
	var currentY = startY;
	var canvas = document.getElementById("mainCanvas");
	var context = canvas.getContext("2d");
	context.strokeStyle = "#000000";
	context.lineWidth = 1;
	context.beginPath();
	context.moveTo(currentX, currentY);
	for (var part=0; part<snowflakePartsCount; part++)
	{
		for (segment=0; segment<snowflakeLength; segment++)
		{
			angle = snowflake[segment] + part * maxSegmentAngle;
			currentX = currentX + segmentLength * Math.cos(degreeToRadian(angle));
			currentY = currentY + segmentLength * Math.sin(degreeToRadian(angle));
			context.lineTo(currentX, currentY);
		}
	}
	context.stroke();		
}
*/

function evaluateSnowflakeSize(snowflake)
//returns a radius of circumcircle
//идея в том, чтобы пробежаться по двум противоположным частям снежинки
//и найти максимальное расстояние между двумя соответствующими сегментами разных частей
{
	var x = y = 0;
	var maxVectorSize = 0;
	for (segment=0; segment<snowflake.length; segment++)
	{
		x += Math.cos(degreeToRadian(snowflake[segment]));
		y += Math.sin(degreeToRadian(snowflake[segment]));
		vectorSize = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
		if (vectorSize > maxVectorSize)
			maxVectorSize = vectorSize;
	}
	return maxVectorSize;
}

function generateSnowflake(snowflakeLength)
{
	var newSnowflake = new Array();
	for (var i=0; i<snowflakeLength; i++)
		newSnowflake[i] = allowedAngles[randomFromInterval(0, 7)];
	return newSnowflake;
}

function drawSnowflakeCircumcircle(snowflake, x, y)
{
	var radius = evaluateSnowflakeSize(snowflake);
	var canvas = document.getElementById("mainCanvas");
	var context = canvas.getContext("2d");
	context.fillStyle = "#c0c0c0";
	context.beginPath();
	context.arc(x, y, radius, 0, 2*Math.PI, true);
	context.fill();
}

function drawSnowflake(snowflake, startX, startY, segmentLength, snowflakeLength, drawCircumcircle)
{
	drawBackground();
	if (drawCircumcircle)
		drawSnowflakeCircumcircle(snowflake, startX, startY);
	var currentX = startX;
	var currentY = startY;
	var canvas = document.getElementById("mainCanvas");
	var context = canvas.getContext("2d");
	context.strokeStyle = "#000000";
	context.lineWidth = 1;
	context.beginPath();
	context.moveTo(currentX, currentY);
	for (var part=0; part<snowflakePartsCount; part++)
	{
		for (segment=0; segment<snowflakeLength; segment++)
		{
			angle = snowflake[segment] + part * 45;
			currentX = currentX + segmentLength * Math.cos(degreeToRadian(angle));
			currentY = currentY + segmentLength * Math.sin(degreeToRadian(angle));
			context.lineTo(currentX, currentY);
		}
	}
	context.stroke();		
}
