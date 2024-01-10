import { useEffect } from "react"
import {Product} from '../components'
import { useProductContext } from "../context/ProdoctContext"


const ProductList = () => {
    const { 
        handleSelectedList, 
        products, 
        handleFetchProducts 
    } = useProductContext();

    useEffect(() => {
        handleFetchProducts();
    }, [handleFetchProducts])

    return (    
        <div className="flex-grow">
            <div className="md:px-12 my-5">
                <div className="product_list ">
                    {Array.isArray(products) && products?.map(product =>
                        <Product
                            key={product.SKU}
                            id={product.SKU}
                            Name={product.Name}
                            price={product.Price}
                            productType={product.Product_Type}
                            productDetails={product.Product_Details}
                            onCheckboxChange={() => handleSelectedList(product.SKU)}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductList