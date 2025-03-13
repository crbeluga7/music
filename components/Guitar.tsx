"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const guitarParts = {
    "Guitar": {
        image: "/guitar/guitar.webp",
    },
    "Headstock": {
        image: "/guitar/headstock.jpg",
        description: "The top part of the guitar where the strings are held tight.",
    },
    "Tuning Pegs": {
        image: "/guitar/tuning-pegs.jpg",
        description: "These little knobs turn to make the guitar sound higher or lower.",
    },
    "Nut": {
        image: "/guitar/nut.jpg",
        description: "A tiny piece that holds the strings up and keeps them in place.",
    },
    "Neck": {
        image: "/guitar/neck.jpg",
        description: "The long part at the back of the guitar that you hold while playing.",
    },
    "Frets": {
        image: "/guitar/frets.jpg",
        description: "Metal bars on the fretboard that help make different notes when you press the strings.",
    },
    "Fret Markers": {
        image: "/guitar/fret-markers.jpg",
        description: "Dots/Designs on the fretboard that help you know where to put your fingers.",
    },
    "Fretboard": {
        image: "/guitar/fretboard.jpg",
        description: "The front of the neck where you press the strings to play notes.",
    },
    "Strings": {
        image: "/guitar/strings.jpg",
        description: "Thin wires that you pluck or strum to make music.",
    },
    "Sound Hole": {
        image: "/guitar/sound-hole.jpg",
        description: "A hole in the middle that makes the guitar sound louder.",
    },
    "Pick Guard": {
        image: "/guitar/pick-guard.jpg",
        description: "A shield that stops the guitar from getting scratched when you strum.",
    },
    "Saddle": {
        image: "/guitar/saddle.jpg",
        description: "A small piece that holds the strings up near the bottom of the guitar.",
    },
    "Bridge": {
        image: "/guitar/bridge.jpg",
        description: "The part that holds the strings at the bottom and helps make sound.",
    },
    "Body": {
        image: "/guitar/body.jpg",
        description: "The big part of the guitar that makes the sound big and strong.",
    },
    "End Pin": {
        image: "/guitar/end-pin.jpg",
        description: "A small button where you can attach a strap to hold the guitar.",
    },
};


export default function GuitarAnatomy() {
    const [selectedPart, setSelectedPart] = useState<keyof typeof guitarParts>("Guitar");

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4">Guitar Anatomy</h3>
            <Select onValueChange={(value) => setSelectedPart(value as keyof typeof guitarParts)}>
                <SelectTrigger className="w-64 mx-auto">
                    <SelectValue placeholder="Select a guitar part" />
                </SelectTrigger>
                <SelectContent>
                    {Object.keys(guitarParts).map((part) => (
                        <SelectItem key={part} value={part}>
                            {part}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Default Guitar Image / Selected Part Image & Description */}
            <div className="mt-4">
                {selectedPart === "Guitar" ? (
                    <img src={guitarParts[selectedPart].image} alt={selectedPart} className="mx-auto h-85" />
                ) : (
                    <div>
                        <img src={guitarParts[selectedPart].image} alt={selectedPart} className="mx-auto h-60" />
                        <p className="mt-2 text-gray-600">{guitarParts[selectedPart].description}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
