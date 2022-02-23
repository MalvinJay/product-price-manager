import { useState, useEffect } from "react";

// Components
import 'h8k-components';
import ProductList from '../ProductList/productList';
import AddEditProduct from "../AddEditProduct/AddEditProduct";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { NotificationContainer } from 'react-notifications';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from "../../redux/Products/product.actions";

const Homepage = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products);
  
    const [loading, setloading] = useState(false);
    const [show, setshow] = useState(false);
    const [info, setinfo] = useState({});
    const [mode, setmode] = useState("add");
  
    async function fetchData() {
      setloading(true);
      const list = await fetch('http://www.mocky.io/v2/5c3e15e63500006e003e9795')
      const response = await list.json();
  
      dispatch(getProducts(response.products))
      .then(() => {
        setloading(false);
      })
    };
  
    useEffect(() => {    
      fetchData();
    }, []);
        
  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-content-between align-items-center resp-w mx-auto py-20">
          <h3 className="my-0">Product Manager</h3>
          <button
            className="mx-0"
            onClick={() => {
              setinfo({});
              setmode("add");
              setshow(true);
            }}
          >
            Add Product
          </button>
        </div>

        {loading ? (
          <div className="resp-w mx-auto mt-10">
            <Skeleton height={40} count={5} />
          </div>
        ) : (
          <ProductList
            products={products}
            setModal={setshow}
            setinfo={setinfo}
            setmode={setmode}
          />
        )}
      </div>

      {show && (
        <AddEditProduct
          mode={mode}
          modal={show}
          setModal={setshow}
          info={info}
          fetchData={fetchData}
        />
      )}

      <NotificationContainer />
    </>
  );
};

export default Homepage;