export function pick<T>(arr: readonly T[], seed: number): T {
  if (arr.length === 0) throw new Error("pick: empty array");
  const item = arr[((seed % arr.length) + arr.length) % arr.length];
  if (item === undefined) throw new Error("pick: undefined");
  return item;
}

export function rng(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function pad(n: number, w = 4): string {
  return String(n).padStart(w, "0");
}

export function pickWeighted<T extends string>(
  weights: Record<T, number>,
  seed: number,
): T {
  const entries = Object.entries(weights) as [T, number][];
  const total = entries.reduce((s, [, w]) => s + w, 0);
  const r = ((seed * 9301 + 49297) % 233280) / 233280;
  let acc = 0;
  for (const [key, weight] of entries) {
    acc += weight / total;
    if (r <= acc) return key;
  }
  const last = entries.at(-1);
  if (!last) throw new Error("pickWeighted: empty weights");
  return last[0];
}
