import { useProductContext } from "../context/ProdoctContext"

const Product = ({ id, Name, price, productType, productValue, onCheckboxChange }) => {

    const {selectedProducts} = useProductContext();

    return (
        <div className="min-h-[180px] max-h-[200px] max-w-[300px] min-w-[220px] cursor-pointer border p-2 bg-white
            rounded-md mx-auto min-[470px]:mx-0 shadow-sm hover:bg-slate-200/15 transition-all ease-in-out duration-100"
        >
            <input
                type="checkbox"
                className="delete-checkbox cursor-pointer"
                onChange={() => onCheckboxChange(id)}
                checked={selectedProducts.includes(id)}
            />
            <div className="text-center font-medium">
                <p>{id}</p>
                <p>{Name}</p>
                <p>{price} $</p>
                {productType === "DVD" && <p>Size: {productValue} MB</p>}
                {productType === "Book" && <p>Weight: {productValue} KG</p>}
                {productType === "Furniture" && <p>Dimension: {productValue} HxWxL</p>}
            </div>
        </div>
    )
}

export default Product