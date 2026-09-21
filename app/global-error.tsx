"use client";

/** Menangkap error pada root layout — dirender tanpa layout, jadi styling dibuat inline. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="id">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#F7F6F2",
          color: "#111111",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "2.5rem", margin: 0 }}>Ada yang tidak beres.</h1>
          <p style={{ color: "#5C5C5C", margin: "16px 0 28px" }}>Website gagal dimuat. Coba muat ulang halaman.</p>
          <button
            type="button"
            onClick={reset}
            style={{
              background: "#111111",
              color: "#fff",
              border: 0,
              borderRadius: 3,
              padding: "14px 28px",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Coba lagi
          </button>
        </div>
      </body>
    </html>
  );
}
