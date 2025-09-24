"use client"
import BreakingNews from "@/components/Home/BreakingNews/BreakingNews";
import MainContent from "@/components/Home/MainContent/MainContent";

export default function Home() {
  return (
    <div className="container">
        <BreakingNews/>
        <MainContent/>
    </div>
  );
}