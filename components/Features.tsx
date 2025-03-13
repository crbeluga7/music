import { Music, Drum, Users, AlarmClockCheck, Piano, Clock, BookOpen, Guitar } from "lucide-react"

const features = [
  {
    name: "Virtual Piano",
    description: "Practice piano notes and chords with our interactive virtual keyboard.",
    icon: Piano,
  },
  {
    name: "Metronome",
    description: "Improve your rhythm and timing with our adjustable metronome.",
    icon: Clock,
  },
  {
    name: "Chord Diagrams",
    description: "Learn guitar chords with easy-to-follow visual diagrams.",
    icon: Guitar,
  },
  {
    name: "Music Theory Quiz",
    description: "Test your knowledge and learn new concepts with our interactive quizzes.",
    icon: BookOpen,
  },
  {
    name: "Drum Pad",
    description: "Get a feel for drumming with our interactive virtual drum pad.",
    icon: Drum,
  },
  {
    name: "Community Support",
    description: "Connect with fellow musicians and get support from our vibrant community.",
    icon: Users,
  },
  {
    name: "Practice Tracker",
    description: "Track your practice time with our built-in tools.",
    icon: AlarmClockCheck,
  },
  {
    name: "Multiple Instruments",
    description: "Learn various instruments including piano, guitar, drums, and more.",
    icon: Music,
  },
]

export default function Features() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to master music
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our platform offers a comprehensive set of tools and resources to help you on your musical journey.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

