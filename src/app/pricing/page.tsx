import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PricingPage() {
  return (
    <AppShell>
      <div className="w-full max-w-4xl space-y-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
          Pricing
        </h1>
        <p className="text-muted-foreground text-lg">
          Flexible plans for every need.
        </p>
        <Card className="border-primary/20 shadow-lg text-left">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our pricing plans are being finalized. We will offer a range of options, including a generous free tier for getting started. Stay tuned for updates!
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
