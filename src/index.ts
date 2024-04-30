import Graph from "./Graph";
import { belmanFord, dijkstra } from "./ShortestPathAlgorithms";
import { generateRandomGraph, generateRandomGraph1, readGraphFromFile, saveGraphToFile, saveResults } from "./utils";
import yargs from "yargs";

const argv: any = yargs(process.argv.slice(2))
    .option('numberOfNodes', {
        alias: 'nn',
        describe: 'Number of nodes in the graph',
        type: 'number',
        default: 10
    })
    .option('numberOfArcs', {
        alias: 'na',
        describe: 'Number of arcs in the graph',
        type: 'number',
        default: 20
    })
    .option('iterations', {
        alias: 'i',
        describe: 'Number of iterations',
        type: 'number',
        default: 100
    })
    .help()
    .alias('help', 'h')
    .argv;

const { numberOfNodes, numberOfArcs, iterations } = argv;

// const asd = {
//     1: { 2: 1, 3: 4 },      
//     2: { 1: 1, 3: 2, 4: 5 },
//     3: { 1: 4, 2: 2, 4: 1 },
//     4: { 2: 5, 3: 1 }
// };
// const graph = new Graph(asd);


let graphData = readGraphFromFile()
if (!graphData || numberOfNodes || numberOfArcs) {
    graphData = generateRandomGraph1(numberOfNodes, numberOfArcs);
    // graph = new Graph(g);
    saveGraphToFile(graphData, "graph");
} 

const results: {
    algorithm: string,
    result: any,
    time: number[],
    averageTime: number
}[] = [];

const graph = new Graph(graphData)

results.push({
    algorithm: "Dijkstra",
    result: dijkstra(graph, "1"),
    time: [],
    averageTime: 0
});

results.push({
    algorithm: "Bellman-Ford",
    result: belmanFord(graph, "1"),
    time: [],
    averageTime: 0
});

for (let i = 0; i < iterations; i++) {
    const startTimeDijkstra = performance.now();
    dijkstra(graph, "1");
    results[0].time.push(performance.now() - startTimeDijkstra);
    
    const startTimeBelman = performance.now();
    belmanFord(graph, "1");
    results[1].time.push(performance.now() - startTimeBelman);

    if(i === iterations - 1) {
        results[0].averageTime = results[0].time.reduce((prev, curr) => prev + curr, 0) / results[0].time.length
        results[1].averageTime = results[1].time.reduce((prev, curr) => prev + curr, 0) / results[1].time.length
    }
}



console.log(results);




saveResults(results, argv);




// Example: Find shortest distances from node A to all other nodes in the graph
const gr = readGraphFromFile();
// const g1 = generateRandomGraph(10, 20);
// saveGraphToFile(new Graph(g1), "graph1");

//let g = new Graph(graph);
// console.log(dijkstra(g, "A")); // Outputs: { A: 0, B: 1, C: 3, D: 4 }
// console.log(dijkstra(g, "C")); // Outputs: { C: 0, A: 4, B: 3, D: 2 }
// console.log(dijkstra(g, "D")); // Outputs: { C: 0, A: 4, B: 3, D: 2 }
// console.log(belmanFord(g, "A"));
// console.log(belmanFord(g, "C"));
// console.log(belmanFord(g, "D")); // Outputs: { C: 0, A: 4, B: 3, D: 2 }
// console.log(2)