import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
const SudokuGrid = ({ sudokuGrid, setSudokuGrid }) => {

  const handleChange = (row, col, value) => {
    const newGrid = sudokuGrid.map((val, rowIndex) =>
      val.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? Number(value) : cell
      )
    );
    setSudokuGrid(newGrid);
  };

  return (
    <View style={styles.container}>
      {sudokuGrid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <TextInput
            style={styles.item}
            key={`${rowIndex}+${colIndex}`}
            keyboardType="number-pad"
            value={cell === 0 ? "" : String(cell)}
            onChangeText={(value) => handleChange(rowIndex, colIndex, value)}
            min="1"
            max="9"
          />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 5,
  },
  item: {
    width: "10.6%",
    aspectRatio: 1,
    marginBottom: 4,
    borderWidth: 1,
    textAlign: "center",
  },
});

export default SudokuGrid;
