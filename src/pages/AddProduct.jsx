import { useState } from "react";
import { DisplayError, Form } from "../components";
import { useProductContext } from "../context/ProdoctContext"

const AddProduct = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const { formData, getChange } = useProductContext();

    const onChange = (e) => {
        setSelectedValue(e.target.value);
        getChange(e);
    }


    return (
        <>
            <div className="my-5 md:m-10 p-2">
                
                <DisplayError/>
                
                <form id="product_form" className=" flex flex-col gap-1 justify-center md:max-w-[700px] mx-auto">
                    <div className="w-full flex flex-col sm:flex-row sm:items-center gap-1 p-1 md:p-2">
                        <label htmlFor="sku" className=" font-normal p-0.5 w-36">SKU</label>
                        <input
                            id="sku"
                            type="text"
                            name="SKU"
                            placeholder="enter product sku"
                            className="border w-full p-1.5 rounded"
                            onChange={getChange}
                            data-input
                        />
                    </div>

                    <div className="w-full flex flex-col sm:flex-row sm:items-center gap-1 p-1 md:p-2">
                        <label htmlFor="name" className=" font-normal p-0.5 w-36">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="Name"
                            placeholder="enter the product name"
                            className="border w-full p-1.5 rounded"
                            onChange={getChange}
                            data-input
                        />
                    </div>

                    <div className="w-full flex flex-col sm:flex-row sm:items-center gap-1 p-1 md:p-2">
                        <label htmlFor="price" className=" font-normal p-0.5 w-36">Price ($)</label>
                        <input
                            id="price"
                            type="number"
                            name="Price"
                            placeholder="enter product price"
                            className="border w-full p-1.5 rounded"
                            onChange={getChange}
                            data-input
                        />
                    </div>

                    <div className="w-full flex flex-col sm:flex-row sm:items-center gap-1 p-1 md:p-2">
                        <label
                            htmlFor="productType"
                            className="md:text-base rounded w-36"
                        >
                            Type Switcher
                        </label>
                        <select
                            name="Product_Type"
                            id="productType"
                            className="border w-full p-1.5 rounded cursor-pointer"
                            onChange={onChange}
                            value={selectedValue}
                            data-input
                        >
                            <option value="" disabled className="text-gray-500">Type Switcher</option>
                            <option id="DVD" value="DVD" name="Product_Type">DVD</option>
                            <option id="Furniture" value="Furniture" name="Product_Type">Furniture</option>
                            <option id="Book" value="Book" name="Product_Type">Book</option>
                        </select>
                    </div>
                    <div className="pb-2">
                        {formData.Product_Type === "DVD" && <Form type="dvd" />}
                        {formData.Product_Type === "Furniture" && <Form type="furniture" />}
                        {formData.Product_Type === "Book" && <Form type="book" />}
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddProduct