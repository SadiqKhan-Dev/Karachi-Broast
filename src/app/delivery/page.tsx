import { Metadata } from "next"
import { Truck, Clock, MapPin, Package, CreditCard } from "lucide-react"

export const metadata: Metadata = {
  title: "Delivery Information | Karachi Broast",
  description: "Learn about our delivery areas, times, fees, and policies.",
}

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/40 via-zinc-950 to-zinc-950" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container relative z-10 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-6 mx-auto">
            <Truck className="h-8 w-8 text-orange-400" />
          </div>
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-4">We Come to You</p>
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Delivery <span className="text-gradient">Information</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Fast, reliable delivery across Karachi — hot food at your door.
          </p>
        </div>
      </section>

      <div className="container max-w-4xl pb-20">
        {/* Key Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Clock, label: "Delivery Time", value: "30–45 mins" },
            { icon: MapPin, label: "Coverage", value: "All of Karachi" },
            { icon: Package, label: "Min. Order", value: "No minimum" },
            { icon: CreditCard, label: "Free Delivery", value: "Above Rs. 1000" },
          ].map((item) => (
            <div key={item.label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center hover:border-orange-500/30 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-4">
                <item.icon className="h-6 w-6 text-orange-400" />
              </div>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">{item.label}</p>
              <p className="font-bold text-white">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Delivery Fees */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-6">
          <h2 className="text-2xl font-black text-white mb-6">Delivery Fees</h2>
          <div className="space-y-1">
            <div className="flex justify-between items-center py-4 border-b border-zinc-800">
              <div>
                <p className="font-semibold text-white">Standard Delivery</p>
                <p className="text-sm text-zinc-500">For orders under Rs. 1000</p>
              </div>
              <span className="font-black text-xl text-white">Rs. 150</span>
            </div>
            <div className="flex justify-between items-center py-4">
              <div>
                <p className="font-semibold text-white">Free Delivery</p>
                <p className="text-sm text-zinc-500">For orders of Rs. 1000 and above</p>
              </div>
              <span className="font-black text-xl text-green-400">Free</span>
            </div>
          </div>
        </div>

        {/* Delivery Hours */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-6">
          <h2 className="text-2xl font-black text-white mb-6">Delivery Hours</h2>
          <div className="space-y-1">
            {[
              { day: "Monday – Friday", hours: "12:00 PM – 2:00 AM" },
              { day: "Saturday – Sunday", hours: "11:00 AM – 2:00 AM" },
              { day: "Public Holidays", hours: "12:00 PM – 12:00 AM" },
            ].map((row) => (
              <div key={row.day} className="flex justify-between items-center py-4 border-b border-zinc-800 last:border-0">
                <span className="font-semibold text-white">{row.day}</span>
                <span className="text-orange-400 font-medium">{row.hours}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <h2 className="text-2xl font-black text-white mb-6">Important Notes</h2>
          <ul className="space-y-4">
            {[
              "Delivery times are estimates and may vary during peak hours, bad weather, or high demand.",
              "Please ensure someone is available at the delivery address to receive the order.",
              "Providing a landmark or gate code in the delivery notes helps our drivers find you faster.",
              "For Cash on Delivery, please keep exact change ready when possible.",
              "We currently deliver within Karachi city limits. Check availability at checkout.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-orange-400 text-xs font-bold">{i + 1}</span>
                </span>
                <p className="text-zinc-400 text-sm leading-relaxed">{note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
