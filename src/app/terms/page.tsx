import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <AppShell>
      <div className="w-full max-w-4xl space-y-8">
        <header className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                Site Terms
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
                Our terms of service.
            </p>
        </header>
        <Card className="border-primary/20 shadow-lg text-left">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This is a placeholder for the Site Terms. A proper terms of service document will be added here in the future. By using this application, you agree to the forthcoming terms.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
