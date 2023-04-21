import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    // Save the data in the state or perform other actions
  };

  return (
    <div className="container mx-auto px-4">
      <div className="text-center py-8">
        <textarea
          className="border w-full h-24 p-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      <div className="flex justify-center space-x-4">
        <Link href="/one" className="bg-green-500 text-white px-4 py-2">
          Go to One
        </Link>
        <Link href="/two" className="bg-red-500 text-white px-4 py-2">
          Go to Two
        </Link>
      </div>
    </div>
  );
}
