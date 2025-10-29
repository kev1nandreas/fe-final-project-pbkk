"use client";

import React from "react";

export type ReferenceItem = {
  id?: string | number;
  title: string;
  authors?: string;
  year?: string | number;
  raw?: string; // fallback raw text
};

export default function ReferencesList({ items }: { items: ReferenceItem[] }) {
  if (!items || items.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <p className="text-sm text-gray-600">No references found yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3">References ({items.length})</h3>
      <ul className="space-y-3">
        {items.map((ref, i) => (
          <li key={ref.id ?? `${i}-${ref.title}`} className="text-sm text-gray-800">
            <div className="font-medium">
              {(ref.title || ref.raw || "").replace(/_/g, " ")}
            </div>
            {ref.authors && <div className="text-xs text-gray-500">{ref.authors}</div>}
            {ref.year && <div className="text-xs text-gray-500">{ref.year}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
