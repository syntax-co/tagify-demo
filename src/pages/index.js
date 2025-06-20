import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      {/* Hero Section */}
      <section className="relative container mx-auto px-6 sm:px-12 lg:px-20 py-32 flex flex-col items-center text-center gap-8">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-[#FF312E] to-[#3C3C67] text-transparent bg-clip-text max-w-5xl">
          Transform Links into Powerful QR Campaigns
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
          Design, manage, and analyze dynamic QR codes and branded short links — all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href="/dashboard">
            <Button size="lg" className="rounded-2xl shadow-md px-8 py-5 text-base">Get Started</Button>
          </Link>
          <Link href="#features">
            <Button variant="outline" size="lg" className="rounded-2xl px-8 py-5 text-base">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted py-32">
        <div className="container mx-auto px-6 sm:px-12 lg:px-20 grid md:grid-cols-3 gap-16 text-center">
          <div className="bg-background p-8 rounded-3xl shadow-sm hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">🎨 Create</h3>
            <p className="text-muted-foreground text-base">
              Customize QR codes with brand colors, logos, and dynamic links.
            </p>
          </div>
          <div className="bg-background p-8 rounded-3xl shadow-sm hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">📂 Manage</h3>
            <p className="text-muted-foreground text-base">
              Edit and organize codes easily in a sleek, user-friendly dashboard.
            </p>
          </div>
          <div className="bg-background p-8 rounded-3xl shadow-sm hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">📊 Analyze</h3>
            <p className="text-muted-foreground text-base">
              Track scans, devices, and performance metrics in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-6 sm:px-12 lg:px-20 py-32 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto">
          Insights that Drive Results
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg">
          Unlock actionable analytics and take full control over your QR campaigns.
        </p>
        <Link href="/dashboard">
          <Button size="lg" className="rounded-2xl shadow-md px-8 py-5 text-base">Start for Free</Button>
        </Link>
      </section>
    </main>
  );
}
