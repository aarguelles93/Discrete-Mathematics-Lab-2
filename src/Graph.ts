class Graph {
    private graph: { [key: string]: { [key: string]: number } } = {};

    constructor(graph: { [key: string]: { [key: string]: number } } = {}) {
        Object.assign(this.graph, graph);
    }

    addNode(node: string) {
        if (!this.graph[node]) {
            this.graph[node] = {};
        }
    }

    addEdge(from: string, to: string, weight: number) {
        if (!this.graph[from]) {
            this.addNode(from);
        }
        this.graph[from][to] = weight;
    }

    getNodes(): string[] {
        return Object.keys(this.graph);
    }

    getNeighbors(node: string): string[] {
        return Object.keys(this.graph[node] || {});
    }

    getWeight(from: string, to: string): number {
        return this.graph[from][to];
    }
}

export default Graph;