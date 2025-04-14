import Link from "next/link";
import { FiGithub } from "react-icons/fi";

export const Header = () => {
  return (
    <nav className="fixed z-40 w-full border-b-[0.5px] border-gray-200 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
      <div className="mt-1 flex h-[64px] w-full max-w-[1200px] items-center justify-between px-4 mx-auto sm:px-6">
        <Link href="/blog" className="text-md font-medium">
          🐯 NLOG
        </Link>
        <Link
          href="https://github.com/fbgjung"
          target="_blank"
          className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
        >
          <FiGithub className="h-5 w-5" />
        </Link>
      </div>
    </nav>
  );
};
