import { ReferencesResponse } from "@/types/response";

export default function References({ reference }: { reference: ReferencesResponse }) {
  return (
    <div
      className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-3 px-4 shadow flex flex-col"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-blue-700">{reference.paper_title.replace(/_/g, " ")}</h3>
        <span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded whitespace-nowrap">
          {reference.model_name}
        </span>
      </div>
      <p className="text-sm text-gray-700 mb-2">
        <span className="font-semibold">File Name:</span> {reference.original_filename.replace(/_/g, " ")}
      </p>
    </div>
  );
}
