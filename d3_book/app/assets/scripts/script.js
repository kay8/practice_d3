
// = = = = = = = = = = = = = = = = = = = = = =
// section 2
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

// = = = = = = = = = = = = = = = = = = = = = =
// section6
(function() {



  d3.selectAll("button").on('click', function() {
    var csvFile = this.getAttribute("data-src"),
        barElements;

    d3.csv(csvFile, function(error, data) {
      var dataSet = [];
      for (var i = 0; i < data.length; i++) {
        dataSet.push(data[i].item1);
      }

      barElements = d3.select("#graph-area")
        .selectAll("rect")
        .data(dataSet);

      barElements.enter()
        .append("rect")
        .attr({
          class: "bar",
          width: 0,
          height: 20,
          x: 0,
          y: function(d,i) {
            return i * 25;
          }
        })
        .transition()
        .attr({
          width: function(d,i) {
            return d;
          }
        });

      barElements
        .transition()
        .attr({
          width: function(d,i) {
            return d;
          }
        });

      barElements
        .exit()
        .remove();
    });
  });
}());


// = = = = = = = = = = = = = = = = = = = = = =
// section7
(function() {

  var svgEle = document.getElementById("graph7");
  if (svgEle !== null) {


    d3.csv("assets/data/sec7_data.csv", function(error, data) {
      var dataSet = [],
          labelName = [];
      for (var i in data[0]) {
        dataSet.push(data[0][i]);
        labelName.push(i);
      }

      var svgCS = window.getComputedStyle(svgEle, null),
          svgWidth = svgCS.getPropertyValue("width"),
          svgHeight = svgCS.getPropertyValue("height"),
          offsetX = 30,
          offsetY = 20,
          barElements,
          barWidth = 20,
          barMargin = 5,
          dataMax = dataSet.length * (barWidth + barMargin) + offsetX;

        svgWidth = parseFloat(svgWidth);
        svgHeight = parseFloat(svgHeight);


      // render
      barElements = d3.select("#graph7")
        .selectAll("rect")
        .data(dataSet);

      // add data
      barElements.enter()
        .append("rect")
        .attr({
          class: "bar",
          width: barWidth,
          height: 0,
          x: function(d,i) {
            return i * (barWidth + barMargin) + offsetX;
          },
          y: function(d,i) {
            return svgHeight - offsetY;
          }
        })
        .on("mouseover", function() {
          d3.select(this)
            .transition()
            .duration(200)
            .style("fill", "teal");
        })
        .on("mouseout", function() {
          d3.select(this)
            .transition()
            .duration(200)
            .style("fill", "indigo");
        })
        .transition()
        .duration(1000)
        .delay(function(d,i) {
          return i * 100;
        })
        .attr({
          height: function(d,i) {
            return d;
          },
          y: function(d,i) {
            return svgHeight - d - offsetY;
          }
        });

      barElements.enter()
        .append("text")
        .attr({
          class: "barNum",
          x: function(d,i) {
            return i * (barWidth + barMargin) + 10 + offsetX;
          },
          y: svgHeight - 5 - offsetY
        })
        .text(function(d,i) {
          return d;
        });

      // display axis
      var yScale = d3.scale.linear()
            .domain([0, dataMax])
            .range([dataMax, 0]);

      d3.select("#graph7")
        .append("g")
        .attr({
          class: "axis",
          transform: "translate(" + offsetX + ", " +  ((svgHeight - 300) - offsetY) + ")"
        })
        .call(
          d3.svg.axis()
          .scale(yScale)
          .orient("left")
          .ticks(10) // default axis space: 10
          .tickValues([10, 20, 50, 100, 150, 200])
          //.tickFormat(d3.format(".2f"))
        );

      // vertical line
      d3.select("#graph7")
        .append("rect")
        .attr({
          class: "axis_x",
          width: 320,
          height: 1,
          transform: "translate(" + offsetX + ", " +  (svgHeight - offsetY) + ")"
        });

      // display label
      barElements.enter()
        .append("text")
        .attr({
          class: "barName",
          x: function(d,i) {
            return i * 25 + 10 + offsetX;
          },
          y: svgHeight - offsetY + 15
        })
        .text(function(d,i) {
          return labelName[i];
        });

    });
  }
}());

// = = = = = = = = = = = = = = = = = = = = = =
// section8
(function() {

  var svgEle = document.getElementById("graph8");
  if (svgEle !== null) {


    var svgCS = window.getComputedStyle(svgEle, null),
        svgWidth = svgCS.getPropertyValue("width"),
        svgHeight = svgCS.getPropertyValue("height"),
        dataSet = [50, 30, 12, 9, 1],
        colour = d3.scale.category10();

      svgWidth = parseFloat(svgWidth);
      svgHeight = parseFloat(svgHeight);

    var pie = d3.layout.pie();
    var arc = d3.svg.arc().innerRadius(30).outerRadius(100);

    var pieElements = d3.select("#graph8")
        .selectAll("g")
        .data(pie(dataSet))
        .enter()
        .append("g")
        .attr({
          transform: "translate(" + svgWidth/2 + ", " + svgHeight/2 + ")"
        });

    pieElements
      .append("path")
      .attr({
        class: "pie"
      })
      .style({
        fill: function(d,i) {return colour(i);}
      })
      .transition()
      .duration(400)
      .delay(function(d,i) {
        return i * 400;
      })
      .ease("linear")
      .attrTween("d", function(d,i) {
        var interpolate = d3.interpolate(
          { startAngle: d.startAngle, endAngle: d.startAngle },
          { startAngle: d.startAngle, endAngle: d.endAngle }
        );
        return function(t) {
          return arc(interpolate(t));
        };
      });

    // total and text
    var textElements = d3.select("#graph8")
      .append("text")
      .attr({
        class: "total",
        transform: "translate(" + svgWidth/2 + ", " + (svgHeight/2 + 5) + ")"
      })
      .text("Total: " + d3.sum(dataSet));

    pieElements
      .append("text")
      .attr({
        class: "pieNum",
        transform: function(d,i) {
          return "translate(" + arc.centroid(d) + ")";
        },
        opacity: 0
      })
      .transition()
      .duration(400)
      .delay(function(d,i) {
        return i * 400;
      })
      .attr({
        opacity: 1
      })
      .text(function(d,i) {
        return d.value;
      });
  }

}());
