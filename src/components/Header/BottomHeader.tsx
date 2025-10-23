"use client"
import { useLanguage } from "@/context/LanguageContext";
import { useCategory } from "@/hooks/useCategory"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFillHouseDoorFill } from "react-icons/bs";

export default function BottomHeader() {
  const [activePath, setActivePath] = useState("")
  const categories = useCategory()
  const categoriesNames = categories.slice(7, 19)
  const { lang } = useLanguage()
  const path = usePathname()

  useEffect(() => {
    const currentRoute = path.split("/")[1];
    const activeCategory = categories.find((cat) => currentRoute === cat.slug)
    if (currentRoute === "") {
      setActivePath("/")
    } else if (activeCategory) {
      setActivePath(activeCategory.slug)
    }
  }, [path, activePath, categories])



  return (
    <div className="text-left border-b border-t border-yellow-600 py-2 overflow-hidden whitespace-nowrap mb-4">

      <ul className="flex gap-4 px-2 items-center">
        <Link
          onClick={() => setActivePath("/")}
          href={"/"}>
          <li>
            <BsFillHouseDoorFill className={`text-lg flex-shrink-0 ${activePath == "/" ? "text-brand" : "text-base"}`} />
          </li>
        </Link>
        {
          categories.map((catName) => (
            <Link
              onClick={() => setActivePath(catName?.slug)}
              href={`/${catName?.slug}`}
              key={catName.slug}>
              <li className={` cursor-pointer flex-shrink-0 ${activePath == catName?.slug ? "text-brand" : "hover:text-brand"}`}>
                {lang === "Odia" ? catName?.odia : catName?.name}
              </li>
            </Link>
          )
          )
        }
      </ul>
    </div>
  )
}
