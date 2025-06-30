import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocumentationPage() {
  return (
    <AppShell>
      <div className="w-full max-w-4xl space-y-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
          Documentation
        </h1>
        <p className="text-muted-foreground text-lg">
          Detailed guides and API references are coming soon.
        </p>
        <Card className="border-primary/20 shadow-lg text-left">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Under Construction</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We are currently working on creating comprehensive documentation. Please check back later for more information on how to use PosterValidator and integrate its features into your own projects.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
