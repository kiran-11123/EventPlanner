import { useState } from "react";

export default function Card({ data }: any) {
  const [expanded, setExpanded] = useState(false);
  const image = data ? data.EventImage : "default.jpg";

  const imageUrl = `http://localhost:5000/uploads/${image}`;

  return (
    <div
      className={`relative flex flex-col gap-4 items-center bg-white shadow-xl rounded-xl p-6 transition-all duration-500 
        ${expanded ? "w-full max-w-4xl" : "w-full max-w-sm sm:max-w-md"}`}
    >
      {/* Close button only when expanded */}
      {expanded && (
        <button
          className="absolute top-4 right-4 text-xl bg-red-600 text-white rounded-lg px-3 py-1 hover:bg-red-700 transition"
          onClick={() => setExpanded(false)}
          aria-label="Close"
        >
          ✕
        </button>
      )}

      {/* Image */}
      <div
        className={`w-full rounded-lg overflow-hidden border-2 transition-all duration-500 ${
          expanded ? "h-96" : "h-60"
        }`}
      >
        <img
          src={imageUrl}
          alt="Card image"
          className={`w-full h-full transition-all duration-500 ${
            expanded ? "object-contain" : "object-cover"
          }`}
        />
      </div>

      {/* Title */}
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mt-2">
        {data.EventName}
      </h2>

      {/* Description (short always visible) */}
      <p className="text-gray-600 text-base text-center">
        {data.EventDescription}
      </p>

      {/* Expanded details */}
      {expanded && (
        <div className="w-full mt-4 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row w-full justify-between items-center gap-4">
            <p className="text-lg text-black">
              Event Date: <span className="font-semibold">{data.EventDate}</span>
            </p>
            <p className="text-lg text-black">
              Venue: <span className="font-semibold">{data.Venue}</span>
            </p>
            <p className="text-lg text-black">
              Start Time: <span className="font-semibold">{data.StartTime}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row w-full justify-between items-center gap-4">
            <p className="text-lg text-black">
              Ticket Price: <span className="font-semibold">{data.Price}</span>
            </p>
            <button className="px-4 py-2 border rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition">
              Buy Ticket
            </button>
            <p className="text-lg text-black">
              Organized By: <span className="font-semibold">{data.OrganizedBy}</span>
            </p>
          </div>
        </div>
      )}

      {/* Expand button */}
      {!expanded && (
        <button
          className="mt-3 px-4 py-2 rounded-lg font-bold bg-blue-600 text-white hover:bg-blue-700 transition"
          onClick={() => setExpanded(true)}
        >
          View details
        </button>
      )}
    </div>
  );
}
