"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

// Original notes and octaves
const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const octaves = [3, 4, 5];

// Enharmonic equivalents for sharp notes
const sharpToFlatMap: Record<string, string> = {
  "C#": "Db",
  "D#": "Eb",
  "F#": "Gb",
  "G#": "Ab",
  "A#": "Bb",
};

export default function VirtualPiano() {
  const [lastPlayedNote, setLastPlayedNote] = useState("");

  const playNote = (note: string, octave: number) => {
    // Map sharp notes to their equivalent flat notes
    const actualNote = sharpToFlatMap[note] || note;
    const audio = new Audio(`/piano-sounds/${actualNote}${octave}.mp3`); // Path to piano-sounds directory
    audio.play();
    setLastPlayedNote(`${note}${octave}`); // Display last played note
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Virtual Piano</h3>
      <div className="flex flex-col space-y-2 mb-4">
        {octaves.map((octave) => (
          <div key={octave} className="flex">
            {notes.map((note) => (
              <Button
                key={`${note}${octave}`}
                onClick={() => playNote(note, octave)}
                className={`w-8 h-24 flex items-end justify-center pb-1 ${
                  note.includes("#")
                    ? "bg-black text-white -mx-2 z-10 h-16"
                    : "bg-white text-black border border-gray-300"
                } hover:bg-gray-100`}
              >
                {`${note}${octave}`}
              </Button>
            ))}
          </div>
        ))}
      </div>
      <p className="text-center">Last played note: {lastPlayedNote || "None"}</p>
    </div>
  )
}
