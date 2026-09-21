import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-header">
      <div className="container-page flex min-h-[70svh] flex-col items-start justify-center py-20 md:items-center md:text-center">
        <p className="font-heading text-[clamp(5rem,20vw,12rem)] leading-none text-line">404</p>
        <h1 className="mt-2 text-4xl md:text-6xl">Halaman tidak ditemukan.</h1>
        <p className="mt-5 max-w-md text-soft md:text-lg">
          Alamat yang kamu buka tidak ada atau sudah dipindahkan.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/shop" className="btn btn-primary">
            Kembali ke Shop
          </Link>
          <Link href="/" className="btn btn-outline">
            Ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
