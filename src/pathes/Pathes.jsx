import { Route, Routes } from "react-router-dom"
import { AddProduct, ProductList } from "../pages"

const Pathes = () => {
    return (
        <Routes>
            <Route path="/" element={<ProductList/>}/>
            <Route path="/addproduct" element={<AddProduct/>}/>
            <Route path="*" element={<h2>Not Found!!</h2>}/>
        </Routes>
    )
}

export default Pathes