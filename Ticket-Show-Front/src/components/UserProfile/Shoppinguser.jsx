import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function MyShopping() {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    // Obtener las compras almacenadas desde el localStorage
    const userId = user ? user.uid : null;
    const savedPurchases = JSON.parse(localStorage.getItem("userPurchases")) || [];
    // Filtrar las compras del usuario actual basado en su ID
    const userPurchases = savedPurchases.filter((purchase) => purchase.userId === userId);

    // Ordenar las compras por fecha (la más reciente primero)
    userPurchases.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Actualizar el estado con las compras del usuario actual
    setPurchases(userPurchases);
    console.log("userPurchases:", userPurchases);
  }, [user]);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(purchases.length / itemsPerPage);

  // Filtrar las compras que se mostrarán en la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visiblePurchases = purchases.slice(startIndex, endIndex);

  // Función para manejar el cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full max-w-9xl mx-auto flex flex-wrap justify-center">
      <h2>Mis Compras</h2>
      <div className="p-10 m-6 flex flex-wrap justify-center">
        {visiblePurchases.length > 0 ? (

          visiblePurchases?.map((purchase) => (

            <div className="bg-white w-100 h-60 m-4 border shadow-md rounded-2xl flex flex-col" key={purchase.id}>
              <p className="text-sm">Fecha de compra: {new Date(purchase.date).toLocaleDateString()}</p>
              <p className="text-sm">Cantidad de boletos: {purchase.quantity}</p>
              <p className="text-sm">Monto total de compras realizadas: {purchase.total}</p>

              <h1 className="text-sm">{purchase.name}</h1>
              <img src={purchase.image} to="" className="w-40"/>

              {/* Aquí puedes mostrar otros detalles relevantes de la compra */}
            </div>
          ))
        ) : (
          <p>No se han realizado compras aún.</p>
        )}
      </div>

      <div className="flex justify-center">
        <p>Página {currentPage} de {totalPages}</p>
      </div>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 bg-primaryColor text-white px-4 py-2 rounded-lg"
        >
          Prev
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-primaryColor text-white px-4 py-2 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}

