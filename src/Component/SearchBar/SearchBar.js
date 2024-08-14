import debounce from 'lodash.debounce';
import React, { useEffect, useMemo, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [searchItem, setSearchItem] = useState('');
    const [debounceSearch, setDebounceSearch] = useState('');
    let searchData = useSelector(state => state.admin_products.AllProducts);
    const navigate = useNavigate();

    const debouncedSetSearchItem = useMemo(
        () =>
            debounce((value) => {
                setDebounceSearch(value);
            }, 300), 
        []
    );

    const handleChange = (e) => {
        const { value } = e.target;
        setSearchItem(value);
        debouncedSetSearchItem(value);
    };

    useEffect(() => {
        return () => {
            debouncedSetSearchItem.cancel();
        };
    }, [debouncedSetSearchItem]);

    const filterData = searchData
        .filter((item) => item.category.toLowerCase().includes(debounceSearch))
        .slice(0, 8);

    return (
        <div className="relative w-full max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                type="text"
                value={searchItem}
                onChange={handleChange}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:outline-none"
            />
            {/* Render search results dropdown */}
            {debounceSearch && filterData.length > 0 && (
                <div className="absolute bg-white w-full shadow-md rounded-lg mt-2">
                    {filterData.map((item) => (
                        <div
                            key={item.id}
                            className="p-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => navigate(`/productdetail/${item.id}`)}
                        >
                            <div className="flex items-center gap-2">
                                <img className="w-10" src={item.productImageUrl} alt={item.title} />
                                <strong>{item.title}</strong>
                                <p>{item.description}</p>                                
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
