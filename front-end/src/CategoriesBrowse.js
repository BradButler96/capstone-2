import { React, useEffect, useRef } from "react";
import CryptoAPI from './CryptoAPI'
import SortingClass from './SortingClass'
import CategoryTable from './CategoryTable'
import './CategoriesBrowse.css'

const CategoriesBrowse = ({ categories, setCategories }) => {

    const sortBy = useRef()
    const sortDirection = useRef()

    const sortCats = (header) => {
        if (header !== sortBy.current) sortDirection.current = 'ascending'
        else {
            if (sortDirection.current === 'ascending') sortDirection.current = 'descending'
            else if (sortDirection.current === 'descending') sortDirection.current = ''
            else sortDirection.current = 'ascending'
        }
        setCategories(SortingClass.sortCats(categories, header, sortDirection.current))
        sortBy.current = header
    }

    useEffect(() => {
        const getCategories = async () => {
            if (categories) setCategories(SortingClass.sortCats(categories, 'market_cap', sortDirection.current))
            else {
                const res = await CryptoAPI.getCats()
                setCategories(SortingClass.sortCats(res.categories.data, 'market_cap', sortDirection.current))
                return res.categories.status.error_code
            }
        }
        getCategories()
    }, [])

    return (
        <div className='mx-auto col-lg-10 col-xs-12 col-sm-12'>
            <div className='text-start border-bottom display-4 my-4'>
                Categories
            </div>
            <CategoryTable
                categories={categories} 
                sortBy={sortBy.current} 
                sortDirection={sortDirection.current} 
                sortCats={sortCats} 
            />
        </div>
    )
}

export default CategoriesBrowse