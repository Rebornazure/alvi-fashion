/**
 * Warna yang dikenali website. Nama warna di data/products.ts harus sama
 * dengan salah satu key di bawah. Tambah warna baru dengan menambah baris baru.
 * `aliases` dipakai supaya pencarian "hitam" juga menemukan warna Black.
 */
export const colorMap: Record<string, { hex: string; aliases: string[] }> = {
  Black: { hex: "#111111", aliases: ["hitam"] },
  Grey: { hex: "#8B8B8B", aliases: ["abu", "abu-abu", "gray"] },
  Brown: { hex: "#6B4F3A", aliases: ["coklat", "cokelat"] },
  Army: { hex: "#4B5320", aliases: ["hijau army", "hijau"] },
  Khaki: { hex: "#B8A67A", aliases: ["krem", "cream"] },
  Navy: { hex: "#1F2A44", aliases: ["biru", "biru dongker", "dongker"] },
};

export function getColorHex(name: string): string {
  return colorMap[name]?.hex ?? "#CCCCCC";
}
