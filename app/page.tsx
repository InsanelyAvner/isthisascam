'use client'

import { useState } from "react";
import Link from "next/link";
import { Mail, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/navigation';

export default function Homepage() {
  // State to store form data
  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender,
          subject,
          body: content,
        }),
      });

      const data = await response.json();

      // Navigate to results page, passing the data
      router.push(`/results?data=${encodeURIComponent(JSON.stringify(data))}`);
    } catch (error) {
      setError("Failed to analyze the email.");
    } finally {
      setLoading(false);
    }
  };


return (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />

    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="max-w-4xl mx-auto text-center mb-12 mt-5">
        <h2 className="text-3xl font-bold mb-4">Is This a Scam?</h2>
        <p className="text-xl text-muted-foreground mb-6">
          Unsure whether an email is a scam? Protect yourself with our AI-powered scam likelihood detector.
        </p>
        {/* <Link href="#checkEmail">
          <Button size="lg" className="font-semibold">
            Start Now
          </Button>
        </Link> */}
      </section>

      <Card className="max-w-2xl mx-auto" id="checkEmail">
        <CardHeader>
          <CardTitle className="text-xl">Check Email</CardTitle>
          <CardDescription>Enter the email details below for AI analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="sender" className="text-sm font-medium">
                Sender Email
              </label>
              <Input
                id="sender"
                placeholder="example@email.com"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Email Subject
              </label>
              <Input
                id="subject"
                placeholder="Enter email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Email Body/Content
              </label>
              <Textarea
                id="content"
                placeholder="Paste email content here"
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <CardFooter>
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Analyzing..." : "Submit for Analysis"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      {error && (
        <div className="mt-4 text-center text-red-600">
          <p>{error}</p>
        </div>
      )}

      {result && (
        <section className="max-w-4xl mx-auto mt-12">
          <h3 className="text-2xl font-bold text-center">Analysis Result</h3>
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
            <pre>{JSON.stringify(result, null, 2)}</pre> {/* Display the result */}
          </div>
        </section>
      )}

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

    <Footer />
  </div>
);
}
