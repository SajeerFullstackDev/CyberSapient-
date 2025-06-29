const Footer = () => {
    return ( <>
      <footer className="bg-white text-gray-400 text-center text-sm justify-between py-4 px-6 flex">
        <div>
        <p className="mt-2">
            <a href="#" className="hover:text-white">
              Terms of Use
            </a>{" "}
            -
            <a href="#" className="hover:text-white">
              {" "}
              Privacy
            </a>{" "}
            -
            <a href="#" className="hover:text-white">
              {" "}
              Cookies
            </a>
          </p>
        </div>

        
        <div>
        <p className="mt-2">
            Copyright © 2025 Mitsogo Inc. All Rights Reserved.
          </p>
        </div>
        
        </footer>
    </> );
}
 
export default Footer;