import { useEffect, useState } from "react";
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import loadsvg from "../../assets/images/tail-spin.svg";
import {NotificationContainer, NotificationManager} from 'react-notifications';
 
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct  } from "../../redux/Products/product.actions";

const AddEditProduct = ({
    mode="add",
    modal=false,
    setModal=()=>{},
    info={},
    fetchData=()=>{}
}) => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products);

    const [loading, setloading] = useState(false);
    const [name, setname]  = useState("");
    const [price, setprice]  = useState("");

    const handleOnSubmit = () => {
        setloading(true);

        let pricingData = {
            name: name
        };

        // check mode
        if (mode === "add") {
            // Append the prices array info to the product, setting the id, price and the date value accordingly
            let lastProductPrices = [];

            if (products.length > 0)
                lastProductPrices = products[products?.length - 1]?.prices;


            pricingData.id = products?.length > 0 ? parseInt(products[products?.length - 1]?.id + 1) : 1;
            pricingData.prices = [{
                id: lastProductPrices.length > 0 ? parseInt(lastProductPrices[lastProductPrices?.length - 1]?.id + 1) : 1,
                price: parseFloat(price),
                date: new Date().toISOString(),                
            }];

            console.log('New Product:', pricingData);

            // dispatch create product action
            dispatch(createProduct(pricingData))
            .then(() => {
                setModal(false);
                setloading(false);
                NotificationManager.success('Product added successfully');

            }, (err) => {
                setloading(false);
                console.log('Error: ', err);
            })
        } else { 
            console.log('Info:', info);
            pricingData.id = info.id;

            // Check if the update is adding a new price or just a name change
            if (info.prices.find(el => el.price === price)) {
                pricingData.prices = info.prices;
            } else {
                // update prices list and save in local state
                pricingData.prices = [
                    {
                        id: info?.prices[info?.prices?.length - 1].id + 1,
                        price: parseFloat(price),
                        date: new Date().toISOString(),
                    },
                    ...info.prices?.sort((a, b) => new Date(b.date) - new Date(a.date))
                ]
            }

            // dispatch update action to handle the local state management
            dispatch(updateProduct(pricingData))
            .then(() => {
                setModal(false);
                setloading(false);           
                NotificationManager.success('Product updated successfully');
            });
        }
    };

    useEffect(() => {
      if (info.name) {
          setname(info?.name);
        setprice(info?.prices[0]?.price);
      } else {
        setname("");
        setprice("");
      }
    }, [info]);
    
  return (
    <div>
        <PureModal
            header={<div style={{ fontSize: '1.2rem'}}>{mode === 'add' ? 'Add Product' : 'Edit Product'}</div>}
            footer={
                <div className="px-5 flex justify-content-between align-items-center">
                    <button className="outlined" onClick={() => setModal(false)}>Cancel</button>
                    <button onClick={handleOnSubmit}>
                        {loading ?
                            <img src={loadsvg} alt="" />
                        :
                            mode === 'add' ? 'Save' : 'Update'
                        }
                    </button>
                </div>
            }
            isOpen={modal}
            closeButton="X"
            closeButtonPosition="header"
            onClose={() => {
                setModal(false);
                return true;
            }}
        >
            <form className="">
                <input
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    type="text" 
                    className="white large outlined mb-10" 
                    placeholder="Name" 
                />
                {/* <section className="layout-row align-items-center justify-content-center mb-20"></section> */}
                <input
                    value={price}
                    onChange={(e) => setprice(e.target.value)}
                    type="number"
                    className="white large outlined mt-10"
                    placeholder="Price"
                />
                {/* <section className="layout-row align-items-center justify-content-center"></section> */}
            </form>
        </PureModal>

        <NotificationContainer />
    </div>
  )
};

export default AddEditProduct