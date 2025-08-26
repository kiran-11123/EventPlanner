import { useState } from "react";

export default function Card({ data }: any) {
  const [expanded, setExpanded] = useState(false);
  const image = data ? data.EventImage : "default.jpg";
  const imageUrl = `http://localhost:5000/uploads/${image}`;

  return (
    <div className="relative flex flex-col gap-4 items-center bg-white shadow-xl rounded-xl p-6 w-full max-w-sm sm:max-w-md">
      {/* Image */}
      <div className="w-full h-60 rounded-lg overflow-hidden border-2">
        <img
         src={imageUrl}
         alt="Expanded Event"
         className="w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mt-2">
        {data.EventName}
      </h2>

      {/* Description */}
      <p className="text-gray-600 text-base text-center">
        {data.EventDescription}
      </p>

      {/* Expand button */}
      <button
        className="mt-3 px-4 py-2 rounded-lg font-bold bg-blue-600 text-white hover:bg-blue-700 transition"
        onClick={() => setExpanded(true)}
      >
        View details
      </button>

      {/* Expanded Overlay */}
      {expanded && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 overflow: hidden;">
          <div className="relative bg-white p-6 rounded-xl shadow-2xl w-full max-w-3xl">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-xl bg-red-600 text-white rounded-lg px-3 py-1 hover:bg-red-700 transition"
              onClick={() => setExpanded(false)}
            >
              ✕
            </button>

            {/* Expanded Image */}
            <div className="w-full h-96 rounded-lg overflow-hidden border-2 mb-4">
              <img
                src={imageUrl}
                alt="Expanded Event"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Expanded Details */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.EventName}</h2>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
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

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
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
        </div>
      )}
    </div>
  );
}
