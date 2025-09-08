import { useState } from "react";
import axios from "axios";

interface OTPProps {
  onVerified: () => void;
  
}

export default function OTP({ onVerified }: OTPProps) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function submitForm(e: any) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/otp-verify",
        { otp },
        { withCredentials: true }
      );

      if (response.status === 200 && response.data.message === "OTP verified") {
        alert("OTP verified! Registration complete.");
        onVerified();
      } else {
        setMessage(response.data.message || "OTP verification failed");
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Error verifying OTP");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center py-30 bg-white px-4 mt-10">
      <div className="w-full max-w-md sm:max-w-lg rounded shadow-2xl bg-white px-8">
        <h1 className="font-bold text-blue-700 text-center text-lg sm:text-xl mb-6 mt-5">
          Enter your OTP Here
        </h1>

        <form className="space-y-5" onSubmit={submitForm}>
          <div>
            <label className="font-bold text-lg sm:text-xl block mb-1">Enter OTP</label>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter OTP"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-3 rounded-lg text-white font-bold ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          {message && <p className="text-red-500 font-medium text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
}
