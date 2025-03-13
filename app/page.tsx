import Hero from "../components/Hero"
import Features from "../components/Features"
import InstrumentExplorer from "../components/InstrumentExplorer"
import VirtualPiano from "../components/VirtualPiano"
import DrumPad from "../components/DrumPad"
import BassGuitar from "../components/Guitar"
import Metronome from "../components/Metronome"
import ChordDiagram from "../components/ChordDiagram"
import MusicTheoryQuiz from "../components/MusicTheoryQuiz"
import SoundLibrary from "../components/SoundLibrary"
import ScaleExercise from "../components/ScaleExercise"
import ArpeggioTrainer from "../components/ArpeggioTrainer"
import PracticeTimer from "../components/PracticeTimer"
import Footer from "../components/Footer"
import Header from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <InstrumentExplorer />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Interactive Music Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <VirtualPiano />
          <DrumPad />
          <BassGuitar />
          <Metronome />
          <ChordDiagram />
          <MusicTheoryQuiz />
          <SoundLibrary />
          <ScaleExercise />
          <ArpeggioTrainer />
        </div>
        <div className="mt-12">
          <PracticeTimer />
        </div>
      </div>
      <Footer />
    </div>
  )
}

