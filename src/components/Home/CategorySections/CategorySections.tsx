import { useCategory } from "@/hooks/useCategory"
import CategoryCardSection from "./components/CategoryCardSection";
import { useEffect, useState } from "react";

export default function CategorySections() {
    const [categoryCount, setCategoryCount] = useState(1)
    const categories = useCategory()

    useEffect(()=>{
        const hanleScroll = ()=>{
            const reachBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10
            if(reachBottom){
                setCategoryCount((prev)=>prev < categories.length ? prev + 1 : prev)
            }
        }

        window.addEventListener("scroll", hanleScroll)
        return ()=> window.removeEventListener("scroll", hanleScroll)
    },[categories])

    return (
        <div className="mt-8 ">
            {
               categories?.slice(0,categoryCount).map((category, i) => {
                    return (
                        <CategoryCardSection
                            category={category}
                            key={i} />
                    )
                })
            }


        </div>
    )
}