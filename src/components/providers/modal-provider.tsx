"use client";

import { useEffect, useState } from "react";
import EditJobModal from "../modals/edit-job-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <EditJobModal />
    </>
  );
};
