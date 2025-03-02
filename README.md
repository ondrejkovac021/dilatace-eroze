# Dilatace a eroze v 2D poli

## Popis úlohy

Tento projekt implementuje základní morfologické operace dilatace a eroze na dvourozměrném poli (matici) v JavaScriptu. Matice je pevně daná 9x9 s hodnotami od 0 do 4, přičemž ve středu je nejvyšší hodnota (4) a směrem k okrajům se hodnoty snižují na 0.

## Inicializace matice `image2d`

Matice `image2d`:

```javascript
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
```

Vstupní matice:

```
0 0 0 0 0 0 0 0 0
0 1 1 1 1 1 1 1 0
0 1 2 2 2 2 2 1 0
0 1 2 3 3 3 2 1 0
0 1 2 3 4 3 2 1 0
0 1 2 3 3 3 2 1 0
0 1 2 2 2 2 2 1 0
0 1 1 1 1 1 1 1 0
0 0 0 0 0 0 0 0 0
```

## Implementace operací

### Dilatace

Každý prvek matice se nahradí maximální hodnotou ze sousedních prvků (nahoře, dole, vlevo, vpravo).

```javascript
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
```

### Eroze

Každý prvek matice se nahradí minimální hodnotou ze sousedních prvků (nahoře, dole, vlevo, vpravo).

```javascript
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
```
### Výpis matic postupně podle operací

```javascript
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
```

## Testování

Následující operace v tomto pořadí:

1. **Dilatace** `→` 2. **Eroze** `→` 3. **Eroze** `→` 4. **Dilatace**

Výsledné matice:

### Po první dilataci:

```
| 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 |
| 1 | 1 | 2 | 2 | 2 | 2 | 2 | 1 | 1 |
| 1 | 2 | 2 | 3 | 3 | 3 | 2 | 2 | 1 |
| 1 | 2 | 3 | 3 | 4 | 3 | 3 | 2 | 1 |
| 1 | 2 | 3 | 4 | 4 | 4 | 3 | 2 | 1 |
| 1 | 2 | 3 | 3 | 4 | 3 | 3 | 2 | 1 |
| 1 | 2 | 2 | 3 | 3 | 3 | 2 | 2 | 1 |
| 1 | 1 | 2 | 2 | 2 | 2 | 2 | 1 | 1 |
| 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 |
```

### Po první erozi:

```
| 0 | 0 | 1 | 1 | 1 | 1 | 1 | 0 | 0 |
| 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 |
| 1 | 1 | 2 | 2 | 2 | 2 | 2 | 1 | 1 |
| 1 | 1 | 2 | 3 | 3 | 3 | 2 | 1 | 1 |
| 1 | 1 | 2 | 3 | 4 | 3 | 2 | 1 | 1 |
| 1 | 1 | 2 | 3 | 3 | 3 | 2 | 1 | 1 |
| 1 | 1 | 2 | 2 | 2 | 2 | 2 | 1 | 1 |
| 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 |
| 0 | 0 | 1 | 1 | 1 | 1 | 1 | 0 | 0 |
```

### Po druhé erozi:

```
| 0 | 0 | 0 | 1 | 1 | 1 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 1 | 1 | 1 | 0 | 0 |
| 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 |
| 1 | 1 | 1 | 2 | 2 | 2 | 1 | 1 | 1 |
| 1 | 1 | 1 | 2 | 3 | 2 | 1 | 1 | 1 |
| 1 | 1 | 1 | 2 | 2 | 2 | 1 | 1 | 1 |
| 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 |
| 0 | 0 | 1 | 1 | 1 | 1 | 1 | 0 | 0 |
| 0 | 0 | 0 | 1 | 1 | 1 | 0 | 0 | 0 |
```

### Po druhé dilataci (výsledná matice):

```
| 0 | 0 | 1 | 1 | 1 | 1 | 1 | 0 | 0 |
| 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 |
| 1 | 1 | 1 | 2 | 2 | 2 | 1 | 1 | 1 |
| 1 | 1 | 2 | 2 | 3 | 2 | 2 | 1 | 1 |
| 1 | 1 | 2 | 3 | 3 | 3 | 2 | 1 | 1 |
| 1 | 1 | 2 | 2 | 3 | 2 | 2 | 1 | 1 |
| 1 | 1 | 1 | 2 | 2 | 2 | 1 | 1 | 1 |
| 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 |
| 0 | 0 | 1 | 1 | 1 | 1 | 1 | 0 | 0 |
```


