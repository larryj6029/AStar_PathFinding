/*  Node.g = cost to get to node
    Node.h = estimated cost from node to end goal
    Node.f = Total estimated cost
*/
/**
 * Performs the a* algorithm that will return the shortest path 
 * the finish node starting at the beginning node.
 */
export function aStar(grid, startNode, finishNode) {
    let open = [];
    const closed = [];
    startNode.isVisited = !startNode.isVisited;
    startNode.g = 0;
    startNode.f += movementCost(startNode, finishNode);
    add(open, startNode);
    while (!!open.length) {
        const curr = open.shift();
        if (curr.col === finishNode.col && curr.row === finishNode.row) break;
        if (curr.isWall) continue;
        else {
            const neighbors = updateNeighbors(curr, grid);
            for (const node of neighbors) {
                closed.push(curr);
                node.isVisited = true;
                console.log(node.col + ", " + node.row);
                node.g = curr.g + 1;
                node.h = movementCost(node, finishNode);
                node.f = node.g + node.h;
                if (node.f <= curr.f && closed.includes(node)) {
                    closed.unshift(node);
                } else if (curr.f <= node.f && open.includes(node)) {
                    add(open, curr);
                    closed.unshift(curr);
                } else if (!open.includes(node) && !closed.includes(node)) {
                    add(open, node);
                }
            }
        }
    }
    return closed;
}

function updateNeighbors(node, grid) {
    const unvisited = getUnvisistedNeighbors(node, grid);
    for (const neighbor of unvisited) {
        neighbor.previousNode = node;
    }
    return unvisited;
}


function getUnvisistedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}



function movementCost(node, finish) {
    return Math.abs(node.row - finish.row) + Math.abs(node.col - finish.col);
}

function add(open, node) {
    var contain = false;
    for (let i = 0; i < open.length; i++) {
        if (open[i].f > node.f) {
            open.splice(i, 0, node);
            contain = true;
            break;
        }
    }
    if (!contain) {
        open.push(node);
    }

    return open;
}


export function getNode(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
} 