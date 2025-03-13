import Link from "next/link"
import { Music, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-primary">
              <Music className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">Música</span>
            </Link>
          </div>
          
          <div className="flex items-center ">
             <Link href="/musicgenerator" className="flex items-center text-primary">
            <Button>Music Generation</Button>
            </Link>
          </div>
        </div>
      </div>
     
    </header>
  )
}

