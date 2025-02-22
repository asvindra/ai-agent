import React from "react";
import {
  FaTachometerAlt,
  FaComments,
  FaCog,
  FaQuestionCircle,
  FaSignInAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Sidebar () {
  const navigate = useNavigate();

  const handleOnClick = (route) => {
   switch (route) {
    case 'login':
      navigate("/login");
      break;
      case 'dashboard':
        navigate("/dashboard");
        break;
     
    default:
      break;
   }
  };
  return (
    <div className="h-full w-20 fixed top-0 left-0 bg-gray-900 p-5">
      <h2 className="text-white text-center text-2xl mb-5">AI</h2>
      <ul className="list-none p-0">
        <li className="p-2 text-center text-white hover:bg-gray-700 cursor-pointer">
          <FaComments className="mx-auto mb-1"  onClick={()=>handleOnClick("dashboard")} />
        </li>
        <li className="p-2 text-center text-white hover:bg-gray-700 cursor-pointer">
          <FaCog className="mx-auto mb-1" />
        </li>
        <li className="p-2 text-center text-white hover:bg-gray-700 cursor-pointer">
          <FaQuestionCircle className="mx-auto mb-1" />
        </li>
        <li className="p-2 text-center text-white hover:bg-gray-700 cursor-pointer">
          <FaSignInAlt className="mx-auto mb-1" onClick={()=>handleOnClick("login")} />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
