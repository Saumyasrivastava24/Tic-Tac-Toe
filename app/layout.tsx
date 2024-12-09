import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Tic Tac Toe 3D",
  description: "A beautiful and minimalistic Tic Tac Toe game with 3D effects",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-pattern`}>{children}</body>
    </html>
  )
}

