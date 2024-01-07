import { BiSolidError } from "react-icons/bi";
import { useProductContext } from "../context/ProdoctContext";


const DisplayError = () => {

    const {errors} = useProductContext();

    return (
        <div className="max-w-[700px] mx-auto mb-8">
        {errors?.map((err, i) => (
            <p className="bg-[#d32f2f] text-white font-medium px-2 py-3 my-1 rounded flex items-center gap-2" key={i}>
                <BiSolidError/>
                <span>
                    {err}
                </span>
            </p>
        ))}
    </div>
    )
}

export default DisplayError