
"use client";

import Link from "next/link";
import { Bot, Home, Rocket } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";

const navLinks = [
    { href: "/", label: "Home", icon: <Home /> },
    { href: "/generate", label: "Generate", icon: <Rocket /> },
];

export function Header() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Bot className="h-6 w-6 text-primary" />
                        <span className="font-bold">ExamEase</span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {navLinks.map((link) => (
                             <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "transition-colors hover:text-foreground/80",
                                    pathname === link.href ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Mobile Nav */}
                <div className="md:hidden flex flex-1 items-center justify-between">
                     <Link href="/" className="flex items-center space-x-2">
                        <Bot className="h-6 w-6 text-primary" />
                        <span className="font-bold">ExamEase</span>
                    </Link>
                    <div className="flex items-center space-x-2">
                        {navLinks.map((link) => (
                             <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    buttonVariants({ variant: "ghost", size: "icon" }),
                                    "transition-colors hover:text-foreground/80",
                                    pathname === link.href ? "text-foreground bg-accent" : "text-foreground/60"
                                )}
                                 aria-label={link.label}
                            >
                                {link.icon}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
}
