import React, { useState } from 'react';
import EstimatePriceForm from './RefurishCheck';
import RefurbishedItems from './RefurishData';

export default function MainRefur() {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  return (
    <div>
      <button onClick={handleClick}>Check</button>
      {showForm && <EstimatePriceForm />}
      <RefurbishedItems/>
    </div>
  );
}
