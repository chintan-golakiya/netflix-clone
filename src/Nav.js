import react, { useEffect, useState } from 'react';
import './Nav.css';

function Nav(){
  const [show,handleShow] = useState(false);
  useEffect(()=> {
    window.addEventListener("scroll", ()=> {
      if(window.scrollY > 100){
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("srcoll");
    }
  },[])

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img className="nav_logo" 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png" 
        alt="netflix logo"/>
      <img className="nav_avatar" 
        src="octane head.jpg" 
        alt="avatar" />
    </div>
  )

}

export default Nav;