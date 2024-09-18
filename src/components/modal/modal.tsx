import React from "react";
import '../modal/modal.css';

interface modalProps {
    isOpen: Boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<modalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal__background">
            <div className="modal">
                <div className="modal__header">
                    <h2 className="modal__title">{title}</h2>
                    <button onClick={onClose} className="close__button">X</button>
                </div>
                <div className="modal__body">
                    <p className="modal__content">{children}</p>
                </div>
            </div>
        </div>
    )
}

export default Modal;