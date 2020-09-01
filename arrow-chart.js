

var data = {
    legends: [{
        name: "No Switch Change"
    }, {
        name: "In Switch Growth"
    }, {
        name: "In Switch Decline"
    }, {
        name: "Width Indicates improtance of switch"
    }],
    nodes: [
        { id: 1, name: "TOTAL STORE ALCOHOL", inValue: 28201.70, color: "#ec545a" },
        { id: 2, name: "TOTAL STORE BAKERY", inValue: 8510, color: "#ec545a" },
        { id: 3, name: "TOTAL STORE BEAUTY CARE", inValue: 22045.60, color: "#ec545a" },
        { id: 4, name: "TOTAL STORE DAIRY", inValue: 69357.60, color: "#5ccab9" },
        { id: 5, name: "TOTAL STORE DELI", inValue: 33433.60, color: "#ec545a" },
        { id: 6, name: "TOTAL STORE FROZEN FOODS", inValue: 66943.40, color: "#ec545a" },
        { id: 7, name: "TOTAL STORE MERCHANDISE", inValue: 0, color: "#ec545a" },
        { id: 8, name: "All other", inValue: 688693.60, color: "#5ccab9" },
    ],
    links: [
        { id: 1, source: 1, target: 2, outValue: 110 },
        { id: 2, source: 1, target: 4, outValue: 992.9 },
        { id: 3, source: 1, target: 5, outValue: 661 },
        { id: 4, source: 1, target: 6, outValue: 2269.60 },
        { id: 5, source: 1, target: 8, outValue: 120.80 },

        { id: 6, source: 2, target: 4, outValue: 1920.20 },
        { id: 7, source: 2, target: 5, outValue: 814.70 },
        { id: 8, source: 2, target: 6, outValue: 1936.60 },
        { id: 9, source: 2, target: 8, outValue: 2778 },

        { id: 10, source: 3, target: 1, outValue: 319.40 },
        { id: 11, source: 3, target: 2, outValue: 71.30 },
        { id: 12, source: 3, target: 4, outValue: 877.70 },
        { id: 13, source: 3, target: 5, outValue: 804.70 },
        { id: 14, source: 3, target: 6, outValue: 1647.10 },
        { id: 15, source: 3, target: 8, outValue: 1643.50 },

        { id: 16, source: 4, target: 5, outValue: 162.40 },
        { id: 17, source: 4, target: 6, outValue: 1749.60 },
        { id: 18, source: 4, target: 8, outValue: 22.50 },

        { id: 19, source: 5, target: 6, outValue: 237.8 },

        { id: 20, source: 7, target: 1, outValue: 2825.20 },
        { id: 21, source: 7, target: 2, outValue: 1700.60 },
        { id: 22, source: 7, target: 3, outValue: 2601.90 },
        { id: 23, source: 7, target: 4, outValue: 7555.20 },
        { id: 24, source: 7, target: 5, outValue: 3483.60 },
        { id: 25, source: 7, target: 6, outValue: 10357.40 },
        { id: 26, source: 7, target: 8, outValue: 36365 },

        { id: 27, source: 8, target: 5, outValue: 3954.40 },
        { id: 28, source: 8, target: 6, outValue: 10385.70 },

    ]
}


var map = {}
data.nodes.forEach(function (d, i) {
    map[d.id] = i;
})

data.links.forEach(function (d) {
    d.source = map[d.source];
    d.target = map[d.target];
})

var minNodeValue = d3.min(data.nodes, function (d) { return d.inValue; });
var maxNodeValue = d3.max(data.nodes, function (d) { return d.inValue; });

var nodeScale = d3.scale.linear().domain([minNodeValue, maxNodeValue]).range([15, 50]); // change min and max values of nodes

var minLinkValue = d3.min(data.links, function (d) { return d.outValue; });
var maxLinkValue = d3.max(data.links, function (d) { return d.outValue; });

const rangeElement = document.querySelector('#range')
rangeElement.min = minLinkValue - 10;
rangeElement.max = maxLinkValue + 10;

var linkScale = d3.scale.linear().domain([minLinkValue, maxLinkValue]).range([2, 14]); // change min and max values of links

var width = 800,
    height = 900;

var force = d3.layout.force()
    .nodes(data.nodes)
    .links(data.links)
    .size([width - 200, height - 200])
    .start();

// evenly spaces nodes along arc
var circleCoord = function (node, index, num_nodes) {
    var circumference = circle.node().getTotalLength();
    var pointAtLength = function (l) { return circle.node().getPointAtLength(l) };
    var sectionLength = (circumference) / num_nodes;
    var position = sectionLength * index + sectionLength / 2;
    return pointAtLength(circumference - position)
}

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
var groupContainer = svg.append("g")
    .attr("transform", `translate(150, 150)`)

var arrowColorsUpdate = function (event, link, node) {
    if (event === 'out') {
        return '#ccc';
    }
    if (link.source === node) {
        return "red"
    } else if (link.target === node) {
        return "green"
    }
}
// fades out lines that aren't connected to node d
var is_connected = function (d, opacity, event) {
    lines.transition().style("stroke-opacity", function (o) {
        return o.source === d || o.target === d ? 1 : opacity;
    })
        .style("stroke", function (o) {
            return arrowColorsUpdate(event, o, d);
        });
    markers.transition().style("fill-opacity", function (o) {
        return o.source === d || o.target === d ? 1 : opacity;
    }).style('fill', function (o) {
        return arrowColorsUpdate(event, o, d);
    });

}


var dim = width - 334
var circle = groupContainer.append("path")
    .attr("d", "M 40, " + (dim / 2 + 40) + " a " + dim / 2 + "," + dim / 2 + " 0 1,0 " + dim + ",0 a " + dim / 2 + "," + dim / 2 + " 0 1,0 " + dim * -1 + ",0")
    .attr("id", "outer-circle")
    .style("fill", "none")
// .style('stroke', '#000000')



data.nodes.forEach(function (n, i) {
    var coord = circleCoord(n, i, data.nodes.length)
    n.x = coord.x
    n.y = coord.y
});


var defsContainer = groupContainer.append("svg:defs")
var markers = defsContainer.selectAll("marker")
    .data(data.links)
    .enter().append("marker")
    .attr("id", function (d, i) { return "arrowhead" + d.id; })
    .attr("viewBox", "-5 -5 10 10")
    .attr("refX", 0.8)
    .attr("refY", 0)
    .attr("markerWidth", 53)
    .attr("markerHeight", 21)
    .attr("markerUnits", "userSpaceOnUse")
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr("fill", "#ccc");

function calculateX(tx, ty, sx, sy, radius) {
    if (tx == sx) return tx;                 //if the target x == source x, no need to change the target x.
    var xLength = Math.abs(tx - sx);    //calculate the difference of x
    var yLength = Math.abs(ty - sy);    //calculate the difference of y
    //calculate the ratio using the trigonometric function
    var ratio = radius / Math.sqrt(xLength * xLength + yLength * yLength);
    if (tx > sx) return tx - xLength * ratio;    //if target x > source x return target x - radius
    if (tx < sx) return tx + xLength * ratio;    //if target x < source x return target x + radius
}
function calculateY(tx, ty, sx, sy, radius) {
    if (ty == sy) return ty;                 //if the target y == source y, no need to change the target y.
    var xLength = Math.abs(tx - sx);    //calculate the difference of x
    var yLength = Math.abs(ty - sy);    //calculate the difference of y
    //calculate the ratio using the trigonometric function
    var ratio = radius / Math.sqrt(xLength * xLength + yLength * yLength);
    if (ty > sy) return ty - yLength * ratio;   //if target y > source y return target x - radius
    if (ty < sy) return ty + yLength * ratio;   //if target y > source y return target x - radius
}

var linksContainer = groupContainer.append('g').attr("class", "links-container");
var lines = linksContainer.selectAll("line")
    .data(data.links).enter().append("line")
    //     .attr("class", "node-link")
    .attr("x1", function (d) { return d.source.x; })
    .attr("y1", function (d) { return d.source.y; })
    .attr("x2", function (d) {
        return calculateX(d.target.x, d.target.y, d.source.x, d.source.y, nodeScale(d.target.inValue) + 30);
    })
    .attr("y2", function (d) {
        return calculateY(d.target.x, d.target.y, d.source.x, d.source.y, nodeScale(d.target.inValue) + 30);
    })
    .attr("marker-end", function (d, i) { return "url(#" + 'arrowhead' + d.id + ")"; })
    .attr("stroke-width", function (d) { return linkScale(d.outValue) })
    .attr("stroke", "#ccc")


linksContainer.selectAll(".arrow")
    .data(data.links).enter().append("line")
    //     .attr("class", "node-link")
    .attr("x1", function (d) {
        return calculateX(d.target.x, d.target.y, d.source.x, d.source.y, nodeScale(d.target.inValue) - 28);
    })
    .attr("y1", function (d) {
        return calculateY(d.target.x, d.target.y, d.source.x, d.source.y, nodeScale(d.target.inValue) - 28);
    })
    .attr("x2", function (d) {
        return calculateX(d.target.x, d.target.y, d.source.x, d.source.y, nodeScale(d.target.inValue) + 30);
    })
    .attr("y2", function (d) {
        return calculateY(d.target.x, d.target.y, d.source.x, d.source.y, nodeScale(d.target.inValue) + 30);
    })
    .attr("stroke-width", '19px')
    .attr("stroke", "transparent")
    .on('mouseenter', function () {
        console.log('mouseenterevent');
    });

var gnodes = groupContainer.selectAll('g.gnode')
    .data(data.nodes).enter().append('g')
    .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")"
    })
    .classed('gnode', true);

var nodesPadding = gnodes.append("circle")
    .attr("id", function (d) {
        return "node" + d.id;
    })
    .attr("r", function (d) { return nodeScale(d.inValue) + 10 })
    .attr("fill", "#ffffff");

var node = gnodes.append("circle")
    .attr("r", function (d) { return nodeScale(d.inValue) })
    .attr('fill', function (d) { return d.color })
    .attr("class", "node")
    .attr("stroke", "#ffffff")
    .on("mouseenter", function (d) {
        is_connected(d, 0.1, 'in');
        node.transition().duration(100).attr("r", function (d) { return nodeScale(d.inValue) })
        d3.select(this).transition().duration(100).attr("r", function (d) { return nodeScale(d.inValue) + 5; })
    })
    .on("mouseleave", function (d) {
        is_connected(d, 1, "out");
        node.transition().duration(100).attr("r", function (d) { return nodeScale(d.inValue) });
    });

var labels = gnodes.append("text")
    .attr("x", function (d) {
        console.log(d);
        var x = + d.x,
            nodeHalfWidth = d3.select("#node" + d.id).node().getBBox().width / 2;
        outerCircleHalfWidth = d3.select("#outer-circle").node().getBBox().width / 2
        return d.x > outerCircleHalfWidth ? nodeHalfWidth : - nodeHalfWidth;
    }
    )
    .attr('fill', "#000000")
    .attr('title', function (d) {
        return d.name;
    })
    .style("text-anchor", function (d) {
        return d.x < outerCircleHalfWidth ? "end" : "start";
    })
    .text(function (d) {
        return d.name.length > 10 ? d.name.substring(0, 10) + '...' : d.name;
    })

var legends = svg.append('g')
    .attr('id', 'legends-container')
    .attr('transform', `translate(50,${height - 128})`)

legends.append('circle')
    .attr('r', '10')
    .attr('fill', 'none')
    .attr('stroke', '#ccc')
    .attr('stroke-width', 3)


legends.append('circle')
    .attr('r', '10')
    .attr('cy', 30)
    .attr('fill', '#5ccab9')


legends.append('circle')
    .attr('r', '10')
    .attr('cy', 60)
    .attr('fill', '#ec545a')


legends.append("line")
    .attr("class", "node-link")
    .attr("x1", -7)
    .attr("y1", 90)
    .attr("x2", 15)
    .attr("y2", 90)
    .attr("stroke", "#ccc")

    .attr('stroke-width', 10)
legends.append("svg:path")
    .attr('transform', `translate(15, 90)`)
    .attr("d", "M0,-10L15,0L0,10")
    .attr("fill", "#ccc")


legends.selectAll('text')
    .data(data.legends)
    .enter()
    .append('text')
    .attr('x', 50)
    .attr('y', function (d, i) {
        return i * 30;
    })
    .text(function (d, i) {
        return d.name;
    })
    .style("alignment-baseline", "middle")

function updateLinks(event) {
    // data.links
    data.nodes.forEach(function (n, i) {
        var coord = circleCoord(n, i, data.nodes.length)
        n.x = coord.x
        n.y = coord.y
    });
    const dataLinks = data.links.filter(function (value) {

        return value.outValue >= parseFloat(event.target.value)
    });
    force.links(dataLinks);
    lines = linksContainer.selectAll("line")
        .data(dataLinks);


    lines.exit().remove();

    lines.enter().append("line");


    lines.attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) {
            return calculateX(d.target.x, d.target.y, d.source.x, d.source.y, nodeScale(d.target.inValue) + 30);
        })
        .attr("y2", function (d) {
            return calculateY(d.target.x, d.target.y, d.source.x, d.source.y, nodeScale(d.target.inValue) + 30);
        })
        .attr("marker-end", function (d, i) { return "url(#" + 'arrowhead' + d.id + ")"; })
        .attr("stroke-width", function (d) { return linkScale(d.outValue) })
        .attr("stroke", "#ccc");

    force.start();
}