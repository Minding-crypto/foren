import type { Metadata } from "next"

import "./globals.css"

export const metadata: Metadata = {
  title: "Holmes | The Proof Layer for AI Agents",
  description:
    "Holmes turns AI agent decisions and actions into bounded, intervention-tested evidence reports for compliance, audit, and incident review.",
  keywords: [
    "Holmes",
    "AI audit",
    "mechanistic interpretability",
    "LLM compliance",
    "model governance",
    "activation patching"
  ],
  openGraph: {
    title: "Holmes | The Proof Layer for AI Agents",
    description:
      "Bounded, mathematically tested evidence for why an AI agent made a decision or took an action.",
    type: "website",
    locale: "en_US"
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
