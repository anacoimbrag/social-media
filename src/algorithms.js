'use strict'

export const shortestDistance = (graph, start, destination) => {
    let distances = {}
    const visited = []
    const nodes = Object.keys(graph)

    nodes.forEach(node => {
        distances[node] = node == start ? 0 : Infinity
    })

    while (nodes.length > 0) {
        const nextNode = nodes.shift()

        visited.push(nextNode)

        for (let connection of graph[nextNode]) {
            if (!visited.includes(connection)) {
                const newDistance = distances[nextNode] == Infinity ? 1 : distances[nextNode] + 1

                if (newDistance < distances[connection])
                    distances[connection] = newDistance
            }
        }
    }

    return distances[destination]
}