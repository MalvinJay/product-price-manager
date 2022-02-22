import React, { useState } from 'react';
import CofirmPopUp from "./CofirmPopUp";
import {NotificationContainer, NotificationManager} from 'react-notifications';

// Redux
import { useDispatch } from 'react-redux';
import { deleteProduct } from "../redux/Products/product.actions";

const ProductList = ({ 
    products=[],
    show,
    setModal=()=>{}, 
    setinfo=()=>{},
    setmode=()=>{} 
}) => {
    const dispatch = useDispatch();

    const [confirm, setconfirm] = useState(false);
    const [item, setitem] = useState();
    const [current, setcurrent] = useState(null);

    const handleEdit = (product) => {
        setinfo(product);
        setmode("update");
        setModal(true);
    };

    const showPopUp = (product) => {
        setconfirm(true);
        setitem(product);
    };

    const handleDelete = () => {
        console.log('Item:', item);

        dispatch(deleteProduct(item?.id))
        .then(() => {
            setconfirm(false);
            NotificationManager.success('Product deleted');
        });
    };

    return (
        <div className="card w-75 mx-auto mt-10">
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Latest Price</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {products?.length > 0 ?
                        products?.map((product, index) => (
                            <tr data-testid="article" key={product.id}>
                                <td data-testid="product-id">{product.id}</td>
                                <td data-testid="product-name">{product.name}</td>
                                <td data-testid="product-prices" className="py-10">
                                        {product?.prices?.length > 0 &&
                                            <div className="flex align-items-center">
                                                {product?.prices?.filter((_, _index_) => _index_ === 0)?.map((_el, _index) => (
                                                    <div className="flex align-items-center justify-content-start mr-8" key={_el.id}>
                                                        <span className="rounded-lg bg-priamry white-color px-8 py-5">GHS {_el?.price}</span>
                                                    </div>
                                                ))}

                                                {product.prices.length > 0 &&
                                                    <>
                                                        <div className="ml-5 blue-color underline cursor-pointer"
                                                            onClick={() => {
                                                                if (current !== null) setcurrent(null)
                                                                else setcurrent(index);
                                                            }}
                                                        >
                                                            {current === index ? 'Hide' : 'View'} Price History
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        }

                                        {product.prices.length > 0 && current === index &&
                                            <div className="pt-5 pb-10">
                                                {product.prices?.sort((a, b) => new Date(b.date)  - new Date(a.date))?.map((_item_) => (
                                                    <div>
                                                        <div className="w-100 flex">
                                                            <div>Price: </div>
                                                            <div className="pl-5"><b>GHS {_item_.price}</b></div>
                                                        </div>
                                                        <div className="w-100 flex">
                                                            <div>Date Added: </div>
                                                            <div className="pl-5"><b>{new Date(`${_item_.date}`).toDateString()}</b></div>
                                                        </div>
                                                        <hr />
                                                    </div>
                                                ))}
                                            </div>
                                        }   
                                    <div className=""> 
                                    {/* flex justify-conetent-even align-items-center */}
                                    </div>
                                </td>
                                <td width={100}>
                                    <button className="small primary icon-only" onClick={() => handleEdit(product)}>
                                        <i className="material-icons">mode_edit</i>
                                    </button>
                                    <button className="small primary icon-only mx-0" onClick={() => showPopUp(product)}>
                                        <i className="material-icons">delete</i>
                                    </button>                       
                                </td>
                            </tr>
                        ))
                    :
                        <tr>
                            <td></td>
                            <td style={{height: '5rem'}}>
                                <div className="flex justify-content-center">No Products</div>
                            </td>
                            <td></td>
                        </tr>
                    }
                </tbody>
            </table>

            {confirm && 
                <CofirmPopUp 
                    modal={confirm} 
                    setModal={setconfirm} 
                    handleDelete={handleDelete}
                />
            }

            <NotificationContainer/>
        </div>
    )
};

export default ProductList;