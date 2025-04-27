import Link from "next/link";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="flex justify-center items-center h-16 bg-background sticky top-0 z-40 w-full border-b">
        <div className="container flex items-end w-full">
          <nav className="flex items-center gap-2 px-2">
            <Link href="/">Inicio</Link>
            <Link href="/expense">Gastos</Link>
            <Link href="/incomes">Ingresos</Link>
          </nav>
        </div>
      </header>
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
