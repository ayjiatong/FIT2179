const charts = [
    {id: "#choropleth-world-map", file: "visualisations/dv2_choropleth_world_map.vg.json"},
    {id: "#choropleth-malaysia-map", file: "visualisations/dv2_choropleth_malaysia_map.vg.json"},
    {id: "#bubble-chart", file: "visualisations/dv2_bubble_chart.vg.json"},
    {id: "#donut-chart", file: "visualisations/dv2_donut_chart.vg.json"},
    {id: "#dumbbell-chart", file: "visualisations/dv2_dumbbell_chart.vg.json"},
    {id: "#heatmap", file: "visualisations/dv2_heatmap.vg.json"},
    {id: "#horizontal-bar-chart", file: "visualisations/dv2_horizontal_bar_chart.vg.json"},
    {id: "#multi-line-chart", file: "visualisations/dv2_multi_line_chart.vg.json"},
    {id: "#scatter-plot", file: "visualisations/dv2_scatter_plot.vg.json"},
    {id: "#slope-chart", file: "visualisations/dv2_slope_chart.vg.json"},
    {id: "#stacked-bar-chart", file: "visualisations/dv2_stacked_bar_chart.vg.json"}
];

charts.forEach(chart => {
    fetch(chart.file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json()
        })
        .then(spec => {
            vegaEmbed(chart.id, spec, {actions: false}).catch(err => {
                console.error(`Error embedding ${chart.id}:`, err);
                const container = document.querySelector(chart.id);
                if (container) {
                    container.innerHTML = `<div style="color:red; padding:1rem;"> Failed to load chart: ${err.message}</div>`;
                }
            });
        })
        .catch(error => {
            console.error(`Error loading ${chart.file}:`, error);
            const container = document.querySelector(chart.id);
            if (container) {
                    container.innerHTML = `<div style="color:red; padding:1rem;"> Failed to load chart: ${chart.file}</div>`;
            }
        });
})

