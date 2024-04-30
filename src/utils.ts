import Graph from "./Graph";

import fs from "fs";
import path from "path";

export function generateRandomGraph(numNodes: number, numArcs: number): { [key: string]: { [key: string]: number } } {
    let graph: { [key: string]: { [key: string]: number } } = {};

    for (let i = 1; i <= numNodes; i++) {
        graph[i.toString()] = {};
    }

    for (let i = 0; i < numArcs; i++) {
        let from = (Math.floor(Math.random() * numNodes) + 1).toString();
        let to = (Math.floor(Math.random() * numNodes) + 1).toString();
        while (from === to) {
            to = (Math.floor(Math.random() * numNodes) + 1).toString();
        }
        let weight = Math.floor(Math.random() * 10) + 1;
        graph[from][to] = weight;
        graph[to] = graph[to] || {};
        graph[to][from] = weight;
    }

    return graph;
}

export function generateRandomGraph1(numberOfNodes: number, numberOfArcs: number): { [key: string]: { [key: string]: number } } {
    const graphData: { [key: string]: { [key: string]: number } } = {};
    const nodes = Array.from({ length: numberOfNodes }, (_, index) => (index + 1).toString());

    // Create empty nodes in the graph
    nodes.forEach(node => {
        graphData[node] = {};
    });

    // Add random arcs
    for (let i = 0; i < numberOfArcs; i++) {
        const fromIndex = Math.floor(Math.random() * numberOfNodes);
        const toIndex = Math.floor(Math.random() * numberOfNodes);
        const weight = Math.floor(Math.random() * 10) + 1; // Random weight from 1 to 10
        const fromNode = nodes[fromIndex];
        const toNode = nodes[toIndex];
        
        if (!graphData[fromNode][toNode]) {
            graphData[fromNode][toNode] = weight;
        }
    }

    return graphData;
}

export function saveGraphToFile(graph: Graph, fileName: string) {
    let graphAsJSON = JSON.stringify(graph);
    let filePath = path.join(__dirname, "..", "assets", fileName + ".json");
    fs.writeFileSync(filePath, graphAsJSON, "utf8");
}

export function readGraphFromFile(): any {
    const assetsPath = path.join(__dirname, "..", "assets");

    // Read directory contents synchronously (consider async alternative for large projects)
    const files = fs.readdirSync(assetsPath);

    // Find the most recent JSON file
    const jsonFile = files
        .filter(file => file.endsWith(".json") && file.startsWith("graph"))
        .sort((a, b) => b.localeCompare(a))[0];

    if (!jsonFile) {
        return undefined; // No JSON file found
    }

    const filePath = path.join(assetsPath, jsonFile);
    const graphData = fs.readFileSync(filePath, "utf8");

    try {
        const parsedData = JSON.parse(graphData)
        return parsedData;
        // const parsedGraph: Graph = new Graph(parsedData.graph);
        // return parsedGraph;
    } catch (error) {
        console.error("Error parsing JSON file:", error);
        return undefined;
    }
}

export function saveResults(results:any, args:any) {
    const date = new Date();
    const filename = `${args.nn}_${args.na}_${args.i}_${date.getFullYear()}_${date.getMonth()}_${date.getDate()}_${date.getHours()}_${date.getMinutes()}.json`;
    fs.writeFileSync(path.join(__dirname, "..", "results", filename), JSON.stringify(results), "utf8");
}
