(function() {

  var data = [300, 130, 5, 60, 240],
      data2 = [200, 110, 50, 250, 10];

  d3.select("#practice1")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr({
      x: 0,
      y: function(d,i) {return i * 25;},
      width: function(d,i) {return d + "px";},
      height: "20px"
    });

  d3.select(".js-update")
    .on('click', function() {

      d3.select("#practice1")
        .selectAll("rect")
        .data(data2)
        .attr({
          width: function(d,i) {return d + "px";}
        });

    });

}());

