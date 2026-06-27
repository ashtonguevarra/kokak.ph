import { Link } from "wouter";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground selection:bg-primary/20">
      <header className="border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur z-10">
        <div className="container mx-auto px-4 h-16 flex items-center gap-6 ">
          <img
            src={`${import.meta.env.BASE_URL}LOGO.png`}
            alt="Kokak Logo"
            className="h-8"
          />
          <Link href="/" className="font-serif text-2xl font-bold text-primary tracking-tight">
            Kokak
          </Link>
          <nav className="flex items-center gap-6 justify-between">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Play
            </Link>
            <Link href="/contribute" className="text-sm font-medium hover:text-primary transition-colors">
              Contribute
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}
