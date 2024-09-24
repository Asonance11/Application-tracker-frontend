"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="bg-white border-b-4 border-b-text">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="text-2xl text-main font-bold">
          Tracker
        </Link>
        <Button variant="neutral" asChild>
          <Link href="/new">New</Link>
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
