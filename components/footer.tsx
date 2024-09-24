'use client'

import Link from "next/link"

export default function Footer() {
    return (
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
                </nav>
            </div>
        </footer>
    )
}