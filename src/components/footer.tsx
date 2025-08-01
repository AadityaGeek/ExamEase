"use client";

import * as React from "react";

export function Footer() {
    const [year, setYear] = React.useState(new Date().getFullYear());

    React.useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="text-center mt-12 text-sm text-muted-foreground">
            <p>&copy; {year} QuizCraft AI. All rights reserved.</p>
        </footer>
    );
}
