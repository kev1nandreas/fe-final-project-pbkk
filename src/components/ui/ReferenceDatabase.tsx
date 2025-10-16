"use client";

import { ReferencesResponse } from "@/types/response";
import { useCallback, useMemo, useState } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";

type ReferenceDatabaseProps = {
  catalog: ReferencesResponse[];
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
};

export default function ReferenceDatabase({
  catalog,
  selectedIds = [],
  onSelectionChange,
}: ReferenceDatabaseProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredCatalog = useMemo(() => {
    return catalog.filter((entry) => {
      const matchesSearch = normalizedSearch
        ? [
            entry.paper_title,
            entry.model_name,
            entry.original_filename,
          ]
          .filter(Boolean)
          .some((field) => field!.toLowerCase().includes(normalizedSearch))
        : true;

      return matchesSearch;
    });
  }, [catalog, normalizedSearch]);

  const handleToggleSelect = useCallback(
    (id: string) => {
      const alreadySelected = selectedIds.includes(id);
      const nextSelection = alreadySelected
        ? selectedIds.filter((selectedId) => selectedId !== id)
        : [...selectedIds, id];
      onSelectionChange?.(nextSelection);
    },
    [onSelectionChange, selectedIds]
  );

  const combinedReferences = useMemo(() => {
    return catalog.filter((entry) => selectedIds.includes(entry.original_filename));
  }, [catalog, selectedIds]);

  return (
    <section className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur p-5 shadow-inner">
      <header className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Reference Database
          </h3>
          <p className="text-sm text-gray-600">
            Browse the curated references and mark the ones you plan to send.
          </p>
        </div>
      </header>

      <div className="space-y-4">
        <div className="rounded-xl border border-white/50 bg-white/70 p-4 shadow-inner">
          <button
            type="button"
            onClick={() => setIsCatalogOpen((previous) => !previous)}
            className="flex w-full items-center justify-between text-left"
          >
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Available References
              </p>
              <p className="text-xs text-gray-500">
                {filteredCatalog.length} of {catalog.length} entries •
                {` ${selectedIds.length} selected`}
              </p>
            </div>
            <FiChevronDown
              className={`shrink-0 text-gray-500 transition-transform ${
                isCatalogOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isCatalogOpen && (
            <div className="mt-4 space-y-4">
              <div className="relative w-full">
                <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by title, author, or DOI"
                  className="w-full rounded-xl border border-gray-200 bg-white/80 py-2 pl-10 pr-3 text-sm text-gray-800 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="max-h-[18rem] space-y-4 overflow-y-auto pr-1 flex justify-center flex-wrap p-2">
                {filteredCatalog.length === 0 && (
                  <p className="text-sm text-gray-600">
                    No references match your search criteria. Try adjusting the
                    filters.
                  </p>
                )}

                {filteredCatalog.map((entry) => {
                  const isSelected = selectedIds.includes(entry.original_filename);
                  return (
                    <article
                      key={entry.original_filename}
                      className={`rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm transition-all w-full ${
                        isSelected ? "ring-2 ring-blue-300" : "hover:shadow-md"
                      }`}
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div className="flex-1">
                          <h4 className="text-base font-semibold text-gray-900">
                            {entry.paper_title}
                          </h4>
                          {entry.model_name && (
                            <p className="text-sm text-gray-600">
                              {entry.model_name}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleSelect(entry.original_filename)}
                            className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
                              isSelected
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : "bg-white/80 text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {isSelected ? "Selected" : "Select"}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-white/50 bg-white/70 p-4 shadow-inner">
          <button
            type="button"
            onClick={() => setIsOverviewOpen((previous) => !previous)}
            className="flex w-full items-center justify-between text-left"
          >
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Reference Overview
              </p>
              <p className="text-xs text-gray-500">
                {combinedReferences.length} item
                {combinedReferences.length === 1 ? "" : "s"} ready to send
              </p>
            </div>
            <FiChevronDown
              className={`shrink-0 text-gray-500 transition-transform ${
                isOverviewOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOverviewOpen && (
            <div className="mt-4">
              {combinedReferences.length === 0 ? (
                <p className="text-sm text-gray-600">
                  Select references from the catalog or submit content to see
                  an overview.
                </p>
              ) : (
                <ul className="space-y-4">
                  {combinedReferences.map((reference) => (
                    <li
                      key={reference.original_filename}
                      className="rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm"
                    >
                      <div className="space-y-1">
                        <p className="font-semibold text-gray-900 text-sm">
                          {reference.paper_title}
                        </p>
                        {reference.model_name && (
                          <p className="text-xs uppercase tracking-wide text-gray-500">
                            {reference.model_name}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
