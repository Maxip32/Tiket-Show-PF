/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventId } from "../../redux/actions";
import Loading from "../../components/Loading/Loading";
import { CartContext } from "../../components/Shoppingcart/shoppingCartContext";
import { useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  LiaCartPlusSolid,
  LiaCartArrowDownSolid,
} from "react-icons/lia";
import {
  MdMap,
  MdLocationOn,
  MdDateRange,
  MdWatch,
  MdMusicVideo,
} from "react-icons/md";
import { BsTicketPerforated, BsCurrencyDollar } from "react-icons/bs";

const Detail = ({ image, name, price }) => {
  const { user } = useAuth();
  const { id } = useParams();

  const { event } = useSelector((state) => state.detail);
  console.log(event, "el evento");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventId(id));
  }, [id, dispatch]);

  const [cart, setCart] = useContext(CartContext);

  const itemAdded = {
    id: event.id,
    name: event.name,
    quantity: 1,
    price: event.price,
    image: event.image,
    stock: event.quotas > 0 ? event.quotas - 1 : 0,
  };
  const isItemsFound = cart.find((item) => item.id === id);
  const existingCartItem = cart.find((item) => item.id === id);
  const stockFromCart = existingCartItem
    ? existingCartItem.stock
    : itemAdded.stock;

  // Agregar al carrito
  const addToCart = () => {
    setCart((currItems) => {
      if (isItemsFound) {
        return currItems.map((item) => {
          if (item.id === id) {
            const updatedQuantity = item.quantity + 1;
            const updateStock = Math.max(item.stock - 1, 0);
            console.log(updateStock, "soy el stock");
            return { ...item, quantity: updatedQuantity, stock: updateStock };
          } else {
            return item;
          }
        });
      } else {
        return [...currItems, itemAdded];
      }
    });
  };

  // remover al carrito
  const removeItem = (id) => {
    setCart((currItems) => {
      const existingCartItem = currItems.find((item) => item.id === id);

      if (existingCartItem) {
        const updatedCart = currItems.map((item) => {
          if (item.id === id) {
            /* const updatedQuantity = item.quantity - 1; */
            const updatedQuantity = Math.max(item.quantity - 1, 0);
            const updateStock = Math.min(item.stock + 1, event.quotas);
            return { ...item, quantity: updatedQuantity, stock: updateStock };
          }
          return item;
        });

        return updatedCart;
      }

      return currItems;
    });
  };

  const getQuantityById = (id) => {
    return cart.find((item) => item.id === id)?.quantity || 0;
  };

  const quantityPerItem = getQuantityById(id);

  

  return (
    <div className=" mt-15 flex flex-col mx-auto ">
      {event ? (
        <>
          <div className="bg-primaryColor/80 w-full shadow-lg p-4">
            <div className="flex items-start flex-col sm:flex-row">
              <div className="w-60 max-h-fit bg-primaryColor mb-4 sm:mb-0 sm:mr-4">
                <img src={event.image} alt="foto del artista" />
              </div>
              <div>
                <h2 className="text-5xl text-white font-bold">{event.name}</h2>
                <div className="text-3xl text-white font-bold">
                  <h2>{event.city}</h2>
                </div>
              </div>
            </div>
          </div>
          <div
            className=" mx-auto text-xl px-10 py-10 text-black  bg-white max-h-90 
          shadow-lg p-4 overflow-y-auto  "
          >
            <h2
              style={{
                whiteSpace: "pre-line",
                textAlign: "justify",
                width: "100rem",
              }}
            >
              {event.description}
            </h2>
          </div>
          <div className="mx-auto items-center bg-primaryColor border-white h-40 m-5 max-w-4xl min-w-0 flex justify-center">
            <div className=" flex- text-4xl  h-40 text-white font-bold p-5 first:bg-secondaryColor">
              <h2 className="mt-5">{/* {formattedMonth} */}</h2>
              <h2 className="items-center justify-center flex ">{/* {day} */}</h2>
            </div>
            <div className="pl-8 flex-1 text-3xl text-white">
              <h2>-{event.start}hs</h2>
              <h2 className="font-bold">{event.address}</h2>
            </div>
            <div className="pl-8 flex-1 text-3xl text-white">
              <h1>Precio ${event.price}</h1>
            </div>
            <div className="pl-8 flex-1 text-3xl text-white">
            
                    <dt className="inline">Entradas disponibles </dt>
                    <dd className="inline">{stockFromCart}</dd>
                    </div>
          </div>
        <div className="flex items-center gap-2 h-2/4">
        {user && (
          <>
            {quantityPerItem > 0 && <div>Total: {quantityPerItem}</div>}
            {quantityPerItem === 0 ? (
              <button onClick={() => addToCart()}>
                <LiaCartPlusSolid size={26} color="#ed4690" />
              </button>
            ) : (
              <button onClick={() => addToCart()}>
                <LiaCartPlusSolid size={26} color="#ed4690"/>
              </button>
            )}
            {/* <span>Total: </span> */}
            {quantityPerItem > 0 && (
              <button onClick={() => removeItem(id)}>
                <LiaCartArrowDownSolid size={26} color="#5522CC"/>
              </button>
            )}
          </>
        )}
      </div>
        </>
      ) : (
        <Loading/>
      )}
    </div>
  );
};

export default Detail;

