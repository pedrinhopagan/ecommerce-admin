export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="flex-center h-full w-full">{children}</div>
}
