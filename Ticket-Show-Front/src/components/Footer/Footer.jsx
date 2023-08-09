
const Footer = () => {
  return (
    <footer className="relative bg-blueGray-500 pt-8 pb-6 max-w-6xl md:w-full  mx-auto">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap text-left lg:text-left">
        <div className="w-full lg:w-6/12 px-4 inline-block">
          <h4 className="text-3xl font-semibold text-blueGray-700">¡Sigamos en contacto!</h4>
          <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
            Encuentranos en  estas plataformas, respondemos en el día.
          </h5>
          <div className="flex items-center">
          <div className="inline-block mr-4"> 
             <img src="https://freelogopng.com/images/all_img/1690643591twitter-x-logo-png.png" alt="Logo" className="w-6 h-6" />
              <div className="text-sm font-medium"></div>
            </div>
            <div className="inline-block mr-4"> 
             <img src="https://w7.pngwing.com/pngs/477/609/png-transparent-logo-computer-icons-instagram-logo-instagram-logo-miscellaneous-text-trademark.png" alt="Logo" className="w-6 h-6" />
              <div className="text-sm font-medium"></div>
              </div>
              <div className="inline-block mr-4"> 
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/2048px-Facebook_f_logo_%282019%29.svg.png" alt="Logo" className="w-6 h-6" />
              <div className="text-sm font-medium"></div>
              </div>
              <div className="inline-block mr-4"> 
             <img src="https://png.pngtree.com/png-clipart/20191120/original/pngtree-email-icon-png-image_5065641.jpg" alt="Logo" className="w-6 h-6" />
              <div className="text-sm font-medium"></div>
              </div>
          </div>
        </div>
        <div className="w-full lg:w-6/12 px-4">
          <div className="flex flex-wrap items-top mb-6">
            <div className="w-full lg:w-4/12 px-4 ml-auto">
              <span className="block uppercase text-blueGray-500 text-sm font-bold mb-2">Links Utiles</span>
              <ul className="list-unstyled">
                <li>
                  <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://www.creative-tim.com/presentation?ref=njs-profile">About Us</a>
                </li>
                <li>
                  <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://blog.creative-tim.com?ref=njs-profile">Blog</a>
                </li>
                <li>
                  <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://www.github.com/creativetimofficial?ref=njs-profile">Github</a>
                </li>
                <li>
                  <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://www.creative-tim.com/bootstrap-themes/free?ref=njs-profile">Free Products</a>
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-4/12 px-4">
              <span className="block uppercase text-blueGray-500 text-sm font-bold mb-2">Otros recursos</span>
              <ul className="list-unstyled">
                <li>
                  <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile">MIT License</a>
                </li>
                <li>
                  <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://creative-tim.com/terms?ref=njs-profile">Terms &amp; Conditions</a>
                </li>
                <li>
                  <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://creative-tim.com/privacy?ref=njs-profile">Privacy Policy</a>
                </li>
                <li>
                  <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://creative-tim.com/contact-us?ref=njs-profile">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-6 border-blueGray-300" />
      <div className="flex flex-wrap items-center md:justify-between justify-center">
        <div className="w-full md:w-4/12 px-4 mx-auto text-center">
          <div className="text-sm text-blueGray-500 font-semibold py-1"> 
            Copyright © <span id="get-current-year">2023 </span>
            <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank">
              TicketShow by <a href="https://www.creative-tim.com?ref=njs-profile" className="text-blueGray-500 hover:text-blueGray-800">Creative Team</a>.
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
