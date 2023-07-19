import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Views/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Detail from "./Views/Detail/Detail";
import Landing from "./Views/Landing/Landing";
import Home from "./Views/Home/Home";

const mockCards = [
  {
    id: "01",
    artistName: "Shakira",
    artisImage:
      "https://img.freepik.com/foto-gratis/retrato-cantante-raza-caucasica-aislado-pared-verde-luz-neon-modelo-mujer-hermosa-ropa-negra-microfono_155003-39188.jpg?w=740&t=st=1689780143~exp=1689780743~hmac=715d48182faa80452341bf7e60c8f2a32bdd1535da942ec5a8ac2d63be25633b",
    eventDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    eventName: "Shakira conciert",
    eventDate: "2022-12-17",
    eventImage:
      "https://www.elheraldodesaltillo.mx/wp-content/uploads/2021/10/coldplay.jpeg",
    genre: "Pop",
    price: "3500",
    start: "05:40",
    end: "22:48",
    eventLocation: "54244 Gottlieb Orchard",
    locationName: "teatro mateo boss",
    eventCity: "Port Destiny",
    locationPhone: "(211) 561-4149 x43945",
    locationEmail: "Erick36@gmail.com",
  },
  {
    id: "02",
    artistName: "WOS",
    artisImage:
      "https://i0.wp.com/elplanetaurbano.com/wp-content/uploads/2023/06/0.-apertura-web-Tapa-WOS.jpg?resize=1250%2C781&ssl=1",
    eventDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    eventName: "Oscuro Extasis Tour",
    eventDate: "2022-11-17",
    eventImage:
      "https://www.elheraldodesaltillo.mx/wp-content/uploads/2021/10/coldplay.jpeg",
    genre: "Rock, Trap",
    price: "3500",
    start: "06:30",
    end: "21:50",
    eventLocation: "02006 Marquardt Gardens",
    locationName: "teatro mateo boss",
    eventCity: "Buenos Aires",
    locationPhone: "(557) 896-1538",
    locationEmail: "Anissa.Raynor72@hotmail.com",
  },
  {
    id: "03",
    artistName: "Bob Marley",
    artisImage:
      "https://akamai.sscdn.co/tb/cifra-blog/es/wp-content/uploads/2023/03/44306d2-bob-marley.webp",
    eventDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    eventName: "el fumeta tour",
    eventDate: "2022-10-12",
    eventImage:
      "https://www.elheraldodesaltillo.mx/wp-content/uploads/2021/10/coldplay.jpeg",
    genre: "reggae",
    price: "4500",
    start: "10:30",
    end: "12:50",
    eventLocation: "123 Marquardt Gardens",
    locationName: "teatro mateo boss",
    eventCity: "Barranquilla",
    locationPhone: "(557) 987-2138",
    locationEmail: "otraPrueba@hotmail.com",
  },
  {
    id: "04",
    artistName: "Cazu",
    artisImage:
      "https://imgs.elpais.com.uy/dims4/default/f4814ef/2147483647/strip/true/crop/1489x1024+29+0/resize/1440x990!/quality/90/?url=https%3A%2F%2Fel-pais-uruguay-production-web.s3.amazonaws.com%2Fbrightspot%2Fuploads%2F2019%2F11%2F29%2F5de16e85f3654.jpeg",
    eventDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    eventName: "Nena Mala Tour",
    eventDate: "2022-10-10",
    eventImage:
      "https://www.elheraldodesaltillo.mx/wp-content/uploads/2021/10/coldplay.jpeg",
    genre: "Trap,Pop",
    price: "5500",
    start: "22:30",
    end: "00:00",
    eventLocation: "257 Buenos Aires",
    locationName: "Teatro Luna Park",
    eventCity: "Rosario",
    locationPhone: "(557) 987-2138",
    locationEmail: "teamokazu@hotmail.com",
  },
  {
    id: "05",
    artistName: "Nene Malo",
    artisImage:
      "https://akamai.sscdn.co/tb/cifra-blog/es/wp-content/uploads/2023/03/44306d2-bob-marley.webp",
    eventDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    eventName: "El Perreo Tour",
    eventDate: "2022-09-07",
    eventImage:
      "https://www.elheraldodesaltillo.mx/wp-content/uploads/2021/10/coldplay.jpeg",
    genre: "Reggaeton",
    price: "1500",
    start: "20:30",
    end: "222:50",
    eventLocation: "4387 Librita",
    locationName: "Teatro de las Artes",
    eventCity: "Ciudad Fritos",
    locationPhone: "(24) 587-2138",
    locationEmail: "megustaelperreo@hotmail.com",
  },
  {
    id: "06",
    artistName: "La Konga",
    artisImage:
      "https://media.a24.com/p/c36046b164a49d9b4096c34dfcfd0e1c/adjuntos/296/imagenes/009/089/0009089048/1200x675/smart/la-konga.png",
    eventDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    eventName: "El Tinto Vinito",
    eventDate: "2022-08-21",
    eventImage:
      "https://www.elheraldodesaltillo.mx/wp-content/uploads/2021/10/coldplay.jpeg",
    genre: "Cuarteto, Cumbia,",
    price: "2500",
    start: "21:30",
    end: "23:50",
    eventLocation: "471 Calle Falsa",
    locationName: "Teatro de los Cuarteteros",
    eventCity: "Cordoba",
    locationPhone: "(011) 654-8412",
    locationEmail: "megustaelcuarteto@hotmail.com",
  },
  {
    id: "07",
    artistName: "Culisueltas",
    artisImage:
      "https://tn.com.ar/resizer/ha6VJD6IIcugIrjJgfN9dELoQZc=/1440x0/smart/filters:format(webp)/cloudfront-us-east-1.images.arcpublishing.com/artear/2NVGS3CDUWUXM5OOEORYKIVU5I.jpg",
    eventDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    eventName: "El Culito Tour",
    eventDate: "2022-07-15",
    eventImage:
      "https://www.elheraldodesaltillo.mx/wp-content/uploads/2021/10/coldplay.jpeg",
    genre: "Cumbia, ",
    price: "1500",
    start: "16:30",
    end: "19:00",
    eventLocation: "2587 Moreno",
    locationName: "Teatro de los Turros",
    eventCity: "Cumbia City",
    locationPhone: "(23) 985-5641",
    locationEmail: "megustanlosturros@hotmail.com",
  },
  {
    id: "08",
    artistName: "Trueno",
    artisImage:
      "https://www.elciudadanoweb.com/wp-content/uploads/2022/05/con-el-flamante-estreno-d_866971-1280x853.jpg",
    eventDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    eventName: "El mas Rapper Tour",
    eventDate: "2022-02-20",
    eventImage:
      "https://www.elheraldodesaltillo.mx/wp-content/uploads/2021/10/coldplay.jpeg",
    genre: "Rap, Trap",
    price: "1500",
    start: "16:30",
    end: "19:00",
    eventLocation: "2587 Moreno",
    locationName: "Teatro de los Turros",
    eventCity: "Cumbia City",
    locationPhone: "(23) 985-5641",
    locationEmail: "megustanlosturros@hotmail.com",
  },
  {
    id: "09",
    artistName: "Sonata Artica",
    artisImage:
      "https://mariskalrock.com/wp-content/uploads/2014/03/int28.jpg",
    eventDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    eventName: "Angels fall First",
    eventDate: "2022-07-15",
    eventImage:
      "https://www.elheraldodesaltillo.mx/wp-content/uploads/2021/10/coldplay.jpeg",
    genre: "Heavy Metal, Rock, Hard Rock ",
    price: "1500",
    start: "17:30",
    end: "19:00",
    eventLocation: "2212 Moreno",
    locationName: "Teatro de los Metaleros",
    eventCity: "Indigo Ciry",
    locationPhone: "(243) 923-51369",
    locationEmail: "megustarlmetal@hotmail.com",
  },
  {
    id: "10",
    artistName: "Miranda",
    artisImage:
      "https://theobjective.com/wp-content/uploads/2017/11/miranda-nos-gusta-hacer-musica-para-el-cuerpo.jpg",
    eventDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    eventName: "Es mentira",
    eventDate: "2022-02-02",
    eventImage:
      "https://www.elheraldodesaltillo.mx/wp-content/uploads/2021/10/coldplay.jpeg",
    genre: "Indie, Pop, Alternativo ",
    price: "7500",
    start: "20:30",
    end: "23:00",
    eventLocation: "264 Tucuman",
    locationName: "Teatro de los Alternos",
    eventCity: "Caracas ",
    locationPhone: "(43) 32-5419",
    locationEmail: "megustamiamor@hotmail.com",
  },
  {
    id: "11",
    artistName: "Nightwhis",
    artisImage:
      "https://m.media-amazon.com/images/I/710DXHK4K9L._AC_SL1500_.jpg",
    eventDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    eventName: "El Faraon se va a Orion",
    eventDate: "2022-01-12",
    eventImage:
      "https://www.elheraldodesaltillo.mx/wp-content/uploads/2021/10/coldplay.jpeg",
    genre: "Hard Rock, Heavy Metal, Rock",
    price: "500",
    start: "10:30",
    end: "11:00",
    eventLocation: "757 Arriaga",
    locationName: "Teatro de los Cochinos",
    eventCity: "Pueblo Paleta",
    locationPhone: "(243) 365-1564",
    locationEmail: "megustalarola@hotmail.com",
  },

  {
    id: "12",
    artistName: "Javiera Mena",
    artisImage:
      "https://agenciapresentes.org/sitio/wp-content/uploads/2023/03/Javiera-Mena-x-Jesus-Leonardo-24722-e1678459780998-1002x501.jpeg",
    eventDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    eventName: "Acabar en la Playa",
    eventDate: "2022-01-12",
    eventImage:
      "https://www.elheraldodesaltillo.mx/wp-content/uploads/2021/10/coldplay.jpeg",
    genre: "Alternativo, Pop, Indie",
    price: "500",
    start: "22:30",
    end: "00:00",
    eventLocation: "757 Arriaga",
    locationName: "Teatro de los Alternos",
    eventCity: "Vice City",
    locationPhone: "(243) 365-1564",
    locationEmail: "megustaotraera@hotmail.com",
  },
];
function App() {
  return (
    <div className="App">
    {location.pathname !== "/" && <NavBar />}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path='/detail/:id' element={<Detail/>} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
