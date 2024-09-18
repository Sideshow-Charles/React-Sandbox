import React, { useState } from 'react';
import './App.css';
// import Counter from "../src/components/Counter.tsx";
import Modal from "../src/components/modal/modal.tsx";

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="App">
      {/* <Counter /> */}
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Example Modal">
        <p>This is some content inside the modal!</p>
      </Modal>
    </div>
  );
}

export default App;
