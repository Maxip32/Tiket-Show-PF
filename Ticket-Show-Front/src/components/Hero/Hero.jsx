import { useState } from 'react'
import coldplay from '../../assets/image/coldplay.jpg'
import metallica from '../../assets/image/metallica.jpg'
import taylorswift from '../../assets/image/taylor-swift.jpg'

const Hero = () => {

  //- aca debe llegar el estado con las imágenes 
  const images = [
    coldplay,
    metallica,
    taylorswift
  ]
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0])

  const previous = () => {
    const condition = selectedIndex > 0;
    const nextIndex = condition ?  selectedIndex - 1 : images.length - 1;
    setSelectedImage(images[nextIndex])
    setSelectedIndex(nextIndex)
  }

  const next = () => {
    const condition = selectedIndex < images.length - 1;
    const nextIndex = condition ? selectedIndex + 1 : 0;
    setSelectedImage(images[nextIndex])
    setSelectedIndex(nextIndex)
  }

  return (
    <>
      <img src={selectedImage} alt="Imagen" />

      <button
        className="inline-block rounded-full border border-indigo-600 p-3 text-indigo-600 rotate-180 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
        href="/download"
        onClick={previous}
      >
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>

      <button
        className="inline-block rounded-full border border-indigo-600 p-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
        href="/download"
        onClick={next}
      >
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
      

    </>
  )
}


export default Hero