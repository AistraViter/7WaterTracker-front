// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import EditWaterAmountModal from './Modal/EditWaterAmountModal/EditWaterAmountModal.jsx';
import css from "./App.module.css"; // або якийсь інший стиль

export default function TestApp() {
  const [isModalOpen, setIsModalOpen] = useState(true); // Модалка завжди відкрита для тестування

  return (
    <div className={css.app}>
      <h1>Test Modal</h1>
      <EditWaterAmountModal
        isOpen={isModalOpen}
        previousAmount={300}
        previousTime={''}
        setWaterId = {0}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}