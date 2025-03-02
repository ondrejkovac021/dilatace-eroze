const image2d = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 2, 2, 2, 2, 2, 1, 0],
    [0, 1, 2, 3, 3, 3, 2, 1, 0],
    [0, 1, 2, 3, 4, 3, 2, 1, 0],
    [0, 1, 2, 3, 3, 3, 2, 1, 0],
    [0, 1, 2, 2, 2, 2, 2, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function dilatace(image2d) {
    const rows = image2d.length;
    const cols = image2d[0].length;
    const result = Array.from({ length: rows }, () => Array(cols).fill(0));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const neighbors = [
                image2d[i][j],
                image2d[i - 1]?.[j] || 0,
                image2d[i + 1]?.[j] || 0,
                image2d[i][j - 1] || 0,
                image2d[i][j + 1] || 0
            ];
            result[i][j] = Math.max(...neighbors);
        }
    }
    return result;
}

function eroze(image2d) {
    const rows = image2d.length;
    const cols = image2d[0].length;
    const result = Array.from({ length: rows }, () => Array(cols).fill(0));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const neighbors = [
                image2d[i][j],
                image2d[i - 1]?.[j] ?? 4,
                image2d[i + 1]?.[j] ?? 4,
                image2d[i][j - 1] ?? 4,
                image2d[i][j + 1] ?? 4
            ];
            result[i][j] = Math.min(...neighbors);
        }
    }
    return result;
}

let currentImage2d = image2d;

currentImage2d = dilatace(currentImage2d);
console.log("Po první dilataci:");
console.log(toMarkdownTable(currentImage2d));

currentImage2d = eroze(currentImage2d);
console.log("Po erozi na výsledné matici po první dilataci:");
console.log(toMarkdownTable(currentImage2d));

let secondErosionImage2d = eroze(currentImage2d);
console.log("Po druhé erozi na výsledné matici po první erozi:");
console.log(toMarkdownTable(secondErosionImage2d));

let secondDilationImage2d = dilatace(secondErosionImage2d);
console.log("Po druhé dilataci na výsledné matici po druhé erozi:");
console.log(toMarkdownTable(secondDilationImage2d));

function toMarkdownTable(image2d) {
    let table = '| ' + image2d[0].join(' | ') + ' |\n';
    for (let i = 1; i < image2d.length; i++) {
        table += '| ' + image2d[i].join(' | ') + ' |\n';
    }
    return table;
}
