import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../redux/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleButton = (event) => {
    event.preventDefault();
    if (name.trim() === "") {
      // El campo de entrada está vacío, no se realiza la búsqueda pa que sepan atte KennyG
      return;
    }
    dispatch(searchByName(name));
  };

  return (
    <div className="mb-5">
      <div className="relative mb-2 flex w-full flex-wrap items-stretch  justify-center">
        <input
          className="relative border-white rounded-s-2xl h-14 m-5 max-w-xl -mr-0.5 block w-[1px] min-w-0 flex-auto 
            rounded-l border border-solid border-neutral-300 bg-white 
            bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] 
            text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] 
            focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] 
            focus:outline-none white:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          aria-label="Buscar"
          aria-describedby="button-addon1"
          type="text"
          placeholder="Buscar"
          onChange={(event) => handleChange(event)}
        />

        <button
          className="relative h-14 mt-5 z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 
          text-xs font-medium uppercase leading-tight text-white shadow-md transition 
          duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg 
          focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0
           active:bg-primary-800 active:shadow-lg"
          type="submit"
          onClick={(event) => handleButton(event)}
          id="button-addon1"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
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
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
