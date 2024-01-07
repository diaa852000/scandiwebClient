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

        const inputs = document.querySelectorAll("[data-input]")
        
        setErrors([]);

        if (Array.from(inputs).some(input => !input.value.trim())) {
            newErrors.push(general_err);
            // setErrors(prev => [...prev, general_err])
        }

        if (productTypesList.includes(productType)) {
            const specificTypeFields = Array.from(document.querySelectorAll('.input-value'));
            const specificTypeData = specificTypeFields.map(input => input.value.trim());

            if (specificTypeData.some(value => !value)) {
                newErrors.push(productType_err);
                // setErrors(prev => [...prev, productType_err])
            }
        }

        setErrors(newErrors);
        
        if(newErrors != null && newErrors?.Length > 0)
            setIsSuccessfullySaved(false)

        return isSuccessfullySaved;
    }

    const chechkUniqueKey = (response) => {
        if (response.data.status === 0) {
            setIsSuccessfullySaved(false);

            if (response.data && response.data.message.includes('Duplicate SKU')) {
                setErrors(prev => [...prev, ['Duplicate SKU: The SKU already exists.']]);
            }
            else 
            {
                setErrors([response.data.message]);
                return false;
            }
        }
        else
        {
            return true;
        }
    }

    const handleSave = async () => {
        try {
            const form = document.getElementById('product_form');

            if (!hasFormError(form)) {
                const response = await axiosClient.post('/addproduct.php', formData);

                if(!chechkUniqueKey(response))
                {
                    setIsSuccessfullySaved(false);
                    return;
                }
                else
                {
                    setFormData({});
                    setErrors(null);
                    setIsSuccessfullySaved(true);
                }
            }
            

        } catch (error) {
            console.error("Failed to add a new product", error);
            throw error;
        }
    };

    const handleCancel = () => {
        setFormData({});
        setErrors([]);
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
            setFormData,
            handleCancel,
            handleSave,
            getChange,
            handleDeleteSelected,
            handleSelectedList,
            handleFetchProducts,
            hasFormError,
            isSuccessfullySaved
        }}
        >
            {children}
        </productContext.Provider>
    )
};

export const useProductContext = () => useContext(productContext);
