import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
export default function MyShopping() {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    // Obtener las compras almacenadas desde el localStorage
    const userId = user ? user.uid : null;
    const savedPurchases = JSON.parse(localStorage.getItem("userPurchases")) || [];
// Filtrar las compras del usuario actual basado en su ID
const userPurchases = savedPurchases.filter((purchase) => purchase.userId === userId);
    // Filtrar las compras exitosas (aquellas que no tienen el mensaje de cancelación)
    const successfulPurchases = savedPurchases.filter((purchase) => !purchase.message);

    // Actualizar el estado con las compras exitosas
   // Actualizar el estado con las compras del usuario actual
   setPurchases(userPurchases);
   console.log("userPurchases:", userPurchases);
 }, [user]);

  return (
    <div className="w-full max-w-9xl mx-auto flex flex-wrap justify-center" >
      <h2 >Mis Compras</h2>
    <div className="  p-10 m-6 flex flex-wrap justify-center">
      
      {purchases.length > 0 ? (
        purchases.map((purchase) => (
          <div  className="bg-white w-100 h-60 m-4 border shadow-md rounded-2xl flex flex-col" key={purchase.id}>
            
            <p className="text-sm">Fecha de compra: </p>
            <p className="text-sm">{purchase.date}</p>
            <p className="text-sm">Cantidad de boletos:</p>
            <p className="text-sm"> {purchase.quantity}</p>
            <p className="text-sm">Monto total de compras relizadas: </p>
            <p className="text-sm"> {purchase.total}</p>
            <h1 className="text-sm">Nombre de Evento: </h1>
            <h1 className="text-sm">{purchase.name}</h1>
            {/* Aquí puedes mostrar otros detalles relevantes de la compra */}
          </div>
        ))
      ) : (
        <p>No se han realizado compras aún.</p>
      )}
    </div>
    </div>
  );
      }