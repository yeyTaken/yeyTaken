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
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="select-none fixed top-4 left-0 w-full z-[99999] flex justify-center"
        >
          <div className="relative w-full max-w-md mx-4">
            <Alert
              hideIconWrapper
              color="secondary"
              title={<span className="">Menu contextual</span>}
              description="Clique com o botão direito do mouse para abrir o menu personalizado."
              variant="faded"
              className="w-full shadow-xl bg-background/50 backdrop-blur-md"
            />

            <button
              onClick={() => setShowAlert(false)}
              className="absolute top-3 right-3 text-default-500 hover:text-default-700 transition"
              aria-label="Fechar alerta"
            >
              <IoClose size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
