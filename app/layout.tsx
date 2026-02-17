import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { MatchEventsProvider } from "@/components/match/events/MatchEventsContext";

export const metadata: Metadata = {
    title: "Match Track",
    description: "Track your match history",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <MatchEventsProvider>
            <main className="pb-20">{children}</main>
            <Nav />
        </MatchEventsProvider>
        </body>
        </html>
    );
}