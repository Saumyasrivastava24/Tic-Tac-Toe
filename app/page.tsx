"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [winner, setWinner] = useState<string | null>(null)

  useEffect(() => {
    const calculatedWinner = calculateWinner(board)
    setWinner(calculatedWinner)
  }, [board])

  const handleClick = (index: number) => {
    if (winner || board[index]) return

    const newBoard = board.slice()
    newBoard[index] = xIsNext ? "'X'" : "'O'"
    setBoard(newBoard)
    setXIsNext(!xIsNext)
  }

  const renderSquare = (index: number) => (
    <motion.button
      className="w-full h-full bg-white bg-opacity-30 rounded-lg shadow-md flex items-center justify-center text-4xl font-bold transition-all duration-300 hover:bg-opacity-40 focus:outline-none"
      onClick={() => handleClick(index)}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      {board[index] === "'X'" && <XSymbol />}
      {board[index] === "'O'" && <OSymbol />}
    </motion.button>
  )

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setXIsNext(true)
    setWinner(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Tic Tac Toe</h1>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {board.map((_, index) => (
            <div key={index} className="aspect-square">
              {renderSquare(index)}
            </div>
          ))}
        </div>
        <div className="text-center mb-4">
          <p className="text-xl font-semibold text-gray-800">
            {winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? "'X'" : "'O'"}`}
          </p>
        </div>
        <button
          className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-colors duration-300"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </div>
    </div>
  )
}

function XSymbol() {
  return (
    <motion.svg
      className="w-12 h-12 text-indigo-600"
      viewBox="0 24"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "'spring'", stiffness: 260, damping: 20 }}
    >
      <motion.path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d="M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.svg>
  )
}

function OSymbol() {
  return (
    <motion.svg
      className="w-12 h-12 text-pink-500"
      viewBox="0 24"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "'spring'", stiffness: 260, damping: 20 }}
    >
      <motion.circle
        cx="12"
        cy="12"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.svg>
  )
}

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

