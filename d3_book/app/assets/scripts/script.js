(function() {

  var data = [300, 130, 5, 60, 240];

  d3.select("#practice1")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr({
      x: 0,
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

