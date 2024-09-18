import React from "react";
import '../modal/modal.css';

interface modalProps {
    isOpen: Boolean;
    onClose: () => void;
    header: string;
    body: React.ReactNode
}

const Modal: React.FC<modalProps> = ({ isOpen, onClose, header, body }) => {
    if (!isOpen) return null;

    return (
        <div className="modal__background">
            <div className="modal">
                <div className="modal__header">
                    <h2 className="modal__title">{header}</h2>
                </div>
                <div className="modal__body">
                    <div className="modal__content">{body}</div>
                </div>
                <div className="modal__footer">
                    <button onClick={onClose} className="close__button">Close</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;