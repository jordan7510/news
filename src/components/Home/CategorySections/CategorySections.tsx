import { useCategory } from "@/hooks/useCategory"
import Image from "next/image";
import CategoryCardSection from "./components/CategoryCardSection";

export default function CategorySections() {
    const categories = useCategory()
    console.log("categories", categories);




    return (
        <div className="mt-8 ">
            {
                categories && categories.map((category, i) => {
                    return (
                       <CategoryCardSection
                       category={category}
                        key={i}/>
                    )
                })
            }


        </div>
    )
}