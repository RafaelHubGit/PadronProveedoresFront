import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onClose?: () => void;
  title: string;
  children: React.ReactNode;
}

const ModalComponent: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  onClose,
  title,
  children
}) => {

    const [modalWidth, setModalWidth] = useState("90%");

    useEffect(() => {
        const updateWidth = () => {
          const width = window.innerWidth;
          if (width >= 1600) setModalWidth("70%");
          else if (width >= 1200) setModalWidth("70%");
          else if (width >= 992) setModalWidth("60%");
          else if (width >= 768) setModalWidth("70%");
          else if (width >= 576) setModalWidth("80%");
          else setModalWidth("90%");
        };
    
        window.addEventListener("resize", updateWidth);
        updateWidth(); // Llamar inmediatamente para establecer el ancho inicial
    
        return () => window.removeEventListener("resize", updateWidth);
    }, []);


  return (
    <Modal
        title={title ?? ""}
        open={isOpen}
        onCancel={ () => setIsOpen(false) }
        footer={null}
    //   width={ `${width}%` }
        width={modalWidth}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;