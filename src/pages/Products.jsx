import { useEffect } from "react"
import {Product} from '../components'
import { useProductContext } from "../context/ProdoctContext"


const Products = () => {
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
                <div className="product_list">
                    {products?.map(product =>
                        <Product
                            key={product.SKU}
                            id={product.SKU}
                            Name={product.Name}
                            price={product.Price}
                            productType={product.Product_Type}
                            productValue={product.Product_Value}
                            onCheckboxChange={() => handleSelectedList(product.SKU)}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Products