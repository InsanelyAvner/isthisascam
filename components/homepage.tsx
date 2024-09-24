'use client'

import Link from "next/link"
import { Mail, Shield, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function Homepage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary flex items-center">
            <Shield className="mr-2 h-6 w-6" />
            AI Scam Email Detector
          </h1>
          <nav>
            <Button variant="ghost" asChild>
              <Link href="/learn-more">Learn More</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Detect Potential Scam Emails Using AI</h2>
          <p className="text-xl text-muted-foreground mb-6">
            Protect yourself from phishing and fraudulent messages with our scam likelihood detector.
          </p>
          <Button size="lg" className="font-semibold">
            Start Now
          </Button>
        </section>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Check Email</CardTitle>
            <CardDescription>Enter the email details below for AI analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="sender" className="text-sm font-medium">
                  Sender Email
                </label>
                <Input id="sender" placeholder="example@email.com" />
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Email Subject
                </label>
                <Input id="subject" placeholder="Enter email subject" />
              </div>
              <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium">
                  Email Body/Content
                </label>
                <Textarea id="content" placeholder="Paste email content here" rows={5} />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Submit for Analysis</Button>
          </CardFooter>
        </Card>

        <section className="max-w-4xl mx-auto mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Mail, title: "Input Email", description: "Enter the email details you want to check" },
              { icon: Shield, title: "AI Analysis", description: "Our AI system analyzes the message for potential scams" },
              { icon: Lock, title: "Get Results", description: "Receive scam likelihood results with key flagged areas" },
            ].map((step, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <step.icon className="mx-auto h-12 w-12 text-primary mb-4" />
                  <h4 className="font-semibold mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-6 px-4 sm:px-6 lg:px-8 border-t">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p className="mb-4">
            Disclaimer: Results are advisory and not guaranteed. Always exercise caution with suspicious emails.
          </p>
          <nav className="space-x-4">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}