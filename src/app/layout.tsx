import type { Metadata } from "next"

import "./globals.css"

export const metadata: Metadata = {
  title: "QueueForMe | AI Queue Agents for Singapore Drops",
  description:
    "QueueForMe eliminates overnight physical queuing for hyped product drops in Singapore with AI agents that optimize your arrival time.",
  keywords: [
    "QueueForMe",
    "Singapore queues",
    "AI agent platform",
    "product drops",
    "MRT timing",
    "transport app"
  ],
  openGraph: {
    title: "QueueForMe | Never Queue Overnight Again",
    description:
      "AI agents analyze location, MRT timings, and weather to secure your queue slot for Singapore product drops.",
    type: "website",
    locale: "en_SG"
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-SG" className="dark">
      <body>{children}</body>
    </html>
  )
}
