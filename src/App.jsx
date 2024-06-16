import { useState, useEffect } from "react";

function App() {
  const buttons = [
    "C", "<", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", "00", ".", "=",
  ];

  const [input, setInput] = useState('');

  const handleKeyDown = (event) => {
    const { key } = event;
    if ((key >= '0' && key <= '9') || key === '+' || key === '-' || key === '*' || key === '/' || key === '.' || key === '%') {
      setInput(prevInput => prevInput + key);
    } else if (key === 'Enter') {
      event.preventDefault(); // Prevent default behavior of Enter key
      handleButtonClick('=');
    } else if (key === 'Backspace') {
      handleButtonClick('<');
    } else if (key === 'Escape') {
      handleButtonClick('C');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleButtonClick = (value) => {
    switch (value) {
      case 'C':
        setInput('');
        break;
      case '<':
        setInput(prevInput => prevInput.slice(0, -1));
        break;
      case '=':
        try {
          setInput(eval(input).toString());
        } catch (error) {
          setInput('Error');
        }
        break;
      default:
        setInput(prevInput => prevInput + value);
        break;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="calculator bg-white shadow-lg p-6 rounded-md">
        <h1 className="text-4xl font-bold mb-4 text-right">{input || '0'}</h1>
        <div className="grid grid-cols-4 gap-4">
          {buttons.map((label, index) => (
            <button
              key={index}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
              onClick={() => handleButtonClick(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
