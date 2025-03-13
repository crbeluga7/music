"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const arpeggios = {
  "C Major": ["C", "E", "G"],
  "G Major": ["G", "B", "D"],
  "F Major": ["F", "A", "C"],
  "A Minor": ["A", "C", "E"],
  "E Minor": ["E", "G", "B"],
  "D Minor": ["D", "F", "A"],
}

export default function ArpeggioTrainer() {
  const [selectedArpeggio, setSelectedArpeggio] = useState("C Major")
  const [currentNote, setCurrentNote] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [direction, setDirection] = useState("ascending")

  const playArpeggio = () => {
    setIsPlaying(true)
    let noteIndex = 0
    const arpeggio = arpeggios[selectedArpeggio as keyof typeof arpeggios]
    const interval = setInterval(() => {
      if (noteIndex < arpeggio.length * 2 - 1) {
        const currentIndex =
          direction === "ascending" ? noteIndex % arpeggio.length : arpeggio.length - 1 - (noteIndex % arpeggio.length)
        // In a real implementation, we would play the actual note sound here
        console.log(`Playing ${arpeggio[currentIndex]}`)
        setCurrentNote(currentIndex)
        noteIndex++
      } else {
        clearInterval(interval)
        setIsPlaying(false)
        setCurrentNote(0)
      }
    }, 500)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Arpeggio Trainer</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Arpeggio</label>
          <Select value={selectedArpeggio} onValueChange={setSelectedArpeggio}>
            <SelectTrigger>
              <SelectValue placeholder="Select an arpeggio" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(arpeggios).map((arpeggio) => (
                <SelectItem key={arpeggio} value={arpeggio}>
                  {arpeggio}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Direction</label>
          <Select value={direction} onValueChange={setDirection}>
            <SelectTrigger>
              <SelectValue placeholder="Select direction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ascending">Ascending</SelectItem>
              <SelectItem value="descending">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-center space-x-4">
          {arpeggios[selectedArpeggio as keyof typeof arpeggios].map((note, index) => (
            <div
              key={index}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${
                index === currentNote && isPlaying ? "bg-indigo-500 text-white" : "bg-gray-200"
              }`}
            >
              {note}
            </div>
          ))}
        </div>
        <Button onClick={playArpeggio} disabled={isPlaying} className="w-full">
          {isPlaying ? "Playing..." : "Play Arpeggio"}
        </Button>
      </div>
    </div>
  )
}

