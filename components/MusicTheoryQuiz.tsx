"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const shuffleArray = (array: { question: string; options: string[]; answer: string }[]): typeof array => {
  let shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}


const quizQuestions = [
  {
    question: "What is the root note of a G major chord?",
    options: ["G", "B", "D", "F#"],
    answer: "G",
  },
  {
    question: "Which of these chords is a dominant 7th chord?",
    options: ["C7", "Cmaj7", "Cmin7", "Cdim7"],
    answer: "C7",
  },
  {
    question: "What is the fifth string on a standard-tuned guitar?",
    options: ["D", "G", "A", "B"],
    answer: "A",
  },
  {
    question: "Which scale is commonly used in blues music?",
    options: ["Major Scale", "Minor Scale", "Blues Scale", "Chromatic Scale"],
    answer: "Blues Scale",
  },
  {
    question: "What is the interval between the root and the third in a major chord?",
    options: ["Minor Third", "Major Third", "Perfect Fourth", "Perfect Fifth"],
    answer: "Major Third",
  },
  {
    question: "Which of these is a power chord?",
    options: ["Cmaj7", "Cmin", "C5", "Cdim"],
    answer: "C5",
  },
  {
    question: "What is the standard tuning for a guitar?",
    options: ["E A D G B E", "D A D G B E", "E A D F# B E", "E A D G B D"],
    answer: "E A D G B E",
  },
  {
    question: "What is the interval between C and G?",
    options: ["Perfect Fourth", "Perfect Fifth", "Major Third", "Minor Seventh"],
    answer: "Perfect Fifth",
  },
  {
    question: "Which of these is a major scale?",
    options: ["C D E F G A B C", "C D Eb F G Ab Bb C", "C D E F# G A B C", "C Db Eb F Gb Ab Bb C"],
    answer: "C D E F G A B C",
  },
  {
    question: "What is the relative minor of C major?",
    options: ["A minor", "D minor", "E minor", "G minor"],
    answer: "A minor",
  },
  {
    question: "How many notes are in a major scale?",
    options: ["5", "7", "8", "12"],
    answer: "7",
},
{
    question: "Which of these is the formula for a major scale?",
    options: ["W-H-W-W-H-W-W", "W-W-H-W-W-W-H", "W-W-H-W-W-H-W", "H-W-W-W-H-W-W"],
    answer: "W-W-H-W-W-W-H",
},
{
    question: "What type of chord is made up of a root, major third, and perfect fifth?",
    options: ["Major", "Minor", "Diminished", "Augmented"],
    answer: "Major",
},
{
    question: "How many frets does a guitar usually have?",
    options: ["18-22", "20-24", "22-26", "24-28"],
    answer: "20-24",
},
{
    question: "What is the name of the tuning that is most common for a 6 string guitar?",
    options: ["Open G", "Drop D", "Standard", "DADGAD"],
    answer: "Standard",
},
{
    question: "Which of these is a common guitar chord?",
    options: ["Cmaj7", "F#min", "Bbdim", "All of the above"],
    answer: "All of the above",
},
{
    question: "What is a 'power chord' on guitar?",
    options: ["A chord played with distortion", "A chord only played on the lower strings", "A type of barre chord", "A three-note chord (root, fifth, octave)"],
    answer: "A three-note chord (root, fifth, octave)",
},
{
    question: "What does 'tab' stand for in guitar tablature?",
    options: ["Table", "Tablature", "Tabulator", "None of the above"],
    answer: "Tablature",
},
{
    question: "What is a 'barre chord' on guitar?",
    options: ["A chord played only on the top strings", "A chord played with a slide", "A chord played across multiple frets with one finger", "A chord played with harmonics"],
    answer: "A chord played across multiple frets with one finger",
},
{
    question: "Which part of the guitar is responsible for changing the pitch of the strings?",
    options: ["Bridge", "Tuning pegs", "Nut", "Saddle"],
    answer: "Tuning pegs",
},
]

export default function MusicTheoryQuiz() {
  const [questions, setQuestions] = useState<{ question: string; options: string[]; answer: string }[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    setQuestions(shuffleArray(quizQuestions))
  }, [])

  const handleSubmit = () => {
    setIsSubmitted(true)
    setShowResult(true)
  }

  const handleNext = () => {
    setSelectedAnswer("")
    setShowResult(false)
    setIsSubmitted(false)
    setCurrentQuestion((prev) => (prev + 1) % questions.length)
  }

  if (questions.length === 0) return <p>Loading quiz...</p> // Handle empty state while shuffling

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Music Theory Quiz</h3>
      <p className="mb-4">{questions[currentQuestion].question}</p>
      <RadioGroup
        value={selectedAnswer}
        onValueChange={(value) => {
          if (!isSubmitted) {
            setSelectedAnswer(value)
          }
        }}
      >
        {questions[currentQuestion].options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={option} disabled={isSubmitted} />
            <Label htmlFor={option}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
      {!showResult ? (
        <Button onClick={handleSubmit} className="mt-4" disabled={!selectedAnswer}>
          Submit
        </Button>
      ) : (
        <div className="mt-4">
          {selectedAnswer === questions[currentQuestion].answer ? (
            <p className="text-green-600 font-bold">Pitch Perfect!</p>
          ) : (
            <div>
              <p className="text-red-600 font-bold">A little off-key—give it another go!</p>
              <p className="text-purple-600 font-bold">Correct answer: {questions[currentQuestion].answer}</p>
            </div>
          )}
          <Button onClick={handleNext} className="mt-2">
            Next Question
          </Button>
        </div>
      )}
    </div>
  )
}
