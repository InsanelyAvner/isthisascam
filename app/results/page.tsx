'use client'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { AlertTriangle, CheckCircle, ChevronRight, ExternalLink, Flag, Mail, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Navbar from "@/components/navbar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Footer from "@/components/footer"


interface FlaggedArea {
    text: string;
    reason: string;
}

interface BreakdownItem {
    category: string;
    details: string;
}

export default function ResultsPageComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [scamLikelihood, setScamLikelihood] = useState<number>(0);
    const [flaggedAreas, setFlaggedAreas] = useState<FlaggedArea[]>([]); // Define the array of flagged areas
    const [analysisBreakdown, setAnalysisBreakdown] = useState<BreakdownItem[]>([]); // Define the array of breakdown items


    useEffect(() => {
        const dataParam = searchParams.get('data');
        if (dataParam) {
            try {
                const responseData = JSON.parse(dataParam).result;
                console.log(responseData.result)

                // Ensure the response data has the expected structure
                if (responseData?.scam_likelihood?.percentage) {
                    setScamLikelihood(responseData.scam_likelihood.percentage);
                }

                if (Array.isArray(responseData.flagged_sections)) {
                    setFlaggedAreas(responseData.flagged_sections);
                }

                if (responseData?.breakdown) {
                    setAnalysisBreakdown([
                        {
                            category: 'Sender Information',
                            details: responseData.breakdown.sender_info?.description || 'No description available.',
                        },
                        {
                            category: 'Email Language',
                            details: responseData.breakdown.language_and_tone?.description || 'No description available.',
                        },
                        {
                            category: 'Links & Attachments',
                            details: responseData.breakdown.links_attachments?.description || 'No description available.',
                        },
                    ]);
                }
            } catch (error) {
                console.error("Failed to parse response data:", error);
            }
        }
    }, [searchParams]);


    const getScamLikelihoodColor = (score: number) => {
        if (score <= 40) return 'bg-green-500'
        if (score <= 70) return 'bg-yellow-500'
        return 'bg-red-500'
    }

    // const flaggedAreas = [
    //     {
    //         text: 'Urgent action required',
    //         reason: 'This phrase is commonly used in phishing emails to create a sense of urgency.',
    //     },
    //     {
    //         text: 'Click here to verify your account',
    //         reason: 'Suspicious link that may lead to a phishing website.',
    //     },
    //     {
    //         text: 'We need your credit card information to process your request',
    //         reason: 'Legitimate companies rarely ask for sensitive information via email.',
    //     },
    // ]

    // const analysisBreakdown = [
    //     {
    //         category: 'Sender Information',
    //         details: "The sender's email domain does not match legitimate company domains.",
    //     },
    //     {
    //         category: 'Email Language',
    //         details: "The email uses urgency tactics such as 'act now' or 'limited time offer'.",
    //     },
    //     {
    //         category: 'Links & Attachments',
    //         details: 'This link redirects to an unknown domain, which may be a phishing attempt.',
    //     },
    //     {
    //         category: 'Requests for Personal Information',
    //         details: 'The email asks for your credit card details, which is a common sign of phishing.',
    //     },
    // ]

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h2 className="text-3xl font-bold mb-8 text-center">Our Analysis</h2>

                <Card className="mb-8">
                    { /*<CardHeader>
                        <CardTitle>Scam Likelihood Score</CardTitle>
                    </CardHeader>
                     <CardContent className="flex flex-col items-center">
                        <div className={`text-4xl font-bold mb-4 ${scamLikelihood > 70 ? 'text-red-500' : scamLikelihood > 40 ? 'text-yellow-500' : 'text-green-500'}`}>
                            {scamLikelihood}% likely to be a scam
                        </div>
                        <Progress value={scamLikelihood} className="w-full h-4 mb-4" indicatorClassName={getScamLikelihoodColor(scamLikelihood)} />
                        <p className="text-center text-muted-foreground">
                            This email is highly likely to be a scam based on its content and patterns.
                        </p>
                    </CardContent> */}
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Scam Likelihood Score</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                            <div className={`text-4xl font-bold mb-4 ${getScamLikelihoodColor(scamLikelihood)}`}>
                                {scamLikelihood}% likely to be a scam
                            </div>
                            {/* <Progress value={scamLikelihood} className="w-full h-4 mb-4" indicatorClassName={getScamLikelihoodColor(scamLikelihood)} /> */}

                            {/* Dynamic explanation based on scam likelihood */}
                            <p className="text-center text-muted-foreground">
                                {scamLikelihood > 70
                                    ? 'This email is highly likely to be a scam based on its content and patterns.'
                                    : scamLikelihood > 40
                                        ? 'This email has some suspicious elements, proceed with caution.'
                                        : 'This email is unlikely to be a scam, but always exercise caution.'}
                            </p>
                        </CardContent>

                    </Card>
                </Card>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Key Areas of Concern</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {flaggedAreas.map((area, index) => (
                                <li key={index} className="border-l-4 border-red-500 pl-4">
                                    <p className="font-semibold text-red-500">{area.text}</p>
                                    <p className="text-sm text-muted-foreground">{area.reason}</p>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Breakdown of the Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {analysisBreakdown.map((item, index) => (
                                <li key={index}>
                                    <p className="font-semibold">{item.category}</p>
                                    <p className="text-sm text-muted-foreground">{item.details}</p>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>What Should You Do Next?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">
                            {scamLikelihood > 70
                                ? "We recommend deleting this email and not engaging with the sender. Do not click any links or provide personal information."
                                : "This email appears to be safe, but exercise caution when responding to unknown senders."}
                        </p>
                        <h4 className="font-semibold mb-2">General Tips:</h4>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Always verify the sender's email address before responding to unsolicited messages.</li>
                            <li>Be cautious of emails that create a sense of urgency or ask for personal information.</li>
                            <li>Hover over links to check their destination before clicking.</li>
                            <li>Keep your software and antivirus programs up to date.</li>
                        </ul>
                    </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link href="/">
                        <Button size="lg" className="w-full sm:w-auto">
                            <Mail className="mr-2 h-4 w-4" /> Check Another Email
                        </Button>
                    </Link>
                    <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                        <Link href="https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams">
                            <ExternalLink className="mr-2 h-4 w-4" /> Learn More About Email Scams
                        </Link>
                    </Button>
                    {/* <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                        <Flag className="mr-2 h-4 w-4" /> Report Scam
                    </Button> */}
                </div>
            </main>

            <Footer />
        </div>
    )
}