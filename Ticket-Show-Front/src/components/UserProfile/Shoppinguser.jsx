import { useEffect, useState } from "react";

export default function MyShopping() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    // Obtener las compras almacenadas desde el localStorage
    const savedPurchases = JSON.parse(localStorage.getItem("userPurchases")) || [];

    // Filtrar las compras exitosas (aquellas que no tienen el mensaje de cancelación)
    const successfulPurchases = savedPurchases.filter((purchase) => !purchase.message);

    // Actualizar el estado con las compras exitosas
    setPurchases(successfulPurchases);
    console.log("savedPurchases:", savedPurchases);
console.log("successfulPurchases:", successfulPurchases);
  }, []);

  return (
    <div>
      <h2>Mis Compras</h2>
      {purchases.length > 0 ? (
        purchases.map((purchase) => (
          <div key={purchase.id}>
            <p>Fecha de compra: {purchase.date}</p>
            <p>Cantidad de boletos: {purchase.quantity}</p>
            <p>Monto total de compras relizadas: {purchase.total}</p>
            <h1>Nombre de Evento: {purchase.name}</h1>
            {/* Aquí puedes mostrar otros detalles relevantes de la compra */}
          </div>
        ))
      ) : (
        <p>No se han realizado compras aún.</p>
      )}
    </div>
  );
}