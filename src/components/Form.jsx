import { useProductContext } from "../context/ProdoctContext"
import { BsInfoCircleFill } from "react-icons/bs";

const Form = ({ type }) => {

    switch (type) {
        case "dvd":
            return <DVDForm />

        case "book":
            return <BookForm />

        case "furniture":
            return <FurnitureForm />

        default:
            return <DVDForm />;
    }
}



export const DVDForm = () => {
    const { getChange } = useProductContext();

    return (
        <>
            <div className="w-full md:w-auto flex flex-col sm:flex-row sm:items-center gap-1 p-1 md:p-2">
                <label htmlFor="Size" className="md:text-xl p-0.5 w-36 capitalize">
                    size (MB)
                </label>
                <input
                    id="size"
                    name="Size"
                    type="number"
                    placeholder="enter the product name"
                    className="border shadow-sm w-full p-1.5 input-value rounded "
                    onChange={getChange}
                    data-input
                />

            </div>
            <p className="note">
                <BsInfoCircleFill />
                <span>
                    Please provide size in MB
                </span>
            </p>
        </>
    )
}

export const BookForm = () => {
    const { getChange } = useProductContext();

    return (
        <>
            <div className="w-full md:w-auto flex flex-col sm:flex-row sm:items-center gap-1 p-1 md:p-2">
                <label htmlFor="Weight" className="md:text-xl p-0.5 w-36 capitalize">
                    Weight (KG)
                </label>
                <input
                    id="weight"
                    name="Weight"
                    type="number"
                    placeholder="enter the product name"
                    className="border shadow-sm w-full p-1.5 input-value rounded"
                    onChange={getChange}
                    data-input
                />
            </div>
            <p className="note">
                <BsInfoCircleFill />
                <span>
                    Please provide weight in KG
                </span>
            </p>
        </>
    )
}

export const FurnitureForm = () => {
    const { getChange } = useProductContext();

    return (
        <>
            <div className="w-full md:w-auto flex flex-col sm:flex-row sm:items-center gap-1 p-1 md:p-2">
                <label htmlFor="Height" className="md:text-xl p-0.5 w-36 capitalize">
                    Height (CM)
                </label>
                <input
                    id="height"
                    name="Height"
                    type="number"
                    placeholder="enter the product name"
                    className="border shadow-sm w-full p-1.5 input-value rounded"
                    onChange={getChange}
                    data-input
                />
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row sm:items-center gap-1 p-1 md:p-2">
                <label htmlFor="Width" className="md:text-xl p-0.5 w-36 capitalize">
                    Width (CM)
                </label>
                <input
                    id="width"
                    name="Width"
                    type="number"
                    placeholder="enter the product name"
                    className="border shadow-sm w-full p-1.5 input-value rounded"
                    onChange={getChange}
                    data-input
                />
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row sm:items-center gap-1 p-1 md:p-2">
                <label htmlFor="Length" className="md:text-xl p-0.5 w-36 capitalize">
                    Length (CM)
                </label>
                <input
                    id="length"
                    name="Length"
                    type="number"
                    placeholder="enter the product name"
                    className="border shadow-sm w-full p-1.5 input-value rounded"
                    onChange={getChange}
                    data-input
                />
            </div>
            <p className="note">
                <BsInfoCircleFill />
                <span>
                    Please provide dimensions in HxWxL format
                </span>
            </p>
        </>
    )
}

export default Form;

