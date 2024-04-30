import Graph from "./Graph";

export function dijkstra(graph: Graph, start: string) {
    let distances: { [key: string]: number } = {};
    let visited: Set<string> = new Set();
    let nodes = graph.getNodes();

    for (let node of nodes) {
        distances[node] = Infinity;
    }
    distances[start] = 0;

    while (nodes.length) {
        nodes.sort((a, b) => distances[a] - distances[b]);
        let closestNode: string = nodes.shift() || '';

        if (distances[closestNode] === Infinity) break;

        visited.add(closestNode);

        for (let neighbor of graph.getNeighbors(closestNode)) {
            if (!visited.has(neighbor)) {
                let newDistance = distances[closestNode] + graph.getWeight(closestNode, neighbor);
                if (newDistance < distances[neighbor]) {
                    distances[neighbor] = newDistance;
                }
            }
        }
    }

    return distances;
}

export function belmanFord(graph: Graph, start: string) {
    let distances: { [key: string]: number } = {};
    let prev: { [key: string]: string | null } = {};
    let nodes = graph.getNodes();

    for (let node of nodes) {
        distances[node] = Infinity;
        prev[node] = null;
    }
    distances[start] = 0;

    for (let i = 0; i < nodes.length - 1; i++) {
        for (let node of nodes) {
            for (let neighbor of graph.getNeighbors(node)) {
                if (distances[node] + graph.getWeight(node, neighbor) < distances[neighbor]) {
                    distances[neighbor] = distances[node] + graph.getWeight(node, neighbor);
                    prev[neighbor] = node;
                }
            }
        }
    }

    for (let node of nodes) {
        let distance = distances[node];
        let path: string[] = [];
        while (prev[node]) {
            path.unshift(node);
            node = prev[node] || '';
        }
        if (distance === Infinity) break;
        // if (path.length) console.log(`Shortest path from ${start} to ${node} via ${path.join(" -> ")} is ${distance}`);
    }

    return { distances, prev };
}