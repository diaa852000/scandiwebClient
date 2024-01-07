import { Link } from "react-router-dom"
import { useProductContext } from "../context/ProdoctContext"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {

    const isAddProductPage = location.pathname === "/addproduct";

    const {
        handleSave,
        handleCancel,
        handleDeleteSelected,
        selectedProducts,
        hasFormError,
        errors,
        isSuccessfullySaved
    } = useProductContext();

    const navigateTo = useNavigate();

    
    useEffect(() => {
        console.log(isSuccessfullySaved)
        console.log(errors)
        // console.log(Array.isArray(errors))
        // console.log(errors?.length)
    },[errors, isSuccessfullySaved])

    const onSave = async () => {
        try {
            // const form = document.getElementById('product_form');

            await handleSave();
            
            // console.log('out if')
            // console.log("errors inside function out if", errors)
            if (isSuccessfullySaved) {
                navigateTo('/')
                // console.log('first')
            }
        } catch (error) {
            console.error("error product not added", error)
        }
    }

    const onCancel = () => {
        handleCancel();
        navigateTo('/')
    }

    const onDelete = async () => {
        try {
            if (selectedProducts.length > 0) {
                await handleDeleteSelected();

            } else {
                console.warn('No products selected for deletion.');
            }
        } catch (error) {
            console.error('Failed to delete selected products:', error);
        }
    };

    return (
        <div className="px-1 py-5 md:py-2 md:px-12 border-b flex justify-between items-center bg-white">
            <Link
                to={'/'}
                className="capitalize md:py-2 font-semibold text-xl md:text-2xl cursor-pointer"
            >
                product list
            </Link>

            <div className="flex items-center justify-center gap-3">
                {isAddProductPage ? (
                    <>
                        <button
                            type="submit"
                            onClick={onSave}
                            className="border-2 py-1 px-2 rounded-md bg-indigo-500 text-white hover:text-indigo-600 hover:bg-white border-indigo-500 
                            text-sm font-medium uppercase shadow-sm transition-all ease-in-out duration-300"
                        >
                            <span>save</span>
                        </button>
                        <button
                            onClick={onCancel}
                            type="submit"
                            id="delete-product-btn"
                            className="border-2 py-1 px-3 rounded-md font-medium uppercase shadow-sm transition-all ease-in-out duration-250 
                            bg-slate-200 text-black/60 text-sm hover:bg-slate-300 hover:border-slate-300"
                        >
                            <span>cancel</span>
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to={"/addproduct"}
                            className="border-2 py-1 px-2 rounded-md bg-indigo-500 text-white hover:text-indigo-600 hover:bg-white border-indigo-500 
                            text-sm font-medium uppercase shadow-sm transition-all ease-in-out duration-300"
                        >
                            <span>add</span>
                        </Link>
                        <button
                            onClick={onDelete}
                            type="submit"
                            id="delete-product-btn"
                            className="border-2 py-1 px-3 rounded-md font-medium uppercase shadow-sm transition-all ease-in-out duration-250 
                            bg-slate-200 text-black/60 text-sm hover:bg-slate-300 hover:border-slate-300"
                        >
                            <span>mass delete</span>
                        </button>
                    </>
                )
                }
            </div>
        </div>
    )
}

export default Navbar