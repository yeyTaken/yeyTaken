"use client";

import { useEffect, useState } from "react";
import { Alert } from "@heroui/alert";
import { IoClose } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";

export default function ContextMenuAlert() {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (!isMobile && Math.random() < 0.7) {
      setShowAlert(true);
    }
  }, []);

  return (
    <AnimatePresence>
      {showAlert && (
        <motion.div
          key="alert"
          animate={{ y: 0, opacity: 1 }}
          className="select-none fixed top-4 left-0 w-full z-[99999998] flex justify-center"
          exit={{ y: -30, opacity: 0 }}
          initial={{ y: -30, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <div className="relative w-full max-w-md mx-4">
            <Alert
              hideIconWrapper
              className="w-full shadow-xl bg-background/50 backdrop-blur-md"
              color="secondary"
              description="Clique com o botão direito do mouse para abrir o menu personalizado."
              title={<span className="">Menu contextual</span>}
              variant="faded"
            />

            <button
              aria-label="Fechar alerta"
              className="absolute top-3 right-3 text-default-500 hover:text-default-700 transition"
              onClick={() => setShowAlert(false)}
            >
              <IoClose size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
