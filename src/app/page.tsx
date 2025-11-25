"use client"
import BreakingNews from "@/components/Home/BreakingNews/BreakingNews";
import MainContent from "@/components/Home/MainContent/MainContent";
import CategorySections from "@/components/Home/CategorySections/CategorySections";

export default function Home() {
  return (
    <div className="container">
        <BreakingNews/>
        <MainContent/>
        <CategorySections/>
    </div>
  );
}