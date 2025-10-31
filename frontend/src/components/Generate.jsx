import React from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

const Generate = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="pb-16 text-center"
    >
      <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16">
        See the magic happen!
      </h1>
      <button
      onClick={onClickHandler}
      
      className="sm:text-lg text-white bg-black w-auto m-auto px-12 py-3 hover:opacity-80 transition-all duration-300 rounded-full items-center gap-2">
        Generate Images
      </button>
    </motion.div>
  );
};

export default Generate;
