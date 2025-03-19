"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const instrumentCategories = ["Strings", "Woodwinds", "Brass", "Percussion", "Keyboard", "Electronic"];

const instruments = {
  Strings: ["Violin", "Cello", "Guitar", "Harp"],
  Woodwinds: ["Flute", "Clarinet", "Saxophone", "Oboe"],
  Brass: ["Trumpet", "Trombone", "French Horn", "Tuba"],
  Percussion: ["Drums", "Xylophone", "Timpani", "Cymbals"],
  Keyboard: ["Piano", "Organ"],
  Electronic: ["Synthesizer", "Drum Machine", "Sampler"],
};

export default function SoundLibrary() {
  const [category, setCategory] = useState(instrumentCategories[0]);
  const [instrument, setInstrument] = useState(instruments[category as keyof typeof instruments][0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const stopAudio = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const playSound = () => {
    stopAudio();
    
    // Replace spaces with hyphens but keep the original case
    const fileName = instrument.replace(/\s+/g, "-") + ".mp3"; 
    const audioPath = /music/${fileName};

    const newAudio = new Audio(audioPath);
    
    newAudio.play()
      .then(() => setIsPlaying(true))
      .catch((error) => {
        console.error("Error playing audio:", error);
        alert("Audio file not found or cannot be played.");
      });

    newAudio.onended = () => setIsPlaying(false);
    setAudio(newAudio);
  };

  const pauseSound = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch((error) => console.error("Error resuming audio:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Sound Library</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <Select
            value={category}
            onValueChange={(value) => {
              stopAudio();
              setCategory(value);
              setInstrument(instruments[value as keyof typeof instruments][0]);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {instrumentCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Instrument</label>
          <Select
            value={instrument}
            onValueChange={(value) => {
              stopAudio();
              setInstrument(value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an instrument" />
            </SelectTrigger>
            <SelectContent>
              {instruments[category as keyof typeof instruments].map((inst) => (
                <SelectItem key={inst} value={inst}>
                  {inst}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-4">
          <Button onClick={playSound} disabled={isPlaying} className="w-full">
            {isPlaying ? "Playing..." : "Play Sound"}
          </Button>
          {isPlaying && (
            <Button onClick={pauseSound} className="w-full">
              {isPlaying ? "Pause" : "Resume"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
