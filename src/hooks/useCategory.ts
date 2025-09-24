"use client"
import { Cat } from "@/components/DataTypes/Types";
import axios from "axios";
import { useEffect, useState } from "react";



export function useCategory() {
    const [category, setCategory] = useState<Cat[]>([])

    async function getCategories(): Promise<Cat[]> {
        try {
            const res = await axios.get("/api/category")
            const data: Cat[] = await res.data.data
            return data
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

