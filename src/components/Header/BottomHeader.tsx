"use client"
import { useLanguage } from "@/context/LanguageContext";
import { useCategory } from "@/hooks/useCategory"
import Link from "next/link";
import { BsFillHouseDoorFill } from "react-icons/bs";

export default function BottomHeader() {
  const categories = useCategory()
  const categoriesNames = categories.slice(7, 19)
  const { lang } = useLanguage()

  return (
    <div className="text-left border-b border-yellow-600 py-2 overflow-hidden whitespace-nowrap">
      
      <ul className="flex gap-4 px-2 items-center">
        <li><BsFillHouseDoorFill className="text-lg text-brand flex-shrink-0" /></li>
        {
          categoriesNames.map((catName, i) => (
            <Link href={`/${catName.slug}`} key={i}>
            <li className="hover:text-brand cursor-pointer flex-shrink-0">
              {lang === "Odia" ? catName.odia : catName.name}
            </li>
            </Link>
          )
          )
        }
      </ul>
    </div>
  )
}
