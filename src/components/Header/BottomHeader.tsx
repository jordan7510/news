"use client"
import { useLanguage } from "@/context/LanguageContext";
import { useCategory } from "@/hooks/useCategory"
import { BsFillHouseDoorFill } from "react-icons/bs";

export default function BottomHeader() {
  const categories = useCategory()
  const categoriesNames = categories.slice(7,19)
  const {lang} = useLanguage()
  
  
  return (
    <div className="border-b border-yellow-600 align-middle py-3">
      <ul className="flex gap-4 items-center ml-2">
        <li><BsFillHouseDoorFill className="text-lg text-brand"/></li>
        {
          categoriesNames.map((catName,i)=>(
            <li key={i} className="hover:text-brand cursor-pointer"><p>{lang === "Odia"? catName.odia :catName.name}</p></li>
          ))
        }
      </ul>
    </div>
  )
}
