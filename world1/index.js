console.log("d3", d3);

const runAsync = async () => {
    const data = await d3.csv("data.csv");
    const margin = {
        top: 20,
        right: 20,
        bottom: 70,
        left: 40
    };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
        .select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    const xAxis = d3.scaleLinear()
        .domain([0, 1000])
        .range([0, width]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xAxis));

    const histogram = d3.histogram()
        .value(function (i) {
            return i.price;
        })
        .domain(xAxis.domain())
        .thresholds(xAxis.ticks(70));

    var bins = histogram(data);
    console.log(bins);

    const yAxis = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([height, 0]);

    svg.append("g")
        .call(d3.axisLeft(yAxis));
};

runAsync();