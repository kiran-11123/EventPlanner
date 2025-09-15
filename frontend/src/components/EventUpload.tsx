import axios from "axios";
import { useState } from "react";

export default function EventUpload() {
    const [EventName, SetEventName] = useState<string>('');
    const [EventImage, SetEventImage] = useState<File | null>(null);
    const [EventDate, SetEventDate] = useState<string>('');
    const [EventDuration, SetEventDuration] = useState<string>('');
    const [EventVenue, SetEventVenue] = useState<string>('');
    const [OrganizedBy, SetOrganizedBy] = useState<string>('');
    const [Start, setStart] = useState<string>('');
    const [End, setEnd] = useState<string>('');
    const [EventType, SetEventType] = useState<string>('');
    const [TotalTickets, SetTotalTickets] = useState<number>(0);
    const [Price, SetPrice] = useState<number>(0);
    const [message, SetMessage] = useState<string>('');

    function ImageSetting(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            SetEventImage(e.target.files[0]);
        }
    }

    async function submitForm(e: React.FormEvent) {
        e.preventDefault();

        try {
            if (!EventImage) {
                window.alert("Please upload Event Image");
                return;
            }

            const formData = new FormData();

            formData.append("EventName", EventName);
            formData.append("EventImage", EventImage);
            formData.append("EventDate", EventDate);
            formData.append("Duration", EventDuration);
            formData.append("Venue", EventVenue);
            formData.append("OrganizedBy", OrganizedBy);
            formData.append("StartTime", Start);
            formData.append("EndTime", End);
            formData.append("EventType", EventType);
            formData.append("TotalTickets", TotalTickets.toString());
            formData.append("Price", Price.toString());

            const response = await axios.post("http://localhost:5000/api/eventUpload/upload", formData, {
                withCredentials: true,
            });

            console.log(response);

            if (response.data) {
                SetMessage(response.data.message || "No message from server");

                setTimeout(() => {
                    SetMessage("");
                }, 2000);

                // Reset form only if upload was successful
                SetEventName("");
                SetEventImage(null);
                SetEventDate("");
                SetEventDuration("");
                SetEventVenue("");
                SetOrganizedBy("");
                setStart("");
                setEnd("");
                SetEventType("");
                SetTotalTickets(0);
                SetPrice(0);
            }
        } catch (er: any) {
            console.error(er);

            if (er.response && er.response.data && er.response.data.message) {
                SetMessage(er.response.data.message);
            } else {
                SetMessage("Something went wrong");
            }

            setTimeout(() => {
                SetMessage("");
            }, 2000);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-4xl p-6 rounded-md shadow-xl bg-white overflow-auto">
                <h1 className="text-center text-blue-700 font-semibold text-xl sm:text-2xl mb-6">
                    Register your Event here
                </h1>

                <form className="space-y-6" onSubmit={submitForm}>
                    {/* Event Name & Image */}
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1 min-w-0">
                            <label htmlFor="eventName" className="block mb-1 text-gray-700 font-medium">
                                Event Name
                            </label>
                            <input
                                id="eventName"
                                type="text"
                                required
                                placeholder="Event Name"
                                className="w-full max-w-full px-4 py-2 placeholder:text-sm sm:placeholder:text-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => SetEventName(e.target.value)}
                                value={EventName}
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <label htmlFor="image" className="block mb-1 text-gray-700 font-medium">
                                Image
                            </label>
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                required
                                className="w-full max-w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={ImageSetting}
                            />
                        </div>
                    </div>

                    {/* Event Date & Duration */}
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1 min-w-0">
                            <label htmlFor="eventDate" className="block mb-1 text-gray-700 font-medium">
                                Event Date
                            </label>
                            <input
                                id="eventDate"
                                type="text"
                                required
                                placeholder="Event Date"
                                className="w-full max-w-full px-4 py-2 placeholder:text-sm sm:placeholder:text-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => SetEventDate(e.target.value)}
                                value={EventDate}
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <label htmlFor="duration" className="block mb-1 text-gray-700 font-medium">
                                Duration
                            </label>
                            <input
                                id="duration"
                                type="text"
                                required
                                placeholder="Duration"
                                className="w-full max-w-full px-4 py-2 placeholder:text-sm sm:placeholder:text-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => SetEventDuration(e.target.value)}
                                value={EventDuration}
                            />
                        </div>
                    </div>

                    {/* Venue & Organized By */}
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1 min-w-0">
                            <label htmlFor="venue" className="block mb-1 text-gray-700 font-medium">
                                Venue
                            </label>
                            <input
                                id="venue"
                                type="text"
                                required
                                placeholder="Venue"
                                className="w-full max-w-full px-4 py-2 placeholder:text-sm sm:placeholder:text-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => SetEventVenue(e.target.value)}
                                value={EventVenue}
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <label htmlFor="organizedBy" className="block mb-1 text-gray-700 font-medium">
                                Organized By
                            </label>
                            <input
                                id="organizedBy"
                                type="text"
                                required
                                placeholder="Organized By"
                                className="w-full max-w-full px-4 py-2 placeholder:text-sm sm:placeholder:text-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => SetOrganizedBy(e.target.value)}
                                value={OrganizedBy}
                            />
                        </div>
                    </div>

                    {/* Start Time & End Time */}
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1 min-w-0">
                            <label htmlFor="startTime" className="block mb-1 text-gray-700 font-medium">
                                Start Time
                            </label>
                            <input
                                id="startTime"
                                type="text"
                                required
                                placeholder="Start Time"
                                className="w-full max-w-full px-4 py-2 placeholder:text-sm sm:placeholder:text-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => setStart(e.target.value)}
                                value={Start}
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <label htmlFor="endTime" className="block mb-1 text-gray-700 font-medium">
                                End Time
                            </label>
                            <input
                                id="endTime"
                                type="text"
                                required
                                placeholder="End Time"
                                className="w-full max-w-full px-4 py-2 placeholder:text-sm sm:placeholder:text-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => setEnd(e.target.value)}
                                value={End}
                            />
                        </div>
                    </div>

                    {/* Event Type & Total Tickets */}
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1 min-w-0">
                            <label htmlFor="eventType" className="block mb-1 text-gray-700 font-medium">
                                Event Type
                            </label>
                            <input
                                id="eventType"
                                type="text"
                                required
                                placeholder="Event Type"
                                className="w-full max-w-full px-4 py-2 placeholder:text-sm sm:placeholder:text-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => SetEventType(e.target.value)}
                                value={EventType}
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <label htmlFor="totalTickets" className="block mb-1 text-gray-700 font-medium">
                                Total Tickets
                            </label>
                            <input
                                id="totalTickets"
                                type="text"
                                required
                                placeholder="Total Tickets"
                                className="w-full max-w-full px-4 py-2 placeholder:text-sm sm:placeholder:text-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => SetTotalTickets(Number(e.target.value))}
                                value={TotalTickets}
                            />
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1 min-w-0">
                            <label htmlFor="price" className="block mb-1 text-gray-700 font-medium">
                                Price
                            </label>
                            <input
                                id="price"
                                type="text"
                                required
                                placeholder="price"
                                className="w-full max-w-full px-4 py-2 placeholder:text-sm sm:placeholder:text-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => SetPrice(Number(e.target.value))}
                                value={Price}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 font-bold text-white bg-green-400 rounded-md hover:bg-green-500 transition-colors"
                    >
                        Upload
                    </button>
                </form>

                {message && (
                    <p className="text-red-500 mt-3 mb-5 text-center font-bold sm:text-xl">{message}</p>
                )}
            </div>
        </div>
    );
}
