"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const chordCategories = {
  Major: {
    "A Major": "/chords/a_major.png",
    "A# Major": "/chords/a_sharp_major.png",
    "B Major": "/chords/b_major.png",
    "C Major": "/chords/c_major.png",
    "C# Major": "/chords/c_sharp_major.png",
    "D Major": "/chords/d_major.png",
    "D# Major": "/chords/d_sharp_major.png",
    "E Major": "/chords/e_major.png",
    "F Major": "/chords/f_major.png",
    "F# Major": "/chords/f_sharp_major.png",
    "G Major": "/chords/g_major.png",
    "G# Major": "/chords/g_sharp_major.png",
  },
  Minor: {
    "A Minor": "/chords/a_minor.png",
    "A# Minor": "/chords/a_sharp_minor.png",
    "B Minor": "/chords/b_minor.png",
    "C Minor": "/chords/c_minor.png",
    "C# Minor": "/chords/c_sharp_minor.png",
    "D Minor": "/chords/d_minor.png",
    "D# Minor": "/chords/d_sharp_minor.png",
    "E Minor": "/chords/e_minor.png",
    "F Minor": "/chords/f_minor.png",
    "F# Minor": "/chords/f_sharp_minor.png",
    "G Minor": "/chords/g_minor.png",
    "G# Minor": "/chords/g_sharp_minor.png",
  }
}

type ChordCategory = keyof typeof chordCategories;

export default function ChordDiagram() {
  const [selectedCategory, setSelectedCategory] = useState<ChordCategory>("Major")
  const [selectedChord, setSelectedChord] = useState<string>(Object.keys(chordCategories[selectedCategory])[0])

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Guitar Chord Diagram</h3>
      
      {/* Chord Type Selection */}
      <Select onValueChange={(value) => {
        const category = value as ChordCategory;
        setSelectedCategory(category);
        const firstChord = Object.keys(chordCategories[category])[0];
        setSelectedChord(firstChord);
      }} defaultValue={selectedCategory}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select chord type" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(chordCategories).map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {/* Chord Selection */}
      <Select onValueChange={setSelectedChord} value={selectedChord}>
        <SelectTrigger className="w-full mt-4">
          <SelectValue placeholder="Select a chord" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(chordCategories[selectedCategory]).map((chord) => (
            <SelectItem key={chord} value={chord}>
              {chord}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {/* Chord Diagram */}
      <div className="mt-4 flex justify-center">
        <img src={chordCategories[selectedCategory][selectedChord as keyof typeof chordCategories[ChordCategory]]} alt={selectedChord} className="w-48 h-auto" />
      </div>
    </div>
  )
}
