import { useState } from "react";

const DateSelector = ({ onFetch }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = () => {
    if (!startDate || !endDate) return alert("Please select both dates.");

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = (end - start) / (1000 * 60 * 60 * 24);

    if (diff < 0) return alert("End date cannot be before start date.");
    if (diff > 7) return alert("End date must be within 7 days of start date.");

    onFetch(startDate, endDate);
  };

  return (
    <div className="flex flex-col absolute text-white left-1/12 top-20">
      <div className="flex flex-col px-6 py-3 text-center text-xl bg-white/10 rounded-2xl">
        <h1 className="font-bold text-3xl m-4">Asteroid Search</h1>
        <label htmlFor="startDate" className="flex mr-2">
          Enter Start Date:
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          className="bg-white/20 rounded-md mb-5"
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <label htmlFor="endDate" className="flex mr-2">
          Enter End Date:
        </label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          className="bg-white/20 rounded-md mb-5"
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        (Must be within seven days of start)
        <button
          onClick={() => handleSubmit(startDate, endDate)}
          className="bg-gray-600 cursor-pointer hover:bg-gray-700 py-2 rounded-md"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default DateSelector;
