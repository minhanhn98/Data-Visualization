var svg_width = 600, svg_height = 400;
var margin = { top: 20, right: 20, bottom: 30, left: 50 };
var width = svg_width - margin.left - margin.right;
var height = svg_height - margin.top - margin.bottom;

var x = d3.scaleLinear().rangeRound([0, width]);
var y = d3.scaleLinear().rangeRound([height, 0]);

function newParse(data) {
	var data = document.getElementById("inputArray").value.split(" ");
	for (var i = 0; i < data.length; i++) {
		data[i] = parseFloat(data[i]);
	}
	setData(data);
	updateInput(data);
	clearSeries();
	initializeSeries(data);
	playSeries(data);
}
setData(data){
	var range = setRange(data);
	var base = getMin(data);
	var max = getMax(data);
	var i =0;
	var newData;
	while (base<max+1){
	for(int j = 0; j<data.length; j++){
		if(data[j]>=base&&data[j]<base+range){
		newData[i]++;
		}
	}
	i++;
	base=base+range;
	}
	newData[newData.length-1]++;
	data = newData;

}

funtion setRange(data){
	var max=getMax(data);
	var min=getMin(data);
	var range = max-min;
	var setrange = range/8;
	return setrange;
}

function getMax(data){
	int max=data[0];
	for(int i=0;i<data.length;i++){
		if(data[i]>max){
			max=data[i];
		}
	}
	return max;
}

function getMin(data){
	int min=data[0];
	for(int i=0;i<data.length;i++){
		if(data[i]<min){
			min=data[i];
		}
	}
	return min;
}
function updateInput(data) {
	var x = d3.scaleLinear().rangeRound([0, width]);
	var y = d3.scaleLinear().rangeRound([height, 0]);

	var line = d3.line()
		.x(function (d) { return x(data.indexOf(d)) })
		.y(function (d) { return y(d) });

	x.domain(d3.extent(data, function (d) { return data.indexOf(d) }));
	y.domain(d3.extent(data, function (d) { return d }));

	var svg = d3.select("body").transition();

	svg.select(".line")
		.duration(2000)
		.attr("d", line(data));

	svg.select(".x_axis")
		.duration(2000)
		.call(d3.axisBottom(x));

	svg.select(".y_axis")
		.duration(2000)
		.call(d3.axisLeft(y));
}


function parse() {
	var data = document.getElementById("inputArray").value.split(" ");
	for (var i = 0; i < data.length; i++) {
		data[i] = parseFloat(data[i]);
	}
	setData(data);
	line_chart(data);
	initializeSeries(data);
	playSeries(data);
}


function makechart(data) {
	d3.select(".chart")
		.selectAll("div")
		.data(data)
		.enter().append("div")
		.style("width", function (d) { return x(d) + "px"; })
		.text(function (d) { return d; });
}


function line_chart(data) {
	var line = d3.line()
		.x(function (d) { return x(data.indexOf(d)) })
		.y(function (d) { return y(d) })

	var svg = d3.select('svg')
		.attr("width", svg_width)
		.attr("height", svg_height);

	var g = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	x.domain(d3.extent(data, function (d) { return data.indexOf(d) }));
	y.domain(d3.extent(data, function (d) { return d }));

	g.append("g")
		.attr("class", "x_axis")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x))
		.select(".domain")
		.remove();

	g.append("g")
		.attr("class", "y_axis")
		.call(d3.axisLeft(y))
		.append("text")
		.attr("fill", "#000")
		.attr("transform", "rotate(-90)")
		.attr("y", 1)
		.attr("dy", "0.71em")
		.attr("text-anchor", "end")
		.text("Price ($)");

	g.append("path")
		.datum(data)
		.attr("class", "line")
		.attr("fill", "none")
		.attr("stroke", "steelblue")
		.attr("stroke-linejoin", "round")
		.attr("stroke-linecap", "round")
		.attr("stroke-width", 1.5)
		.attr("d", line)
		.call(transition);

	function transition(path) {
		path.transition()
			.duration(6000)
			.attrTween("stroke-dasharray", tweenDash);
	}

	function tweenDash() {
		var l = this.getTotalLength(),
			i = d3.interpolateString("0," + l, l + "," + l);
		return function (t) { return i(t); };
	}
}
