export default function Loading() {
  return (
    <div className="pt-header" role="status" aria-live="polite">
      <span className="sr-only">Memuat halaman…</span>
      <div className="container-page py-16 md:py-24" aria-hidden>
        <div className="h-12 w-3/4 max-w-xl animate-pulse rounded-[3px] bg-line md:h-16" />
        <div className="mt-4 h-5 w-1/2 max-w-md animate-pulse rounded-[3px] bg-line" />
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[4/5] animate-pulse rounded-[3px] bg-line" />
              <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-line" />
              <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-line" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
