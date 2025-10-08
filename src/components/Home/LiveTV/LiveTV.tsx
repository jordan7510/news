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
    <div className="w-full flex flex-col items-center justify-between space-y-3 overflow-hidden">
      {/* Header */}
      <div className="w-full border border-brand text-center rounded-md">
        <p className="font-medium">LIVE TV</p>
      </div>

      {/* Responsive Player Wrapper */}

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : url ? (
        <div className="aspect-auto">
          <ReactPlayer
            src={url} // dynamic URL
            playing
            controls
            muted
            width="100%"
            height="100%"
          />
        </div>
      ) : (
        <p className="text-gray-500 text-center">Live TV Not Available</p>
      )}
    </div>
  );
}
