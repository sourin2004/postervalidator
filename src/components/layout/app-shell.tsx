'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Info, FileText, ScanSearch } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export function AppShell({ children, actions }: { children: React.ReactNode, actions?: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
                 <h1 className="text-xl font-bold font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                    PosterValidator
                 </h1>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/'} tooltip="Poster Validator">
                  <Link href="/">
                    <ScanSearch />
                    <span>Poster Validator</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/about'} tooltip="About">
                  <Link href="/about">
                    <Info />
                    <span>About</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/license'} tooltip="License">
                  <Link href="/license">
                    <FileText />
                    <span>License</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
            <header className="flex h-14 items-center justify-between gap-4 border-b bg-background/95 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
                <SidebarTrigger className="shrink-0 md:hidden"/>
                <div className="flex-1" />
                <div className="flex items-center gap-4">
                    {actions}
                </div>
            </header>
            <main className="flex flex-1 flex-col items-center p-4 sm:p-8 md:p-12">
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
