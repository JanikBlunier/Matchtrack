import Link from "next/link";
import { FiHome, FiClipboard } from "react-icons/fi";

export default function Nav() {
    return (
        <nav
            className="
        fixed bottom-0 left-0 z-50
        w-full h-16
        bg-slate-900 border-t border-slate-800
        flex items-center justify-around
        text-slate-300
      "
        >
            <Link
                href="/"
                className="
          flex flex-col items-center justify-center gap-1
          text-xs hover:text-white transition-colors
        "
            >
                <FiHome className="text-xl" />
                Übersicht
            </Link>

            <Link
                href="/Bericht"
                className="
          flex flex-col items-center justify-center gap-1
          text-xs hover:text-white transition-colors
        "
            >
                <FiClipboard className="text-xl" />
                Bericht
            </Link>
        </nav>
    );
}
