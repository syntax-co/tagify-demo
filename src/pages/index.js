import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/app-context";


// pages/index.js

export default function Home() {

  const {sendToLogin} = useAppContext()


  return (
    <main className="h-[92vh] px-6 py-16 
    flex flex-col items-center text-foreground">

      
      <section className="text-center space-y-3">
        <h1 className="text-[100px] font-extrabold tracking-tight
        font-primary text-primary">
          Tagify
        </h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto font-light
        
        ">
          Scan smarter. Track better. Unlock powerful insights with real-time QR analytics.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-6 text-center w-full max-w-5xl
      my-16
      ">
        <div className="space-y-2
        bg-card p-4 rounded-md border border-foreground
        ">
          <h3 className="text-lg font-semibold">📈 Scan Trends</h3>
          <p className="text-sm">Track when and how often your codes are used.</p>
        </div>
        <div className="space-y-2
        bg-card p-4 rounded-md border border-foreground
        ">
          <h3 className="text-lg font-semibold">🎯 Campaign Insights</h3>
          <p className="text-sm ">Understand which codes perform and why.</p>
        </div>
      </section>

      <section className="flex flex-col items-center gap-4 mt-8">
        <p className="text-sm ">Built for creators, marketers, and businesses.</p>
        <div className="flex gap-4">
          <button className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition font-medium"
          onClick={sendToLogin}
          >
            Get Started
          </button>
          <button className="px-6 py-2 rounded-full border border-black hover:bg-black hover:text-white transition font-medium">
            Learn More
          </button>
        </div>
      </section>
    </main>
  );
}
