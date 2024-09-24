'use client'
import { Shield } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold text-primary flex items-center">
            <Shield className="mr-2 h-6 w-6" />
            Is This a Scam?
          </h1>
        </Link>
        <nav>
          Created by Avner
        </nav>
      </div>
    </header>
  )
}