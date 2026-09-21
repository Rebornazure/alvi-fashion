#!/usr/bin/env python3
"""
Membuat gambar PLACEHOLDER untuk ALVI FASHION di public/images/.

Semua file yang dibuat di sini hanya penanda posisi foto. Ganti dengan foto asli toko
(nama file boleh tetap sama, atau ubah path-nya di data/products.ts, data/categories.ts,
dan data/site.ts).

Pakai (opsional, butuh Python 3 + Pillow):
    pip install pillow
    python3 scripts/generate-placeholders.py

Script ini TIDAK menimpa file yang sudah ada, kecuali dijalankan dengan --force.
"""
import os
import sys

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "images")
FORCE = "--force" in sys.argv

FONT_DIR = "/usr/share/fonts/truetype/google-fonts"


def load_font(names, size):
    for n in names:
        for base in (FONT_DIR, ""):
            path = os.path.join(base, n) if base else n
            try:
                return ImageFont.truetype(path, size)
            except OSError:
                continue
    return ImageFont.load_default()


def sans(size):
    return load_font(["Poppins-Medium.ttf", "DejaVuSans.ttf", "Arial.ttf"], size)


def serif(size):
    return load_font(["Lora-Variable.ttf", "DejaVuSerif.ttf", "Georgia.ttf"], size)


# Nada per kategori: (atas, bawah) untuk gradasi vertikal.
TONES = {
    "cargo": ((88, 90, 70), (52, 54, 42)),
    "tactical": ((70, 74, 66), (38, 40, 36)),
    "pendek": ((150, 138, 116), (112, 100, 82)),
    "panjang": ((120, 112, 98), (78, 72, 62)),
    "formal": ((64, 66, 74), (30, 31, 36)),
    "chino": ((176, 158, 128), (138, 120, 92)),
    "hoodie": ((96, 92, 90), (56, 54, 54)),
    "sweater": ((132, 118, 104), (92, 80, 68)),
    "hero": ((46, 44, 40), (17, 17, 17)),
    "brand": ((46, 44, 40), (17, 17, 17)),
    "banner": ((72, 62, 50), (24, 22, 20)),
    "light": ((214, 208, 196), (188, 180, 166)),
}

LABELS = {
    "cargo": "Celana Cargo",
    "tactical": "Celana Tactical",
    "pendek": "Celana Pendek",
    "panjang": "Celana Panjang",
    "formal": "Celana Formal",
    "chino": "Celana Chino",
    "hoodie": "Hoodie",
    "sweater": "Sweater",
}


def gradient(size, top, bottom):
    w, h = size
    img = Image.new("RGB", size, top)
    px = ImageDraw.Draw(img)
    for y in range(h):
        t = y / max(h - 1, 1)
        c = tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
        px.line([(0, y), (w, y)], fill=c)
    return img


def texture(img, alpha=14):
    """Garis diagonal halus supaya tidak terlihat seperti kotak warna polos."""
    w, h = img.size
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    step = max(w // 28, 18)
    for x in range(-h, w, step):
        d.line([(x, 0), (x + h, h)], fill=(255, 255, 255, alpha), width=1)
    return Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")


def centered(draw, text, font, y, w, fill, ox=0):
    box = draw.textbbox((0, 0), text, font=font)
    draw.text(((w - (box[2] - box[0])) / 2 - box[0] + ox, y), text, font=font, fill=fill)


def make(path, size, tone, title, subtitle, note="FOTO PLACEHOLDER", fg=(255, 255, 255), cx=0.5, cy=0.40, scale=1.0):
    full = os.path.join(ROOT, path)
    if os.path.exists(full) and not FORCE:
        return False
    os.makedirs(os.path.dirname(full), exist_ok=True)
    w, h = size
    top, bottom = TONES[tone]
    img = texture(gradient(size, top, bottom))
    d = ImageDraw.Draw(img)

    unit = min(w, h)
    pad = int(unit * 0.06)
    line = tuple(int(c * 0.35 + 255 * 0.65) if fg[0] > 128 else int(c * 0.5) for c in fg)
    muted = (*fg[:3],)
    # bingkai sudut
    L = int(unit * 0.07)
    for (x, y, dx, dy) in [(pad, pad, 1, 1), (w - pad, pad, -1, 1), (pad, h - pad, 1, -1), (w - pad, h - pad, -1, -1)]:
        d.line([(x, y), (x + dx * L, y)], fill=line, width=2)
        d.line([(x, y), (x, y + dy * L)], fill=line, width=2)

    # Teks diletakkan di sekitar titik (cx, cy) supaya tidak bertabrakan dengan teks di atas foto.
    u = unit * scale
    ox = int(w * cx - w * 0.5)
    y0 = h * cy
    centered(d, note, sans(int(u * 0.03)), y0, w, muted, ox)
    centered(d, title, serif(int(u * 0.07)), y0 + u * 0.065, w, fg, ox)
    if subtitle:
        centered(d, subtitle, sans(int(u * 0.03)), y0 + u * 0.17, w, muted, ox)
    if cx == 0.5:
        centered(d, "ALVI FASHION", sans(int(unit * 0.026)), h - pad - unit * 0.05, w, muted)
    img.save(full, "JPEG", quality=78, optimize=True, progressive=True)
    return True


def main():
    created = 0

    # Produk 4:5
    products = [
        ("cargo", ["001", "002"]),
        ("tactical", ["001", "002"]),
        ("pendek", ["001", "002"]),
        ("panjang", ["001", "002"]),
        ("formal", ["001", "002"]),
        ("chino", ["001", "002"]),
        ("hoodie", ["001", "002"]),
        ("sweater", ["001"]),
    ]
    for key, nums in products:
        for n in nums:
            for shot in (1, 2):
                name = f"{key}-{n}-{shot}.jpg"
                made = make(
                    f"products/{name}",
                    (800, 1000),
                    key,
                    LABELS[key],
                    f"Produk {n} · Foto {shot} · 800×1000",
                )
                created += made

    # Kategori 3:4
    cats = {
        "celana-cargo": ("cargo", "Celana Cargo"),
        "celana-tactical": ("tactical", "Celana Tactical"),
        "celana-pendek": ("pendek", "Celana Pendek"),
        "celana-panjang": ("panjang", "Celana Panjang"),
        "celana-formal": ("formal", "Celana Formal"),
        "celana-chino": ("chino", "Celana Chino"),
        "hoodie-sweater": ("hoodie", "Hoodie & Sweater"),
    }
    for slug, (tone, title) in cats.items():
        created += make(f"categories/{slug}.jpg", (900, 1200), tone, title, "Foto kategori · 900×1200", cy=0.22, scale=0.85)

    # Banner
    created += make("banners/hero.jpg", (1920, 1200), "hero", "Foto Hero", "Banner utama · 1920×1200", cx=0.80, cy=0.36, scale=0.55)
    created += make("banners/promo.jpg", (1600, 900), "banner", "Foto Promo", "Banner promo · 1600×900", cx=0.80, cy=0.30, scale=0.6)
    created += make("banners/story.jpg", (1000, 1250), "banner", "Foto Brand", "Cerita brand · 1000×1250")
    created += make("banners/location.jpg", (1200, 900), "banner", "Foto Toko", "Foto toko/lokasi · 1200×900")
    created += make("brand/og-image.jpg", (1200, 630), "brand", "ALVI FASHION", "Gambar bagikan link (OG) · 1200×630", note="FASHION UNTUK GAYA SEHARI-HARI")

    print(f"Selesai. {created} gambar placeholder dibuat di public/images/")


if __name__ == "__main__":
    main()
