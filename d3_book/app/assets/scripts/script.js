(function() {

  //var data = [300, 130, 5, 60, 240];

  d3.csv("assets/data/data.csv", function(error, data) {
    var data1 = [];
    var i,
        dataNum = data.length;
    for (i = 0; i < dataNum; i++) {
      data1.push(data[i].item1);
    }


    d3.select("#practice1")
      .selectAll("rect")
      .data(data1)
      .enter()
      .append("rect")
      .attr({
        x: 10,
        y: function(d,i) {return i * 25;},
        width: "0px",
        height: "20px"
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
        transform: "translate(10, " + ((1 + data1.length) * 20 + 5) + ")"
      })

      .call(d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
      );

  });

  // d3.select("#practice1")
  //   .selectAll("rect")
  //   .data(data)
  //   .enter()
  //   .append("rect")
  //   .attr({
  //     x: 0,
  //     y: function(d,i) {return i * 25;},
  //     width: function(d,i) {return d + "px";},
  //     height: "20px"
  //   })
  //   .on('click', function() {
  //     d3.select(this)
  //       .style("fill", "cyan");
  //   });

  d3.select(".js-update").on('click', function() {

    var i,
        dataNum = data.length;
    for (i = 0; i < dataNum; i++) {
      data[i] = Math.floor(Math.random() * 320);
    }

    d3.select("#practice1")
      .selectAll("rect")
      .data(data)
      .transition()
      .attr({
        width: function(d,i) {return d + "px";}
      });

  });

}());

