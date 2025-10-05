"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function LiveTV() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/live-tv", { cache: "default" });
        if (!res.ok) {
          throw new Error(`HTTP Error! status: ${res.status}`);
        }
        const data = await res.json();
        setUrl(data.url);
      } catch (error) {
        console.error("Error fetching live TV URL", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUrl();
  }, []);

  return (
    <div className="w-full flex flex-col items-center space-y-3">
      {/* Header */}
      <div className="w-full border border-brand text-center rounded-md">
        <p className="font-medium">LIVE TV</p>
      </div>

      {/* Responsive Player Wrapper */}
      <div className="rounded-md shadow-md">

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : url ? (
            <ReactPlayer
              src={url} // dynamic URL
              playing
              controls
              muted
            />
        ) : (
          <p className="text-gray-500 text-center">Live TV Not Available</p>
        )}

      </div>
    </div>
  );
}
