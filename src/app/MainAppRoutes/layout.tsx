export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* This renders the page content */}
      <main className="flex-1">{children}</main>
      {/* Here you will eventually import your BottomTab component */}
      <nav className="h-20 border-t">Bottom Tabs Go Here</nav>
    </div>
  );
}
