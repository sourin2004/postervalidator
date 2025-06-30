import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OverviewPage() {
  return (
    <AppShell>
      <div className="w-full max-w-4xl space-y-8">
          <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                  <CardTitle className="font-headline text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                      PosterValidator was built to demonstrate the power of modern AI in understanding and processing visual information. Our goal is to provide a simple, intuitive interface for users to get detailed analysis of poster images, from text extraction to dimensional estimation.
                  </p>
                  <p>
                      This application leverages cutting-edge generative AI models to deliver accurate and comprehensive results. Whether you're a designer checking your work, a marketer analyzing promotional material, or just curious about the capabilities of AI, PosterValidator is here to help.
                  </p>
              </CardContent>
          </Card>
           <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                  <CardTitle className="font-headline text-2xl">Technology Stack</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                 <p>This project is built with the following technologies:</p>
                 <ul className="list-disc list-inside">
                      <li>Next.js - React Framework</li>
                      <li>Genkit by Firebase - AI Integration</li>
                      <li>ShadCN UI - Component Library</li>
                      <li>Tailwind CSS - Styling</li>
                 </ul>
              </CardContent>
          </Card>
      </div>
    </AppShell>
  );
}
