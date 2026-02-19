import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { MatchEventsProvider } from "@/components/match/events/MatchEventsContext";
import { GameTimerProvider } from "@/components/match/timer/GameTimerContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Match Track",
    description: "Track your match history",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MatchEventsProvider>
            <GameTimerProvider halfMinutes={45}>
                <main className="pb-20">{children}</main>
                <Nav />
            </GameTimerProvider>
        </MatchEventsProvider>
        </body>
        </html>
    );
}