"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const strings = ["E", "A", "D", "G"]
const frets = [0, 1, 2, 3, 4, 5]

export default function BassGuitar() {
  const [lastPlayedNote, setLastPlayedNote] = useState("")

  const playNote = (string: string, fret: number) => {
    setLastPlayedNote(`${string}${fret}`)
    // In a real implementation, we would play the actual note sound here
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Bass Guitar Fretboard</h3>
      <div className="flex flex-col space-y-2 mb-4">
        {strings.map((string) => (
          <div key={string} className="flex">
            {frets.map((fret) => (
              <Button
                key={`${string}${fret}`}
                onClick={() => playNote(string, fret)}
                className="w-12 h-12 border border-gray-300 hover:bg-gray-100"
              >
                {`${string}${fret}`}
              </Button>
            ))}
          </div>
        ))}
      </div>
      <p className="text-center">Last played note: {lastPlayedNote || "None"}</p>
    </div>
  )
}

