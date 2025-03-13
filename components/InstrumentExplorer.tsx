import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const instrumentFamilies = [
  {
    name: "Strings",
    instruments: ["Violin", "Viola", "Cello", "Double Bass", "Guitar", "Harp"],
    description: "Stringed instruments produce sound from vibrating strings.",
  },
  {
    name: "Woodwinds",
    instruments: ["Flute", "Clarinet", "Oboe", "Bassoon", "Saxophone"],
    description: "Woodwind instruments are played by blowing air across an edge or through a reed.",
  },
  {
    name: "Brass",
    instruments: ["Trumpet", "Trombone", "French Horn", "Tuba"],
    description: "Brass instruments are played by buzzing lips into a mouthpiece.",
  },
  {
    name: "Percussion",
    instruments: ["Drums", "Xylophone", "Marimba", "Timpani", "Cymbals"],
    description: "Percussion instruments produce sound when struck, shaken, or scraped.",
  },
  {
    name: "Keyboard",
    instruments: ["Piano", "Organ", "Synthesizer", "Accordion"],
    description: "Keyboard instruments are played using a row of levers which are pressed by the fingers.",
  },
]

export default function InstrumentExplorer() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Explore Instrument Families</h2>
        <Tabs defaultValue={instrumentFamilies[0].name.toLowerCase()}>
          <TabsList className="flex justify-center mb-8">
            {instrumentFamilies.map((family) => (
              <TabsTrigger key={family.name} value={family.name.toLowerCase()}>
                {family.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {instrumentFamilies.map((family) => (
            <TabsContent key={family.name} value={family.name.toLowerCase()}>
              <Card>
                <CardHeader>
                  <CardTitle>{family.name}</CardTitle>
                  <CardDescription>{family.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {family.instruments.map((instrument) => (
                      <li key={instrument} className="bg-gray-100 rounded-lg p-4 text-center">
                        {instrument}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

