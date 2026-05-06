import { useEffect, FC, ReactNode } from 'react';
import styles from "./Modal.module.css";
import ModalOverlay from "../modalOverlay/ModalOverlay"; 
import close from '../../image/close.png';
import { createPortal } from 'react-dom';


interface IModalProps {
  title?: string;
  onClose: ()=>void;
  children: ReactNode;
}


const modalRoot = document.getElementById("modals") as HTMLDivElement;

const Modal: FC<IModalProps> =({ title, onClose, children }) => {
  
  // Закрытие по Esc
  useEffect(() => {
    const handleEscClose = (e:KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscClose);
    return () => document.removeEventListener('keydown', handleEscClose);
  }, [onClose]);

  return createPortal(
    (
      <>
        <ModalOverlay onClick={onClose} />
        
        <div className={styles.modal}>
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            <button className={styles.closeButton} onClick={onClose}>
              <img src={close} alt="close" />
            </button>
          </div>
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </>
    ), 
    modalRoot
  );
}


export default Modal;
