
import { useState, useEffect } from "react";

//import { sendMail } from "../../redux/actions";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserById } from "../../redux/actions";
import axios from "axios";

const CompraPaypal = () => {
 // const [compraConfirmada, setCompraConfirmada] = useState(false);
  // useEffect(() => {
  //     dispatch(sendMail({
  //       email: "prueba345@yopmail.com",
  //     }))
  // }, []);

  const [reviews, setReviews] = useState('')
  const dispatch = useDispatch();

  const {user }= useAuth();
  const userEmail = user && user.email ? user.email : "";
  console.log(userEmail, 'usuario email');

  const handlerInputChange= (e) => {
    e.preventDefault();
    setReviews(e.target.value)
  }

  const handleReviews = (e)=> {
    e.preventDefault();
    axios.put(`http://localhost:3001/comment/comment/${userEmail}`, reviews)
      .then(res=>alert('reviews successfully'))
      .catch(err=>alert('Please fill the reviews'));
      dispatch(getUserById())
      setReviews('')
  }
  
  return ( <div>
      <div className="flex flex-col items-center justify-center mt-16 max-w-lg mx-auto">
        <div className=" p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl text-primaryColor font-bold mb-4">Gracias por su compra</h2>
          <p className="text-DarkTextPurple mb-6">
            Hemos recibido su compra y estamos procesando su pedido. Le
            enviaremos una confirmación por correo electrónico en breve.
          </p>
          <label className="text-DarkTextPurple">
            Valoramos tu opinion sobre tu compra:
            <textarea 
              className="w-full border-2 border-secondaryColor rounded-lg p-2 focus:outline-none focus:border-ChryslerBlue" name="postContent" rows={4} cols={40} 
              value={reviews}
              onChange={handlerInputChange}
            />
          </label>
          <NavLink to="/">
            <button
              onClick={handleReviews}
              className="mt-6 block text-center bg-ChryslerBlue text-white py-2 px-4 rounded-md hover:bg-primaryColor transition duration-500"
            >
              Comenta y vuelve al inicio
            </button>
          </NavLink>
        </div>
      </div>
    </div> );
};

export default CompraPaypal;



  /* const validEmail = email ? email.email : null;
  const userEmail = email?.filter((reviews) => reviews.email === validEmail).join(''); */
  /* 
  const handleReviews = await fetch(`http://localhost:3001/comment/comment/:${userEmail}`, {
      // const response = await fetch(
      //   "https://tiket-show-pf-production.up.railway.app/create-order",
      //   {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Indicar que los datos se envían en formato JSON
          },
          //PARA QUE ME LLEGUE Y TOME EL PRECIO DE CADA EVENTO AL BACK
          body: JSON.stringify({
            value: reviews,
          }), // Enviar el precio en el cuerpo de la solicitud
        }
      ) */