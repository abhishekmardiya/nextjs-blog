import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export const Navbar = () => {
  return (
    <nav className="w-full relative flex items-center justify-between">
      <Link href="/" className="font-bold text-3xl">
        Next <span className="text-primary">Blogs</span>
      </Link>
      <ModeToggle />
    </nav>
  );
};
