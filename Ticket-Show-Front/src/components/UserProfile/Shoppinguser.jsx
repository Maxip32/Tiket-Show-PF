import { useEffect, useState } from "react";

export default function MyShopping() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    // Aquí puedes obtener los detalles de la compra desde el local storage o la base de datos
    const savedPurchases = JSON.parse(localStorage.getItem("userPurchases")) || [];
    setPurchases(savedPurchases);
  }, []);

  return (
    <div>
      <h2>Mis Compras</h2>
      {purchases.length > 0 ? (
        purchases.map((purchase) => (
          <div key={purchase.id}>
            <p>Fecha de compra: {purchase.date}</p>
            <p>Total: {purchase.total}</p>
            {/* Aquí puedes mostrar otros detalles relevantes de la compra */}
          </div>
        ))
      ) : (
        <p>No se han realizado compras aún.</p>
      )}
    </div>
  );
}