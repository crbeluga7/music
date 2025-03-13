"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const majorScales = {
  "A Major": ["A", "B", "C#", "D", "E", "F#", "G#", "A"],
  "A# Major": ["A#", "C", "D", "D#", "F", "G", "A", "A#"],
  "B Major": ["B", "C#", "D#", "E", "F#", "G#", "A#", "B"],
  "C Major": ["C", "D", "E", "F", "G", "A", "B", "C"],
  "C# Major": ["C#", "D#", "F", "F#", "G#", "A#", "C", "C#"],
  "D Major": ["D", "E", "F#", "G", "A", "B", "C#", "D"],
  "D# Major": ["D#", "F", "G", "G#", "A#", "C", "D"],
  "E Major": ["E", "F#", "G#", "A", "B", "C#", "D#", "E"],
  "F Major": ["F", "G", "A", "A#", "C", "D", "E", "F"],
  "F# Major": ["F#", "G#", "A#", "B", "C#", "D#", "F", "F#"],
  "G Major": ["G", "A", "B", "C", "D", "E", "F#", "G"],
  "G# Major": ["G#", "A#", "C", "C#", "D#", "F", "G", "G#"],
} as const;

const minorScales = {
  "A Minor": ["A", "B", "C", "D", "E", "F", "G", "A"],
  "A# Minor": ["A#", "C", "C#", "D#", "F", "F#", "G#", "A#"],
  "B Minor": ["B", "C#", "D", "E", "F#", "G", "A", "B"],
  "C Minor": ["C", "D", "D#", "F", "G", "G#", "A#", "C"],
  "C# Minor": ["C#", "D#", "E", "F#", "G#", "A", "B", "C#"],
  "D Minor": ["D", "E", "F", "G", "A", "A#", "C", "D"],
  "D# Minor": ["D#", "F", "F#", "G#", "A#", "B", "C#", "D#"],
  "E Minor": ["E", "F#", "G", "A", "B", "C", "D", "E"],
  "F Minor": ["F", "G", "G#", "A#", "C", "C#", "D#", "F"],
  "F# Minor": ["F#", "G#", "A", "B", "C#", "D", "E", "F#"],
  "G Minor": ["G", "A", "A#", "C", "D", "D#", "F", "G"],
  "G# Minor": ["G#", "A#", "B", "C#", "D#", "E", "F#", "G#"],
} as const;

type ScaleType = "major" | "minor";

export default function ScaleExercise() {
  const [scaleType, setScaleType] = useState<ScaleType>("major");
  const [selectedScale, setSelectedScale] = useState<keyof typeof majorScales>("A Major");
  const [currentNote, setCurrentNote] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Determine the current scales set
  const scales = scaleType === "major" ? majorScales : minorScales;

  // Ensure selectedScale exists in the current scale type
  const validSelectedScale = selectedScale in scales ? selectedScale : (Object.keys(scales)[0] as keyof typeof scales);
  const scaleNotes = (scales as Record<string, readonly string[]>)[validSelectedScale] ?? [];

  // Stop the scale
  const stopScale = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsPlaying(false);
    setCurrentNote(0);
  };

  // Play the scale
  const playScale = () => {
    stopScale(); // Ensure any existing playback stops first
    setIsPlaying(true);
    let noteIndex = 0;

    const newInterval = setInterval(() => {
      if (noteIndex < scaleNotes.length) {
        console.log(`Playing ${scaleNotes[noteIndex]}`);
        setCurrentNote(noteIndex);
        noteIndex++;
      } else {
        stopScale();
      }
    }, 1000);

    setIntervalId(newInterval);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Scale Exercise</h3>
      <div className="space-y-4">
        {/* Scale Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Scale Type
          </label>
          <Select
            value={scaleType}
            onValueChange={(val) => {
              stopScale(); // Stop playing when changing scale type
              const newType = val as ScaleType;
              setScaleType(newType);
              setSelectedScale(Object.keys(newType === "major" ? majorScales : minorScales)[0] as keyof typeof scales);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select scale type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="major">Major</SelectItem>
              <SelectItem value="minor">Minor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Scale Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Scale
          </label>
          <Select
            value={validSelectedScale}
            onValueChange={(val) => {
              stopScale(); // Stop playing when changing the scale
              setSelectedScale(val as keyof typeof scales);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a scale" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(scales).map((scale) => (
                <SelectItem key={scale} value={scale}>
                  {scale}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Notes Display */}
        <div className="flex justify-center space-x-2">
          {scaleNotes.map((note, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index === currentNote && isPlaying ? "bg-indigo-500 text-white" : "bg-gray-200"
              }`}
            >
              {note}
            </div>
          ))}
        </div>

        {/* Play & Stop Buttons */}
        <div className="flex space-x-4">
          <Button onClick={playScale} disabled={isPlaying} className="w-full">
            {isPlaying ? "Playing..." : "Play Scale"}
          </Button>
          {isPlaying && (
            <Button onClick={stopScale} className="w-full" variant="outline">
              Stop
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
