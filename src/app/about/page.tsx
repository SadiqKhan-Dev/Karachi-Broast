import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Shield, Users, Award, ChefHat, Leaf, Clock, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Karachi Broast",
  description: "The story behind Karachi's most-loved fast food restaurant since 2010.",
}

const stats = [
  { value: "500K+", label: "Happy Customers", icon: Users },
  { value: "1M+", label: "Orders Delivered", icon: ChefHat },
  { value: "15+", label: "Years of Service", icon: Clock },
  { value: "4.9★", label: "Average Rating", icon: Star },
]

const values = [
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every dish is prepared with genuine care and passion. We cook like it's for family.",
  },
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "No frozen shortcuts. We source fresh, halal-certified ingredients daily from trusted suppliers.",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "If you're not 100% satisfied, we'll make it right. Your happiness is our benchmark.",
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Voted Karachi's Best Fast Food Restaurant 3 years running by Pakistan Food Awards.",
  },
]

const timeline = [
  {
    year: "2010",
    title: "The Beginning",
    desc: "Tariq Khan opened the first Karachi Broast outlet in Gulshan-e-Iqbal with a single fryer and a legendary secret recipe passed down from his grandfather.",
  },
  {
    year: "2013",
    title: "Word Spreads",
    desc: "Long queues and word-of-mouth buzz led to our first expansion — a second outlet in Defence Housing Authority. The original secret spice blend remained unchanged.",
  },
  {
    year: "2016",
    title: "Going Digital",
    desc: "We launched online ordering, becoming one of Karachi's first fast food joints to offer app-based delivery. 10,000 orders in the first month.",
  },
  {
    year: "2019",
    title: "The Burger Revolution",
    desc: "We introduced our now-legendary burger range, starting with the Double Smash Burger and Spicy Jalapeño. Both became immediate bestsellers.",
  },
  {
    year: "2022",
    title: "The Pizza Chapter",
    desc: "Our Lahori Tikka Pizza was born — a desi fusion that went viral on social media and became our fastest-selling new product ever.",
  },
  {
    year: "2024",
    title: "Half a Million Strong",
    desc: "We celebrated serving our 500,000th unique customer. What started in one small kitchen is now a Karachi institution with a team of 200+.",
  },
]

const team = [
  {
    name: "Tariq Khan",
    role: "Founder & Head Chef",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400",
    bio: "The man behind the secret spice blend. 30 years of culinary experience.",
  },
  {
    name: "Sara Ali",
    role: "Operations Director",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    bio: "Ensures every order leaves our kitchen at the highest standard.",
  },
  {
    name: "Bilal Hassan",
    role: "Head of Delivery",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    bio: "Built our 30-minute delivery promise from the ground up.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* ─── HERO ─── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/40 via-zinc-950 to-zinc-950" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container relative z-10 text-center">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-4">Est. 2010</p>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            About <span className="text-gradient">Karachi Broast</span>
          </h1>
          <p className="text-zinc-400 text-xl max-w-2xl mx-auto leading-relaxed">
            What started as one man&apos;s passion for perfect fried chicken has grown into Karachi&apos;s most beloved fast food institution — still using the same secret recipe from day one.
          </p>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-16 border-y border-zinc-800 bg-zinc-900/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-orange-500/10 border border-orange-500/20 mb-4">
                  <stat.icon className="h-6 w-6 text-orange-400" />
                </div>
                <p className="text-4xl md:text-5xl font-black text-gradient mb-2">{stat.value}</p>
                <p className="text-zinc-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OUR STORY ─── */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-4">Our Story</p>
              <h2 className="text-4xl font-black mb-8">From One Fryer to a Karachi Icon</h2>
              <div className="space-y-5 text-zinc-400 leading-relaxed">
                <p>
                  It all began in 2010 when Tariq Khan, armed with nothing but his grandfather&apos;s secret spice recipe and an unwavering belief in quality, opened a small broast stall in Gulshan-e-Iqbal.
                </p>
                <p>
                  The chicken was marinated overnight, the batter was mixed fresh every morning, and the oil was changed twice daily. These weren&apos;t business strategies — they were personal standards. Karachi noticed.
                </p>
                <p>
                  Fifteen years and half a million customers later, we still follow every one of those original standards. The secret spice blend has never been written down — it lives in the hands of our kitchen team, passed on through training, not paper.
                </p>
                <p>
                  That&apos;s the Karachi Broast promise: every bite you take today tastes exactly like the first bite a happy customer took in 2010.
                </p>
              </div>
              <Button
                size="lg"
                className="mt-8 bg-orange-500 hover:bg-orange-600 text-white rounded-full h-12 px-8 font-semibold"
                asChild
              >
                <Link href="/menu">Try It Yourself</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400"
                alt="Our signature broast"
                className="rounded-2xl object-cover aspect-square w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400"
                alt="Our burgers"
                className="rounded-2xl object-cover aspect-square w-full mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400"
                alt="Our restaurant"
                className="rounded-2xl object-cover aspect-square w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400"
                alt="Our pizza"
                className="rounded-2xl object-cover aspect-square w-full mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="py-24 bg-zinc-900/30 border-y border-zinc-800">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-4">Our Journey</p>
            <h2 className="text-4xl font-black">15 Years of Deliciousness</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-zinc-800" />
              <div className="space-y-10">
                {timeline.map((item) => (
                  <div key={item.year} className="relative flex gap-8">
                    <div className="flex-shrink-0 h-16 w-16 rounded-full bg-orange-500/10 border-2 border-orange-500/30 flex items-center justify-center z-10">
                      <span className="text-orange-400 font-black text-sm">{item.year}</span>
                    </div>
                    <div className="flex-1 pt-3 pb-8">
                      <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-4">What We Stand For</p>
            <h2 className="text-4xl font-black">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-orange-500/30 transition-colors">
                <div className="h-12 w-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4">
                  <v.icon className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{v.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="py-24 bg-zinc-900/30 border-y border-zinc-800">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-4">The People</p>
            <h2 className="text-4xl font-black">Meet Our Team</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative inline-block mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-24 w-24 rounded-full object-cover border-2 border-orange-500/30 mx-auto"
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-orange-500/10 animate-pulse" />
                </div>
                <h3 className="font-bold text-white text-lg">{member.name}</h3>
                <p className="text-orange-400 text-sm mb-2">{member.role}</p>
                <p className="text-zinc-500 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24">
        <div className="container text-center">
          <h2 className="text-4xl font-black mb-4">Ready to Taste the Difference?</h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
            Join half a million happy customers. Your best meal is just a few clicks away.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="h-14 px-10 rounded-full bg-orange-500 hover:bg-orange-600 font-bold" asChild>
              <Link href="/menu">Order Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 rounded-full border-zinc-700 text-zinc-300 hover:bg-zinc-900" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
