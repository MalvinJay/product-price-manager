import { useState, useEffect } from "react";
import './App.css';

// Components
import 'h8k-components';
import ProductList from './components/productList';
import AddEditProduct from "./components/AddEditProduct";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {NotificationContainer} from 'react-notifications';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from "./redux/Products/product.actions";

function App() {
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
  }  

  useEffect(() => {    
    fetchData();
  }, []);
  
  return (
    <div className="App">
      <nav className="app-header">
        <div className="layout-row align-items-center justify-content-center">
          <h8k-logo className="hydrated">
          </h8k-logo>
          <h4 id="app-title" className="white-color ml-16 my-0">MPharma FrontEnd Challenge</h4>
        </div>
      </nav>   

      <div className="container mx-auto">
        <div className="flex justify-content-end w-75 mx-auto py-20">
          <button className="mx-0" onClick={() => {
            setinfo({});
            setmode("add");
            setshow(true);
          }}
          >
            Add Product
          </button>
        </div>

        {loading ?
          <div className="w-75 mx-auto mt-10">
            <Skeleton height={40} count={5} />
          </div>
        :
          <ProductList 
            products={products} 
            setModal={setshow} 
            setinfo={setinfo}
            setmode={setmode}
          />
        }
      </div>

      {show && 
        <AddEditProduct 
          mode={mode}
          modal={show} 
          setModal={setshow} 
          info={info}
          fetchData={fetchData}
        /> 
      }

      <NotificationContainer />
    </div>
  );
}

export default App;
