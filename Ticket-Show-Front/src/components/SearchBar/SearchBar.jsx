import { useState } from "react";
//import { useDispatch } from "react-redux";
// importar la conexion en la action de redux cuando este lista


const SearchBar = () => {
   // const dispatch = useDispatch()
    const [name, setName] = useState('')

    const handleChange = (event) => {

        event.preventDefault()
        setName(event.target.value)
    }

    const handleButton = (event) => {
        event.preventDefault()
        if (name.trim() === "") {
            return
        }
 //       dispatch(searchbyname(name))
    }



    return (
        <div className="w-full max-w-xs m-auto">
            <input className="border-2 border-solid border-gray-500 rounded-lg" type='text' placeholder="Buscar" onChange={(event) => handleChange(event)} />
            <button className="border-2 border-solid border-gray-500 rounded-lg" type="submit" onClick={(event) => handleButton(event)} >Buscar </button>
        </div>
    )
}

export default SearchBar