export const ihandleValidSudoku = (grid) => {
  const isValidRow = (row) =>
    row.filter((value, index) => value !== 0 && row.indexOf(value) !== index)
      .length === 0;

  const isValidColumn = (colIndex) =>
    isValidRow(grid.map((row) => row[colIndex]));

  const isValidSubgrid = (rowIndex, colIndex) => {
    const values = [];

    for (let rIndex = 0; rIndex < 3; rIndex++) {
      for (let cIndex = 0; cIndex < 3; cIndex++) {
        const value = grid[rowIndex * 3 + rIndex][colIndex * 3 + cIndex];
        if (value !== 0) {
          if (values.includes(value)) return false;
          values.push(value);
        }
      }
    }
    return true;
  };

  for (let rIndex = 0; rIndex < 9; rIndex++) {
    if (!isValidRow(grid[rIndex]) || !isValidColumn(rIndex)) return false;
  }

  for (let rIndex = 0; rIndex < 3; rIndex++) {
    for (let cIndex = 0; cIndex < 3; cIndex++) {
      if (!isValidSubgrid(rIndex, cIndex)) return false;
    }
  }

  return true;
};

export const solveSudoku = (grid) => {
  const findEmptyCell = (grid) => {
    for (let rIndex = 0; rIndex < 9; rIndex++) {
      for (let cIndex = 0; cIndex < 9; cIndex++) {
        if (grid[rIndex][cIndex] === 0) return [rIndex, cIndex];
      }
    }
    return null;
  };

  const isSafe = (grid, row, col, num) => {

    for (let x = 0; x < 9; x++) {
      if (grid[row][x] === num || grid[x][col] === num) return false;
    }

    const startRow = row - (row % 3),
      startCol = col - (col % 3);
    for (let rIndex = 0; rIndex < 3; rIndex++) {
      for (let cIndex = 0; cIndex < 3; cIndex++) {
        if (grid[rIndex + startRow][cIndex + startCol] === num) return false;
      }
    }
    return true;
  };

  const solve = (grid) => {
    const emptyCell = findEmptyCell(grid);
    if (!emptyCell) return true;

    const [row, col] = emptyCell;
    for (let num = 1; num <= 9; num++) {
      if (isSafe(grid, row, col, num)) {
        grid[row][col] = num;
        if (solve(grid)) return true;
        grid[row][col] = 0;
      }
    }
    return false;
  };

  const newGrid = grid.map((row) => [...row]);
  solve(newGrid);
  return newGrid;
};
