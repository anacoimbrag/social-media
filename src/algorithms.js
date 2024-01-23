/**
 * Calculate the shortest connection distance between two users based on Djikstra algorithm
 * @param {Object} connections 
 * @param {Number} start 
 * @param {Number} destination 
 * @returns 
 */
export const shortestDistance = (connections, start, destination) => {
    let distances = {}
    const visited = []
    const nodes = Object.keys(connections)

    nodes.forEach(node => {
        distances[node] = node == start ? 0 : Infinity
    })

    while (nodes.length > 0) {
        const nextNode = nodes.shift()

        visited.push(nextNode)

        for (let connection of connections[nextNode]) {
            if (!visited.includes(connection)) {
                const newDistance = distances[nextNode] == Infinity ? 1 : distances[nextNode] + 1

                if (newDistance < distances[connection])
                    distances[connection] = newDistance
            }
        }
    }

    return distances[destination]
}