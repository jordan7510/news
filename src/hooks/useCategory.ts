"use client"
import { Cat } from "@/utils/Types";
import { useEffect, useState } from "react";

export function useCategory() {
    const [category, setCategory] = useState<Cat[]>([])

    async function getCategories(): Promise<Cat[]> {
        try {
            const res = await fetch("/api/category")
            const data = await res.json();
            return data?.data
        } catch (error) {
            console.error("error getting category", error)
            return []
        }
    }

    useEffect(() => {
        const fetchedCategory = async () => {
            try {
                const fetchedCategory = await getCategories();
                setCategory(fetchedCategory);
            } catch (error) {
                console.error("error fetching category", error)
            }
        }
        fetchedCategory()
    },[])

    return category
}

