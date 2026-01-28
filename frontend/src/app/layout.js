import './globals.css'

export const metadata = {
  title: 'My Portfolio',
  description: 'DevOps Learning Portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
