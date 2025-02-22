import { getAccessToken } from "@/utils";
import React from "react";
import {
  FaDashcube,
  FaComments,
  FaSignOutAlt,
  FaQuestionCircle,
  FaSignInAlt,
  FaWpforms,
} from "react-icons/fa";
import { LuActivity } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleOnClick = (route) => {
    switch (route) {
      case "logout":
        localStorage.clear();
        navigate("/onboarding");
        break;
      case "dashboard":
        navigate("/dashboard");
        break;
      case "logs":
        navigate("/logs");
        break;
      case "help":
        navigate("/help");
        break;
      case "recommendations":
        navigate("/recommendations");
        break;
      case "onboarding":
        navigate("/onboarding");
        break;

      default:
        break;
    }
  };
  return (
    <div className="h-full w-20 fixed top-0 left-0 bg-gray-800 p-5">
      <h2 className="text-white text-center text-2xl mb-5">FAA</h2>
      <ul className="list-none p-0">
        {/* <li
          className="p-2 text-center text-white hover:bg-gray-700 cursor-pointer"
          onClick={() => handleOnClick("dashboard")}
        >
          <FaDashcube
            className="mx-auto mb-1"
            onClick={() => handleOnClick("dashboard")}
          />
        </li> */}
        <li
          className="p-2 text-center text-white hover:bg-gray-700 cursor-pointer"
          onClick={() => handleOnClick("logs")}
        >
          <FaComments className="mx-auto mb-1" />
        </li>
        <li
          className="p-2 text-center text-white hover:bg-gray-700 cursor-pointer"
          onClick={() => handleOnClick("recommendations")}
        >
          <LuActivity className="mx-auto mb-1" />
        </li>
        <li className="p-2 text-center text-white hover:bg-gray-700 cursor-pointer">
          <FaQuestionCircle
            className="mx-auto mb-1"
            onClick={() => handleOnClick("help")}
          />
        </li>
        {!getAccessToken() && (
          <li className="p-2 text-center text-white hover:bg-gray-700 cursor-pointer">
            <FaWpforms
              className="mx-auto mb-1"
              onClick={() => handleOnClick("onboarding")}
            />
          </li>
        )}
        <li className="p-2 text-center text-white hover:bg-gray-700 cursor-pointer">
          <FaSignOutAlt
            className="mx-auto mb-1"
            onClick={() => handleOnClick("logout")}
          />
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
