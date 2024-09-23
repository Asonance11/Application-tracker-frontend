"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between mb-8 p-4">
      <Link href="/dashboard" className="text-3xl text-main font-bold">
        Tracker
      </Link>
      <Button variant="neutral" asChild>
        <Link href="/new">New</Link>
      </Button>
    </nav>
  );
};

export default Navbar;
