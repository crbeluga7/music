"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const drumSounds = [
  { name: "Kick", key: "Q", file: "/drum_samples/Kick.mp3" },
  { name: "Snare", key: "W", file: "/drum_samples/Snare.mp3" },
  { name: "Hi-Hat", key: "E", file: "/drum_samples/HiHat.mp3" },
  { name: "Tom", key: "R", file: "/drum_samples/Tom.mp3" },
  { name: "Crash", key: "A", file: "/drum_samples/Crash.mp3" },
  { name: "Clap", key: "S", file: "/drum_samples/Clap.mp3" },
  { name: "Rim", key: "D", file: "/drum_samples/Rim.wav" },
  { name: "Cowbell", key: "F", file: "/drum_samples/Cowbell.mp3" },
];

export default function DrumPad() {
  const [lastPlayedSound, setLastPlayedSound] = useState("");

  const playSound = (sound: string, file: string) => {
    setLastPlayedSound(sound);
    const audio = new Audio(file);
    audio.play();
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const pressedKey = event.key.toUpperCase();
    const sound = drumSounds.find((drum) => drum.key === pressedKey);
    if (sound) {
      playSound(sound.name, sound.file);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handleKeyPress(event);
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Drum Pad</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {drumSounds.map((sound) => (
          <Button
            key={sound.name}
            onClick={() => playSound(sound.name, sound.file)}
            className="h-24 text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white"
          >
            {sound.name}
            <span className="text-xs block mt-1">({sound.key})</span>
          </Button>
        ))}
      </div>
      <p className="text-center">Last played sound: {lastPlayedSound || "None"}</p>
    </div>
  );
}
