
import { useState } from "react";

export default function Card() {
    const [expanded, setExpanded] = useState(false);

    return (
        <div
            className={`flex flex-col gap-4 items-center bg-white shadow-xl rounded-xl p-6 transition-all duration-300 ${
                expanded
                    ? "max-w-3xl w-full h-[600px] scale-105 z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    : "max-w-sm sm:max-w-md"
            }`}
        >

            {expanded && (
                <button
                    className="absolute top-4 right-5 text-xl bg-red-600 text-white rounded-lg px-3 py-1 hover:bg-red-700 transition z-10"
                    onClick={() => setExpanded(false)}
                    aria-label="Close"
                >
                    ✕
                </button>
            )}
            <img
                src="/image.jpg"
                alt="Card image"
                className={`object-cover border-2 rounded-lg opacity-90 ${
                    expanded ? " h-70 w-full " : "w-full h-60"
                }`}
            />

            <h2 className="text-md sm:text-lg font-bold text-gray-800 mt-2">
                Card Title
            </h2>

            <p className="text-gray-600 text-base text-center">
                Card description goes here.
            </p>

            {expanded && (
                 
            <div className="w-full mt-2 flex flex-col items-center gap-6">
                <div className="flex flex-col sm:flex-row w-full justify-between items-center gap-4">
                    <p className="text-lg text-black text-center sm:text-left">Event Date: <span className="font-semibold">25 August</span></p>
                    <p className="text-lg text-black text-center sm:text-left">Event Venue: <span className="font-semibold">XYZ Auditorium</span></p>
                    <p className="text-lg text-black text-center sm:text-left">Start Time: <span className="font-semibold">10:00 AM</span></p>
                </div>

                <div className="flex flex-col sm:flex-row w-full justify-between items-center gap-4">
                    <p className="text-lg text-black text-center sm:text-left">Ticket Price: <span className="font-semibold">5000</span></p>
                    <button className="px-4 py-2 border rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition">Buy Ticket</button>
                    <p className="text-md sm:text-lg text-black text-center sm:text-left">Organized By: <span className="font-semibold">ABC Events</span></p>
                </div>
            </div>

                 
            )}

           {!expanded && (
                <button
                    className="px-4 py-2 rounded-lg font-bold bg-blue-600 text-white hover:bg-blue-700 transition"
                    onClick={() => setExpanded(true)}
                >
                    View details
                </button>
            )}
        </div>
    );
}