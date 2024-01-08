import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback
} from "react";

import axiosClient from "../api/axiosClient";

const productContext = createContext();

export const ProductContextProvider = ({ children }) => {

    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState(null);
    const [formData, setFormData] = useState({});
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isSuccessfullySaved,setIsSuccessfullySaved] = useState(false);

    const getChange = (e) => {
        setFormData(prevState => {
            const updatedState = { ...prevState, [e.target.name]: e.target.value }
            return updatedState
        })
    };

    const hasFormError = (form) => {
        const newErrors = [];

        const general_err = "Please, submit required data";
        const productType_err = "Please, provide the data of indicated type";

        const productTypesList = ['Furniture', 'DVD', 'Book'];
        const productType = document.getElementById('productType').value;
    
        const inputs = document.querySelectorAll("[data-input]");
    
        if([...inputs].some(input => !input.value.trim()))
        {
            newErrors.push(general_err);
        }

        if(productTypesList.includes(productType))
        {
            const specificTypeFields = [...document.querySelectorAll('.input-value')];
            const specificTypeData = specificTypeFields.map(input => input.value.trim());

            if(specificTypeData.some(value => !value))
            {
                newErrors.push(productType_err);
            }
        }

        setErrors(newErrors);
        setIsSuccessfullySaved(false);

        return newErrors.length === 0 ? false : true
    }

    const checkUniqueKey = (response) => {
        const unique_key_message = 'Duplicate SKU: The SKU already exists.';

        if(response.data.status === 0)
        {
            if(response.data && response.data.message.includes('Duplicate SKU')){
                setErrors([unique_key_message])
                setIsSuccessfullySaved(false);
                return false;
            }
            else 
            {
                setErrors([response.data.message]);
                setIsSuccessfullySaved(false);
                return false;
            }
        }
        else
        {
            setIsSuccessfullySaved(true);
            return true;
        }
    }

    const handleSave = async () => {
        const form = document.getElementById('product_form');

        try {
            const response = await axiosClient.post('/addproduct.php', formData);
            if(!hasFormError(form)){
                if(!checkUniqueKey(response)){
                    setIsSuccessfullySaved(false);
                    throw new Error("not unique sku");
                }else{
                    setIsSuccessfullySaved(true);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }


    const handleCancel = () => {
        setFormData({});
        setErrors(null);
        setIsSuccessfullySaved(false);
    }

    const handleSelectedList = (productId) => {
        setSelectedProducts((prev) => {
            const updatedSelection = prev.includes(productId)
                ? prev.filter(item => item !== productId)
                : [...prev, productId];
            return updatedSelection;
        });
        return selectedProducts;
    };

    const handleDeleteSelected = async () => {
        try {
            await axiosClient.post('/delete.php', { product_ids: selectedProducts });
            setSelectedProducts([]);

            await handleFetchProducts();

        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    const handleFetchProducts = useCallback(async () => {
        try {
            await axiosClient.get('/').then((res) => {
                setProducts(res.data);
            });

        } catch (error) {
            console.error("Couldn't fetch the data:", error);
        }
    }, [])

    useEffect(() => {
        handleFetchProducts();
    }, [handleFetchProducts])

    return (
        <productContext.Provider value={{
            formData,
            selectedProducts,
            products,
            errors,
            isSuccessfullySaved,
            setFormData,
            handleCancel,
            handleSave,
            getChange,
            handleDeleteSelected,
            handleSelectedList,
            handleFetchProducts,
            hasFormError,
            setIsSuccessfullySaved,
            setErrors,
        }}
        >
            {children}
        </productContext.Provider>
    )
};

export const useProductContext = () => useContext(productContext);
