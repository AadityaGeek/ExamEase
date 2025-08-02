
"use client";

import * as React from "react";

export function Footer() {
    const [year, setYear] = React.useState<number | null>(null);

    React.useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="text-center mt-12 text-sm text-muted-foreground">
            <p>&copy; {year || new Date().getFullYear()} ExamEase. All rights reserved.</p>
        </footer>
    );
}
