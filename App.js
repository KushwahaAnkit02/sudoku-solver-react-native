import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ihandleValidSudoku, solveSudoku } from "./components/SudokuValidation";
import SudokuGrid from "./components/SudokuGrid";

const App = () => {
  const [sudokuGrid, setSudokuGrid] = useState(Array(9).fill(Array(9).fill(0)));
  const [message, setMessage] = useState("");

  const handleValidate = () => {
    if (ihandleValidSudoku(sudokuGrid)) {
      setMessage("The Sudoku puzzle is valid.");
    } else {
      setMessage("The Sudoku puzzle is invalid.");
    }
  };

  const handleSolve = () => {
    if (ihandleValidSudoku(sudokuGrid)) {
      const solvedGrid = solveSudoku(sudokuGrid);
      setSudokuGrid(solvedGrid);
      setMessage("The Sudoku puzzle has been solved.");
    } else {
      setMessage("Cannot solve an invalid Sudoku puzzle.");
    }
  };
  const handleResetSudoku = () => {
    setSudokuGrid(Array(9).fill(Array(9).fill(0)));
    setMessage("sudoku reset");
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  return (
    <View
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4"
      style={styles.container}
    >
      <Text>Sudoku Solver</Text>
      <SudokuGrid sudokuGrid={sudokuGrid} setSudokuGrid={setSudokuGrid} />
      <View style={styles.buttons}>
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            padding: 5,
            borderRadius: 5,
          }}
          onPress={handleValidate}
          className="bg-blue-500 text-white px-4 py-2 m-2 rounded"
        >
          <Text style={{ color: "white" }}>Validate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "green", padding: 5, borderRadius: 5 }}
          onPress={handleSolve}
          className="bg-green-500 text-white px-4 py-2 m-2 rounded"
        >
          <Text style={{ color: "white" }}>Solve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "gray", padding: 5, borderRadius: 5 }}
          onPress={handleResetSudoku}
          className="bg-green-500 text-white px-4 py-2 m-2 rounded"
        >
          <Text style={{ color: "white" }}>Reset</Text>
        </TouchableOpacity>
      </View>
      {message && <Text className="text-red-500 mt-4">{message}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
});

export default App;
