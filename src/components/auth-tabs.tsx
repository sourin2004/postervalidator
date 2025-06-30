"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { LoginForm } from "./login-form";
import { SignUpForm } from "./signup-form";

type AuthTabsProps = {
  onAuthSuccess: () => void;
};

export function AuthTabs({ onAuthSuccess }: AuthTabsProps) {
  return (
    <Tabs defaultValue="login" className="w-full max-w-md animate-in fade-in-50 duration-500">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card className="border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Enter your credentials to access the PosterValidator.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm onLoginSuccess={onAuthSuccess} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card className="border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
            <CardDescription>
              Get started by creating a new account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm onSignUpSuccess={onAuthSuccess} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
