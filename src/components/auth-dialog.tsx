"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AuthTabs } from "./auth-tabs";
import { Button } from "./ui/button";
import { User } from "lucide-react";

type AuthDialogProps = {
  onAuthSuccess: () => void;
};

export function AuthDialog({ onAuthSuccess }: AuthDialogProps) {
  const [open, setOpen] = useState(false);

  const handleAuthSuccess = () => {
    onAuthSuccess();
    setOpen(false); // Close dialog on success
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            <User />
            <span>Login / Sign Up</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-0 w-full max-w-md">
         <AuthTabs onAuthSuccess={handleAuthSuccess} />
      </DialogContent>
    </Dialog>
  );
}
