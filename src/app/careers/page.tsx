import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Briefcase, TrendingUp, Users, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "Careers | Karachi Broast",
  description: "Join the Karachi Broast family. Explore exciting career opportunities.",
}

const openings = [
  {
    title: "Kitchen Staff",
    department: "Operations",
    type: "Full-time",
    location: "Karachi",
    description: "Assist in food preparation and maintaining kitchen hygiene standards to deliver consistent quality in every dish.",
  },
  {
    title: "Delivery Driver",
    department: "Delivery",
    type: "Part-time",
    location: "Karachi",
    description: "Deliver orders promptly and safely to our customers. Motorbike required. Flexible hours available.",
  },
  {
    title: "Cashier / Counter Staff",
    department: "Front of House",
    type: "Full-time",
    location: "Karachi",
    description: "Handle customer orders, payments, and ensure a great experience at every touchpoint.",
  },
  {
    title: "Restaurant Manager",
    department: "Management",
    type: "Full-time",
    location: "Karachi",
    description: "Oversee daily operations, staff management, and quality control across the restaurant.",
  },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/40 via-zinc-950 to-zinc-950" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container relative z-10 text-center">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-4">We&apos;re Hiring</p>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Join Our <span className="text-gradient">Team</span>
          </h1>
          <p className="text-zinc-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Be part of Karachi&apos;s most-loved fast food family. We&apos;re always looking for passionate people who love food and great service.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 border-y border-zinc-800 bg-zinc-900/30">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-4">Perks</p>
            <h2 className="text-4xl font-black">Why Karachi Broast?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Award, title: "Competitive Pay", desc: "Above-market salaries with performance bonuses paid monthly." },
              { icon: TrendingUp, title: "Growth Opportunities", desc: "Clear career paths from staff to management, with ongoing training." },
              { icon: Users, title: "Great Team Culture", desc: "A supportive, inclusive, and energetic work environment." },
            ].map((item) => (
              <div key={item.title} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-orange-500/30 transition-colors text-center">
                <div className="h-12 w-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-24">
        <div className="container max-w-4xl">
          <div className="mb-10">
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">Open Positions</p>
            <h2 className="text-4xl font-black">Current Openings</h2>
          </div>
          <div className="space-y-4">
            {openings.map((job) => (
              <div key={job.title} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-orange-500/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-black text-white">{job.title}</h3>
                    <p className="text-zinc-500 text-sm mt-0.5">{job.department}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 bg-zinc-800 rounded-full px-3 py-1 text-xs text-zinc-300">
                      <Clock className="h-3 w-3 text-orange-400" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1.5 bg-zinc-800 rounded-full px-3 py-1 text-xs text-zinc-300">
                      <MapPin className="h-3 w-3 text-orange-400" />
                      {job.location}
                    </div>
                  </div>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-5">{job.description}</p>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl h-10 px-6" asChild>
                  <Link href="/contact">Apply Now</Link>
                </Button>
              </div>
            ))}
          </div>

          {/* Open Application */}
          <div className="mt-10 bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20 rounded-2xl p-10 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-6">
              <Briefcase className="h-7 w-7 text-orange-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Don&apos;t see a suitable role?</h3>
            <p className="text-zinc-400 mb-6 max-w-sm mx-auto">
              Send us your CV anyway. We&apos;re always happy to hear from talented, passionate people.
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl h-12 px-8" asChild>
              <Link href="/contact">Send Your CV</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
