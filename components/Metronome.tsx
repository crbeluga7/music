"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function Metronome() {
  const [bpm, setBpm] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref for the tick sound

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null; // Ensure proper cleanup

    if (isPlaying) {
      // Start playing the tick sound at intervals based on bpm
      timer = setInterval(() => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0; // Reset the tick sound each time
          audioRef.current.play(); // Play the sound
        }
      }, (60 / bpm) * 1000);
    } else {
      // Pause and reset audio when stopped
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      clearInterval(timer!); // Clear the interval when stopped
    }

    return () => {
      if (timer) clearInterval(timer); // Clean up interval on unmount or stop
    };
  }, [bpm, isPlaying]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Metronome</h3>

      {/* Audio element for the tick sound */}
      <audio ref={audioRef} src="/tick2.wav" />

      <Slider
        value={[bpm]}
        onValueChange={(value) => setBpm(value[0])}
        min={40}
        max={208}
        step={1}
        className="mb-4"
      />
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">{bpm} BPM</span>
        <Button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? "Stop" : "Start"}
        </Button>
      </div>
    </div>
  );
}
