import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResourcePage() {
  return (
    <AppShell>
      <div className="w-full max-w-4xl space-y-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
          Resources
        </h1>
        <p className="text-muted-foreground text-lg">
          Helpful links and community resources.
        </p>
        <Card className="border-primary/20 shadow-lg text-left">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Work in Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We are compiling a list of useful resources, including tutorials, case studies, and links to the community. Please check back soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
