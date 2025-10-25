import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Apple, Monitor, Smartphone } from "lucide-react"

export default function DownloadPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h1 className="text-5xl font-bold tracking-tight mb-6 text-balance">Téléchargez SoftwarePro</h1>
            <p className="text-xl text-muted-foreground text-balance">
              Disponible sur toutes les plateformes. Choisissez votre système d'exploitation et commencez en quelques
              minutes.
            </p>
          </div>

          {/* Download Cards */}
          <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {/* Windows */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Monitor className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Windows</h3>
                  <p className="text-sm text-muted-foreground mb-4">Windows 10 ou supérieur</p>
                  <p className="text-xs text-muted-foreground mb-4">Version 2.4.1 • 125 MB</p>
                </div>
                <Button className="w-full" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger
                </Button>
              </div>
            </Card>

            {/* macOS */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Apple className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">macOS</h3>
                  <p className="text-sm text-muted-foreground mb-4">macOS 11 ou supérieur</p>
                  <p className="text-xs text-muted-foreground mb-4">Version 2.4.1 • 118 MB</p>
                </div>
                <Button className="w-full" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger
                </Button>
              </div>
            </Card>

            {/* Linux */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Monitor className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Linux</h3>
                  <p className="text-sm text-muted-foreground mb-4">Ubuntu, Debian, Fedora</p>
                  <p className="text-xs text-muted-foreground mb-4">Version 2.4.1 • 112 MB</p>
                </div>
                <Button className="w-full" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger
                </Button>
              </div>
            </Card>
          </div>

          {/* Mobile Section */}
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-8">Applications mobiles</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* iOS */}
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">iOS</h3>
                    <p className="text-sm text-muted-foreground">iOS 14 ou supérieur</p>
                  </div>
                  <Button variant="outline">App Store</Button>
                </div>
              </Card>

              {/* Android */}
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Android</h3>
                    <p className="text-sm text-muted-foreground">Android 8 ou supérieur</p>
                  </div>
                  <Button variant="outline">Google Play</Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Installation Instructions */}
          <div className="mx-auto max-w-3xl mt-16">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
              <h2 className="text-2xl font-bold mb-6">Instructions d'installation</h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Téléchargez l'installateur</p>
                    <p className="text-sm">Choisissez la version correspondant à votre système d'exploitation</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Lancez l'installation</p>
                    <p className="text-sm">Ouvrez le fichier téléchargé et suivez les instructions à l'écran</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Commencez à utiliser</p>
                    <p className="text-sm">
                      Une fois installé, lancez l'application et connectez-vous avec votre compte
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
