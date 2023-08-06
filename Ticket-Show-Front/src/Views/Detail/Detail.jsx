/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventId } from "../../redux/actions";
import Loading from "../../components/Loading/Loading";
import { CartContext } from "../../components/Shoppingcart/shoppingCartContext";
import { useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import { LiaCartPlusSolid, LiaCartArrowDownSolid, LiaTicketAltSolid } from "react-icons/lia";
const Detail = ({ image, name,price }) => {
  /* const monthsMap = {
    "01": "ENE",
    "02": "FEB",
    "03": "MAR",
    "04": "ABR",
    "05": "MAY",
    "06": "JUN",
    "07": "JUL",
    "08": "AGO",
    "09": "SEP",
    "10": "OCT",
    "11": "NOV",
    "12": "DIC",
  }; */

  const { user } = useAuth();
  const { id } = useParams();

  const { event } = useSelector((state) => state.detail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventId(id));
  }, [id, dispatch]);

  const [cart, setCart] = useContext(CartContext);

  const addToCart = () => {
    setCart((currItems) => {
      const isItemsFound = currItems.find((item) => item.id === id);

      if (isItemsFound) {
        return currItems.map((item) => {
          if (item.id === id) {
            
            const updatedQuantity = item.quantity + 1;
          const updateStock = item.stock - 1; // Disminuir el stock
            return { ...item, quantity: updatedQuantity, stock: updateStock };
          } else {
            return item;
          }
        });
      } else {
        const itemAdded = {
          id: event.id,
          name: event.name,
          quantity: 1,
          price: event.price,
          image: event.image,
          stock: event.quotas,
        }
        return [...currItems, itemAdded];
      }
    });
  };

  const removeItem = (id) => {
    setCart((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const getQuantityById = () => {
    return cart.find((item) => item.id === id)?.quantity || 0;
  };

  const quantityPerItem = getQuantityById(id);
  /* const [ year month, day] = event.date.split("-"); // Dividimos la fecha en año, mes y día
  const formattedMonth = monthsMap[month]; */
  

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
                    <dd className="inline">{event.quotas}</dd>
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
