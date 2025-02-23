import { getAccessToken } from "@/utils";
import React, { useState } from "react";
import {
  FaSignOutAlt,
  FaQuestionCircle,
  FaList,
  FaWpforms,
} from "react-icons/fa";
import { LuActivity } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./Sidebar.css";

Modal.setAppElement("#root");

function Sidebar() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnClick = (route) => {
    switch (route) {
      case "logout":
        setIsModalOpen(true);
        break;
      case "dashboard":
        navigate("/onboarding");
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

  const handleLogoutConfirm = (confirm) => {
    if (confirm) {
      localStorage.clear();
      navigate("/onboarding");
    }
    setIsModalOpen(false);
  };

  return (
    <div className="h-full w-20 fixed top-0 left-0 bg-gray-800 p-5">
      <h2 className="text-white text-center text-2xl mb-5">FAA</h2>
      <ul className="list-none p-0">
        <li
          className="p-2 text-center text-white hover:bg-gray-700 cursor-pointer tooltip"
          onClick={() => handleOnClick("logs")}
        >
          <FaList className="mx-auto mb-1" />
          <span className="tooltiptext">Logs</span>
        </li>
        <li
          className="p-2 text-center text-white hover:bg-gray-700 cursor-pointer tooltip"
          onClick={() => handleOnClick("recommendations")}
        >
          <LuActivity className="mx-auto mb-1" />
          <span className="tooltiptext">Recommendations</span>
        </li>
        <li
          className="p-2 text-center text-white hover:bg-gray-700 cursor-pointer tooltip"
          onClick={() => handleOnClick("help")}
        >
          <FaQuestionCircle className="mx-auto mb-1" />
          <span className="tooltiptext">Help</span>
        </li>
        {!getAccessToken() && (
          <li
            className="p-2 text-center text-white hover:bg-gray-700 cursor-pointer tooltip"
            onClick={() => handleOnClick("onboarding")}
          >
            <FaWpforms className="mx-auto mb-1" />
            <span className="tooltiptext">Onboarding</span>
          </li>
        )}
        {getAccessToken() && (
          <li
            className="p-2 text-center text-white hover:bg-gray-700 cursor-pointer tooltip"
            onClick={() => handleOnClick("logout")}
          >
            <FaSignOutAlt className="mx-auto mb-1" />
            <span className="tooltiptext">Logout</span>
          </li>
        )}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Logout Confirmation"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Confirm Logout</h2>
        <p>Are you sure?</p>
        <div className="modal-buttons">
          <button
            className="btn btn-confirm"
            onClick={() => handleLogoutConfirm(true)}
          >
            Yes
          </button>
          <button
            className="btn btn-cancel"
            onClick={() => handleLogoutConfirm(false)}
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Sidebar;
