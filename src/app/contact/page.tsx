"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: "Main Street, Gulshan-e-Iqbal, Karachi, Pakistan",
    sub: "Walk-ins welcome",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+92 21 1234567",
    sub: "Daily 12 PM – 2 AM",
    href: "tel:+92211234567",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: "info@karachibbroast.com",
    sub: "Reply within 24 hrs",
    href: "mailto:info@karachibbroast.com",
  },
  {
    icon: Clock,
    title: "Opening Hours",
    details: "Daily: 12:00 PM – 2:00 AM",
    sub: "7 days a week",
  },
]

const faqs = [
  {
    q: "What are your delivery hours?",
    a: "We deliver daily from 12:00 PM to 2:00 AM. Orders placed after 1:30 AM may be delivered the next day.",
  },
  {
    q: "Do you offer free delivery?",
    a: "Yes! Free delivery on all orders above Rs. 1000. For orders below Rs. 1000, a delivery fee of Rs. 150 applies.",
  },
  {
    q: "How can I track my order?",
    a: "You can track your order in real-time through your account page or via the link sent to your phone via SMS.",
  },
  {
    q: "Do you accept card payments?",
    a: "Yes, we accept all major credit and debit cards, JazzCash, Easypaisa, and cash on delivery.",
  },
  {
    q: "Can I customize my order?",
    a: "Absolutely! Most items can be customized with different sizes, spice levels, and add-ons. Check the product page for all available options.",
  },
]

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    })
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* ─── HERO ─── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/40 via-zinc-950 to-zinc-950" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container relative z-10 text-center">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-4">We&apos;re Here to Help</p>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-zinc-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Have a question, feedback, or just want to place a bulk order? Our team is ready to assist you every day.
          </p>
        </div>
      </section>

      {/* ─── CONTACT INFO CARDS ─── */}
      <section className="py-16 border-y border-zinc-800 bg-zinc-900/30">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info) => {
              const Wrapper = info.href ? "a" : "div"
              return (
                <Wrapper
                  key={info.title}
                  {...(info.href ? { href: info.href } : {})}
                  className="group bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5"
                >
                  <div className="h-12 w-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4">
                    <info.icon className="h-6 w-6 text-orange-400" />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-1">{info.title}</h3>
                  <p className="text-orange-400 text-sm font-medium mb-0.5">{info.details}</p>
                  <p className="text-zinc-500 text-xs">{info.sub}</p>
                </Wrapper>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── FORM + MAP ─── */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Form */}
            <div>
              <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-4">Send a Message</p>
              <h2 className="text-4xl font-black mb-3">We Read Every Message</h2>
              <p className="text-zinc-400 mb-10 leading-relaxed">
                Whether it&apos;s praise, a complaint, or a catering enquiry — fill in the form and we&apos;ll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-zinc-300 text-sm font-medium">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ahmed Khan"
                      required
                      className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-orange-500 focus-visible:border-orange-500/50 h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-zinc-300 text-sm font-medium">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ahmed@example.com"
                      required
                      className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-orange-500 focus-visible:border-orange-500/50 h-11"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-zinc-300 text-sm font-medium">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0300 1234567"
                      className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-orange-500 focus-visible:border-orange-500/50 h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-zinc-300 text-sm font-medium">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="General Inquiry"
                      required
                      className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-orange-500 focus-visible:border-orange-500/50 h-11"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-zinc-300 text-sm font-medium">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help you today?"
                    rows={5}
                    required
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-orange-500 focus-visible:border-orange-500/50 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>

            {/* Map + Extra Info */}
            <div className="space-y-8">
              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden border border-zinc-800 aspect-video bg-zinc-900 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-950/20 to-zinc-900" />
                <div className="relative z-10 text-center">
                  <div className="h-16 w-16 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-orange-400" />
                  </div>
                  <p className="text-white font-bold text-lg">Karachi Broast</p>
                  <p className="text-zinc-400 text-sm mt-1">Main Street, Gulshan-e-Iqbal</p>
                  <p className="text-zinc-500 text-xs mt-0.5">Karachi, Pakistan</p>
                </div>
              </div>

              {/* Quick info */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-orange-400 flex-shrink-0" />
                  <h3 className="font-bold text-white">Quick Response Promise</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  We respond to all emails within <span className="text-orange-400 font-semibold">24 hours</span>, and phone calls are answered during our operating hours (12 PM – 2 AM daily).
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {[
                    { label: "Avg Response", value: "2 hrs" },
                    { label: "Satisfaction", value: "98%" },
                    { label: "Support Days", value: "7/7" },
                    { label: "Call Hours", value: "14 hrs" },
                  ].map((s) => (
                    <div key={s.label} className="text-center bg-zinc-950 rounded-xl p-3">
                      <p className="text-orange-400 font-black text-xl">{s.value}</p>
                      <p className="text-zinc-500 text-xs mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24 bg-zinc-900/30 border-t border-zinc-800">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-4">Quick Answers</p>
            <h2 className="text-4xl font-black">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-200 hover:border-zinc-700"
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-white pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-orange-400 flex-shrink-0 transition-transform duration-200 ${openFaq === index ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
