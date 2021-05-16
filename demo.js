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

d3_dags.init('body', data);