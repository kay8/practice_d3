(function() {

  var dataset = [];

  d3.csv("assets/data/data.csv", function(error, data) {
    var i,
        dataNum = data.length;
    for (i = 0; i < dataNum; i++) {
      dataset.push(data[i].item1);
    }


    d3.select("#practice1")
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr({
        x: 10,
        y: function(d,i) {return i * 25;},
        width: "0px",
        height: "20px"
      })
      .on('click', function() {
        d3.select(this)
        .style({
          fill: 'cyan'
        });
      })
      .transition()
      .delay(function(d,i) {
        return i * 500;
      })
      .duration(500)
      .attr({
        width: function(d,i) {return d + "px";}
      });

    var xScale = d3.scale.linear()
        .domain([0, 300])
        .range([0, 300]);

    d3.select("#practice1")
      .append("g")
      .attr({
        class: "axis",
        transform: "translate(10, " + ((1 + dataset.length) * 20 + 5) + ")"
      })

      .call(d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
      );

  });



  d3.select(".js-update").on('click', function() {

    var i,
        dataNum = dataset.length;
    for (i = 0; i < dataNum; i++) {
      dataset[i] = Math.floor(Math.random() * 320);
    }

    d3.select("#practice1")
      .selectAll("rect")
      .data(dataset)
      .transition()
      .attr({
        width: function(d,i) {return d + "px";}
      });

  });

}());

