
"use client";

import * as React from "react";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function Footer() {
    const [year, setYear] = React.useState<number | null>(null);

    React.useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    const socialLinks = [
        { icon: <Mail />, href: "mailto:work.aadityakumar@gmail.com", "aria-label": "Email" },
        { icon: <Linkedin />, href: "https://linkedin.com/in/aaditya-kumar-a60205247", "aria-label": "LinkedIn" },
        { icon: <Github />, href: "https://github.com/aADiTya-1", "aria-label": "GitHub" },
        { icon: <Twitter />, href: "https://twitter.com/aadityakumar_1", "aria-label": "Twitter" },
    ];

    return (
        <footer className="bg-card border-t py-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                    &copy; {year || new Date().getFullYear()} ExamEase. All rights reserved.
                </p>
                <div className="flex items-center space-x-2">
                    {socialLinks.map((link) => (
                        <Link key={link.href} href={link.href} passHref>
                           <Button variant="ghost" size="icon" aria-label={link['aria-label']}>
                             {link.icon}
                           </Button>
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}

    