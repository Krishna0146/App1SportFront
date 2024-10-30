import React, { useState } from 'react';
import './EstimatePriceForm.css';

// Data for different products
const productData = {
    Cricket: {
      "Cricket bat": {
        depreciation: 0.125, 
        condition: [0.70, 0.80, 0.90],  
        frequency: [0.95, 0.85, 0.75]  
      },
      "Cricket ball": {
        depreciation: 0.25, 
        condition: [0.50, 0.67, 0.85],
        frequency: [0.90, 0.80, 0.75] 
      },
      "Stumps": {
        depreciation: 0.125,  
        condition: [0.70, 0.80, 0.90],  
        frequency: [0.95, 0.85, 0.75] 
      },
      "Bails": {
        depreciation: 0.175,  
        condition: [0.70, 0.80, 0.90], 
        frequency: [0.95, 0.85, 0.75] 
      },
      "Pads (Leg guards)": {
        depreciation: 0.125,  
        condition: [0.70, 0.80, 0.90], 
        frequency: [0.90, 0.80, 0.75]  
      },
      "Gloves (batting and wicket-keeping)": {
        depreciation: 0.175,  
        condition: [0.65, 0.75, 0.85],  
        frequency: [0.85, 0.75, 0.70] 
      },
      "Helmet": {
        depreciation: 0.125,  
        condition: [0.75, 0.82, 0.90],
        frequency: [0.90, 0.80, 0.75]  
      },
      "Cricket shoes with spikes": {
        depreciation: 0.175,  
        condition: [0.65, 0.75, 0.85],  
        frequency: [0.85, 0.75, 0.70]  
      }
    },
    Volleyball: {
      "Volleyball": {
        depreciation: 0.175, 
        condition: [0.70, 0.77, 0.85], 
        frequency: [0.85, 0.80, 0.75]  
      },
      "Volleyball net": {
        depreciation: 0.125,  
        condition: [0.75, 0.82, 0.90],  
        frequency: [0.85, 0.80, 0.75]  
      },
      "Knee pads": {
        depreciation: 0.175,  
        condition: [0.65, 0.75, 0.85],  
        frequency: [0.85, 0.75, 0.70] 
      },
      "Volleyball shoes": {
        depreciation: 0.175, 
        condition: [0.65, 0.75, 0.85],  
        frequency: [0.85, 0.75, 0.70] 
      },
      "Ankle braces": {
        depreciation: 0.225,  
        condition: [0.65, 0.72, 0.80],  
        frequency: [0.80, 0.75, 0.70] 
      }
    },
    Baseball: {
      "Baseball bat": {
        depreciation: 0.125, 
        condition: [0.70, 0.80, 0.90], 
        frequency: [0.95, 0.85, 0.75]  
      },
      "Baseball": {
        depreciation: 0.25,  
        condition: [0.50, 0.67, 0.85],  
        frequency: [0.90, 0.80, 0.75]  
      },
      "Baseball gloves (mitts)": {
        depreciation: 0.125,  
        condition: [0.70, 0.80, 0.90],
        frequency: [0.95, 0.85, 0.75]  // Frequently, Occasionally, Rarely
      },
      "Catcher’s gear": {
        depreciation: 0.175,  // Average of 15-20%
        condition: [0.65, 0.75, 0.85],  // Poor, Good, Excellent
        frequency: [0.85, 0.75, 0.70]  // Occasionally, Rarely, Frequently
      },
      "Baseball cleats": {
        depreciation: 0.175,  // Average of 15-20%
        condition: [0.65, 0.75, 0.85],  // Poor, Good, Excellent
        frequency: [0.85, 0.75, 0.70]  // Occasionally, Rarely, Frequently
      }
    },
    Rugby: {
      "Rugby ball": {
        depreciation: 0.175,  // Average of 15-20%
        condition: [0.70, 0.77, 0.85],  // Poor, Good, Excellent
        frequency: [0.85, 0.80, 0.75]  // Frequently, Occasionally, Rarely
      },
      "Scrum cap": {
        depreciation: 0.125,  // Average of 10-15%
        condition: [0.75, 0.82, 0.90],  // Poor, Good, Excellent
        frequency: [0.85, 0.80, 0.75]  // Frequently, Occasionally, Rarely
      },
      "Mouthguard": {
        depreciation: 0.225,  // Average of 20-25%
        condition: [0.60, 0.70, 0.80],  // Poor, Good, Excellent
        frequency: [0.80, 0.75, 0.70]  // Frequently, Occasionally, Rarely
      },
      "Rugby boots": {
        depreciation: 0.175,  // Average of 15-20%
        condition: [0.65, 0.75, 0.85],  // Poor, Good, Excellent
        frequency: [0.85, 0.75, 0.70]  // Frequently, Occasionally, Rarely
      },
      "Shoulder pads": {
        depreciation: 0.175,  // Average of 15-20%
        condition: [0.65, 0.75, 0.85],  // Poor, Good, Excellent
        frequency: [0.85, 0.75, 0.70]  // Frequently, Occasionally, Rarely
      }
    },
    Basketball: {
      "Basketball": {
        depreciation: 0.175,  // Average of 15-20%
        condition: [0.70, 0.77, 0.85],  // Poor, Good, Excellent
        frequency: [0.85, 0.80, 0.75]  // Frequently, Occasionally, Rarely
      },
      "Basketball hoop (with backboard)": {
        depreciation: 0.125,  // Average of 10-15%
        condition: [0.75, 0.82, 0.90],  // Poor, Good, Excellent
        frequency: [0.90, 0.80, 0.75]  // Frequently, Occasionally, Rarely
      }
    }
  };
  
  


  const calculateEstimatedPrice = (originalPrice, depreciation, conditionFactor, frequencyFactor, yearsUsed) => {
    const ageDepreciation = depreciation * yearsUsed;
    const adjustedPrice = originalPrice - (originalPrice * ageDepreciation);
    const finalConditionFactor = conditionFactor;
    const finalFrequencyFactor = frequencyFactor;
    const estimatedPrice = adjustedPrice * finalConditionFactor * finalFrequencyFactor;
  
    return Math.max(0, estimatedPrice); // Ensure the price is not negative
  };
  
  const EstimatePriceForm = () => {
    const [category, setCategory] = useState('');
    const [product, setProduct] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [condition, setCondition] = useState('');
    const [frequency, setFrequency] = useState('');
    const [yearsUsed, setYearsUsed] = useState('');
    const [estimatedPrice, setEstimatedPrice] = useState(null);
  
    const handleCategoryChange = (e) => {
      setCategory(e.target.value);
      setProduct('');
      setEstimatedPrice(null);
    };
  
    const handleProductChange = (e) => {
      setProduct(e.target.value);
      setEstimatedPrice(null);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (category && product && originalPrice && condition !== '' && frequency !== '' && yearsUsed !== '') {
        const { depreciation, condition: conditionRange, frequency: frequencyRange } = productData[category][product];
        const price = parseFloat(originalPrice);
        const conditionIndex = parseInt(condition);
        const frequencyIndex = parseInt(frequency);
        const years = parseInt(yearsUsed);
  
        if (!isNaN(price) && !isNaN(conditionIndex) && !isNaN(frequencyIndex) && !isNaN(years)) {
          const estimated = calculateEstimatedPrice(
            price,
            depreciation,
            conditionRange[conditionIndex],
            frequencyRange[frequencyIndex],
            years
          );
          setEstimatedPrice(estimated.toFixed(2));
        } else {
          console.error('Invalid input data:', { price, conditionIndex, frequencyIndex, years });
          setEstimatedPrice('Error');
        }
      } else {
        console.log('Please fill all the fields.');
        setEstimatedPrice('Error');
      }
    };
  
    return (
      <div style={{
        maxWidth: '600px',
        margin: 'auto',
        padding: '30px',
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px'
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#333',
          fontSize: '24px',
          marginBottom: '20px'
        }}>Estimate Used Product Price</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '10px', fontWeight: '500', color: '#555' }}>
            Category:
            <select value={category} onChange={handleCategoryChange} style={{
              marginTop: '5px',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              transition: 'border-color 0.3s ease'
            }}>
              <option value="">Select Category</option>
              {Object.keys(productData).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>
          <br />
  
          <label style={{ marginBottom: '10px', fontWeight: '500', color: '#555' }}>
            Product:
            <select value={product} onChange={handleProductChange} disabled={!category} style={{
              marginTop: '5px',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              transition: 'border-color 0.3s ease'
            }}>
              <option value="">Select Product</option>
              {category && Object.keys(productData[category]).map((prod) => (
                <option key={prod} value={prod}>{prod}</option>
              ))}
            </select>
          </label>
          <br />
  
          <label style={{ marginBottom: '10px', fontWeight: '500', color: '#555' }}>
            Original Price:
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              min="0"
              style={{
                marginTop: '5px',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                transition: 'border-color 0.3s ease'
              }}
            />
          </label>
          <br />
  
          <label style={{ marginBottom: '10px', fontWeight: '500', color: '#555' }}>
            Condition:
            <select value={condition} onChange={(e) => setCondition(e.target.value)} disabled={!product} style={{
              marginTop: '5px',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              transition: 'border-color 0.3s ease'
            }}>
              <option value="">Select Condition</option>
              <option value="0">Poor</option>
              <option value="1">Good</option>
              <option value="2">Excellent</option>
            </select>
          </label>
          <br />
  
          <label style={{ marginBottom: '10px', fontWeight: '500', color: '#555' }}>
            Frequency of Use:
            <select value={frequency} onChange={(e) => setFrequency(e.target.value)} disabled={!product} style={{
              marginTop: '5px',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              transition: 'border-color 0.3s ease'
            }}>
              <option value="">Select Frequency</option>
              <option value="0">Rarely</option>
              <option value="1">Occasionally</option>
              <option value="2">Frequently</option>
            </select>
          </label>
          <br />
  
          <label style={{ marginBottom: '10px', fontWeight: '500', color: '#555' }}>
            Years Used:
            <input
              type="number"
              value={yearsUsed}
              onChange={(e) => setYearsUsed(e.target.value)}
              min="0"
              style={{
                marginTop: '5px',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                transition: 'border-color 0.3s ease'
              }}
            />
          </label>
          <br />
  
          <button type="submit" style={{
            marginTop: '20px',
            padding: '12px',
            fontSize: '18px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, transform 0.2s ease'
          }}>
            Calculate Estimated Price
          </button>
        </form>
  
        {estimatedPrice !== null && (
          <div>
            <h3 style={{
              textAlign: 'center',
              marginTop: '30px',
              color: '#666',
              fontSize: '20px'
            }}>Estimated Price: ${estimatedPrice}</h3>
          </div>
        )}
      </div>
    );
  };
  
  export default EstimatePriceForm;