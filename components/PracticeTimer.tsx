"use client"

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PracticeTimer() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [userHours, setUserHours] = useState("");
  const [userMinutes, setUserMinutes] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const alarmRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    alarmRef.current = new Audio("/stop.mp3");
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            playAlarm();
            setIsCompleted(true);
            setIsActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const startTimer = () => {
    const totalTime = (parseInt(userHours) || 0) * 3600 + (parseInt(userMinutes) || 0) * 60;
    setTime(totalTime);
    setIsActive(true);
    setIsCompleted(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(0);
    setUserHours("");
    setUserMinutes("");
    stopAlarm();
    setIsCompleted(false);
  };

  const playAlarm = () => {
    if (alarmRef.current) {
      alarmRef.current.muted = false;
      alarmRef.current.loop = true;
      alarmRef.current.play().catch((error) => console.error("Audio play failed:", error));
    }
  };

  const stopAlarm = () => {
    if (alarmRef.current) {
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
      setIsCompleted(false);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Practice Timer</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Hours</label>
        <Input
          type="number"
          value={userHours}
          onChange={(e) => setUserHours(e.target.value)}
          min="0"
          placeholder="Enter hours"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Minutes</label>
        <Input
          type="number"
          value={userMinutes}
          onChange={(e) => setUserMinutes(e.target.value)}
          min="0"
          placeholder="Enter minutes"
        />
      </div>
      <div className="text-4xl font-bold mb-4 text-center">{formatTime(time)}</div>
      <div className="flex justify-center space-x-4">
        <Button onClick={startTimer} disabled={isActive}>Start</Button>
        {!isCompleted && <Button onClick={resetTimer} variant="outline">Reset</Button>}
      </div>
      {isCompleted && (
        <div className="flex justify-center mt-4">
          <Button onClick={stopAlarm} variant="destructive">Stop</Button>
        </div>
      )}
    </div>
  );
}
