import logo from '../../assets/logos/logoticketshow1.jpg'

const Loader = () => {

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
 
  return (
    <div  >
      <img src={logo} alt="logo" />
    </div>
  )
}

export default Loader;
