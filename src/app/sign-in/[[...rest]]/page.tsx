import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-2">Welcome Back</p>
          <h1 className="text-3xl font-black text-white">
            Karachi Broast
          </h1>
          <p className="text-zinc-400 mt-2">
            Sign in to your account
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: "bg-orange-500 hover:bg-orange-600 text-white",
              card: "bg-zinc-900 border border-zinc-800 shadow-xl",
              headerTitle: "text-white font-black",
              headerSubtitle: "text-zinc-400",
              socialButtonsBlockButton: "border-zinc-700 text-zinc-300 hover:bg-zinc-800",
              formFieldLabel: "text-zinc-300",
              formFieldInput: "bg-zinc-800 border-zinc-700 text-white",
              footerActionLink: "text-orange-400 hover:text-orange-300",
            },
          }}
        />
      </div>
    </div>
  )
}
