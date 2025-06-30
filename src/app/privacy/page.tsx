import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <AppShell>
      <div className="w-full max-w-4xl space-y-8">
        <header className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                Privacy Policy
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
                How we handle your data.
            </p>
        </header>
        <Card className="border-primary/20 shadow-lg text-left">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This is a placeholder for the Privacy Policy. A detailed document explaining how user data is collected, used, and protected will be available here soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
