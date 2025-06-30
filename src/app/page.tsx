"use client";

import { useState } from "react";
import { PosterForm } from "@/components/poster-form";
import { ResultCard } from "@/components/result-card";
import { type ValidationResult, validateImage } from "@/app/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/layout/app-shell";
import { AuthDialog } from "@/components/auth-dialog";

export default function Home() {
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleValidation = async (imageUrl: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const response = await validateImage({ imageUrl });

    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setResult(response.data);
    }

    setIsLoading(false);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setResult(null);
    setError(null);
  }
  
  const authAction = isAuthenticated ? (
    <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
      <LogOut />
      Logout
    </Button>
  ) : (
    <AuthDialog onAuthSuccess={handleAuthSuccess} />
  );

  return (
    <AppShell actions={authAction}>
      <div className="w-full max-w-2xl space-y-8">
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400 animate-in fade-in slide-in-from-top-4 duration-1000">
            PosterValidator
          </h1>
          <p className="text-muted-foreground mt-4 text-lg animate-in fade-in slide-in-from-top-4 duration-1000 delay-200">
            Enter an image URL to detect and analyze posters with AI.
          </p>
        </header>

        <>
          <PosterForm onSubmit={handleValidation} isLoading={isLoading} />

          {error && (
            <Alert variant="destructive" className="mt-8">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isLoading && (
            <Card className="mt-8 overflow-hidden shadow-lg border-primary/20">
              <CardContent className="p-6">
                  <Skeleton className="h-[300px] w-full rounded-md" />
                  <div className="space-y-4 mt-6">
                      <Skeleton className="h-6 w-1/2" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-full" />
                  </div>
              </CardContent>
            </Card>
          )}

          {result && !isLoading && <ResultCard result={result} />}
        </>
      </div>
    </AppShell>
  );
}
