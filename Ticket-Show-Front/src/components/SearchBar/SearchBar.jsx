import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../redux/actions";
import Search from '../../assets/icons/Search.svg';


// eslint-disable-next-line react/prop-types
const SearchBar = ({returnToFirstPage}) => {
  const dispatch = useDispatch()

  const [name, setName] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    event.preventDefault();
    setName(value);

    if (value.trim() !== '') {
      dispatch(searchByName(value))
      .then(() => {returnToFirstPage()})
    }
  };

  /* const handleButton = (event) => {
    event.preventDefault();
    if (name.trim() === "") {
      // El campo de entrada está vacío, no se realiza la búsqueda pa que sepan atte KennyG
      return;
    }
    dispatch(searchByName(name))
    .then(() => {returnToFirstPage()})
  }; */

  return (
    <div className="mt-6 w-2/5 max-w-2xl mx-auto h-14 flex justify-evenly items-center rounded-full p-6 border border-secondaryColor" >
      <img src={Search} alt="search" />
      <input
        className="w-full bg-transparent m-4 placeholder-DarkTextPurple/50 border border-none outline-none"
        type="text"
        placeholder="Busca tu evento"
        value={name}
        onChange={(event) => handleChange(event)}
      />

      {/*  <button
          className=""
          type="submit"
          onClick={(event) => handleButton(event)}
        >
        </button> */}
    </div>
  );
};

export default SearchBar;


/* --------------------------------
  relative border-white rounded-s-2xl h-14 m-5 max-w-xl -mr-0.5 block w-[1px] min-w-0 flex-auto 
            rounded-l border border-solid border-neutral-300 bg-white 
            bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] 
            text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] 
            focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] 
            focus:outline-none white:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary


            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fill-rule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clip-rule="evenodd"
            />
          </svg>
FaSistrix
*/