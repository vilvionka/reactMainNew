import styles from "./ModalOverlay.module.css"
import { FC } from 'react';

interface IModalOverlayProps{
  onClick: ()=> void;
}


const ModalOverlay: FC<IModalOverlayProps> = ({ onClick }) => (
  <div className={styles.overlay} onClick={onClick}></div>
);




export default ModalOverlay