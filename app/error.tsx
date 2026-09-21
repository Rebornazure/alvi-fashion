"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="pt-header">
      <div className="container-page flex min-h-[70svh] flex-col items-start justify-center py-20 md:items-center md:text-center">
        <h1 className="text-5xl md:text-7xl">Ada yang tidak beres.</h1>
        <p className="mt-5 max-w-md text-soft md:text-lg">
          Halaman ini gagal dimuat. Coba muat ulang, atau kembali ke halaman utama.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="btn btn-primary">
            Coba lagi
          </button>
          <Link href="/" className="btn btn-outline">
            Ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
