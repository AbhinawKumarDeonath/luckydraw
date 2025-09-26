import React, { useState, useEffect } from 'react';
import { Gift, Settings, Share2, RotateCw, Trophy, Plus, Trash2 } from 'lucide-react';

const LuckyDrawWheel = () => {
  const ADMIN_PASSCODE = 'admin123';
  const USER_PASSCODE = 'lucky2024';
  
  const [gifts, setGifts] = useState([
    {
      id: 1,
      name: 'iPhone 15 Pro',
      image: 'https://icon2.cleanpng.com/lnd/20240417/lbf/transparent-iphone-15-green-apple-fruit-healthy-organic-green-apple-with-green-apple-text661f58cf7569a7.93209891.webp',
      probability: 0.0,
      color: 'bg-red-500'
    },
    {
      id: 2,
      name: 'AirPods Pro',
      image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop&crop=center',
      probability: 50.0,
      color: 'bg-blue-500'
    },
    
  ]);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showDiv, setShowDiv] = useState(true);
  
  // New gift form
  const [newGift, setNewGift] = useState({
    name: '',
    image: '',
    probability: '',
    color: 'bg-blue-500'
  });

  const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500'
  ];

  const showMessage = (msg, type = 'error') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleLogin = () => {
    if (passcode === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      setIsAdmin(true);
      showMessage('Welcome Admin! You can manage gifts and test draws.', 'success');
    } else if (passcode === USER_PASSCODE) {
      setIsAuthenticated(true);
      setIsAdmin(false);
      showMessage('Access granted! Good luck with your draw!', 'success');
    } else {
      showMessage('Invalid passcode. Please try again.');
    }
    setPasscode('');
  };

  const addGift = () => {
    if (!newGift.name || !newGift.probability) {
      showMessage('Please fill in gift name and probability.');
      return;
    }
    
    const probability = parseFloat(newGift.probability);
    if (probability <= 0 || probability > 100) {
      showMessage('Probability must be between 0.1 and 100.');
      return;
    }

    const gift = {
      id: Date.now(),
      name: newGift.name,
      image: newGift.image || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop&crop=center',
      probability: probability,
      color: newGift.color
    };

    setGifts([...gifts, gift]);
    setNewGift({ name: '', image: '', probability: '', color: 'bg-blue-500' });
    showMessage('Gift added successfully!', 'success');
  };

  const removeGift = (id) => {
    setGifts(gifts.filter(gift => gift.id !== id));
    showMessage('Gift removed successfully!', 'success');
  };

  const selectWinner = () => {
    const random = Math.random() * 100;
    let cumulativeProbability = 0;

    for (const gift of gifts) {
      cumulativeProbability += gift.probability;
      if (random <= cumulativeProbability) {
        return gift;
        
      }
    }
    return gifts[gifts.length - 1];
  };

  const spinWheel = () => {
    if (gifts.length === 0) {
      showMessage('No gifts available for draw!');
      return;
    }

    setIsSpinning(true);
    setSelectedGift(null);
    
    const winner = selectWinner();
    const winnerIndex = gifts.findIndex(gift => gift.id === winner.id);
    const segmentAngle = 360 / gifts.length;
    const targetAngle = 360 - (winnerIndex * segmentAngle + segmentAngle / 2);
    const finalRotation = rotation + 1800 + targetAngle; // 5 full rotations + target
    
    setRotation(finalRotation);
    
    setTimeout(() => {
      setIsSpinning(true);
      setSelectedGift(winner);
      setShowDiv(false);
      
      
    }, 4000);
  };

  const drawAgain = () => {
    setSelectedGift(null);
  };

  const shareResult = (platform) => {
    if (!selectedGift) return;


    // const imgUrl = "https://beletime.com.my/wp-content/uploads/2024/12/bele-year-end-sale-4.jpeg";
    const text = `I just won ${selectedGift.name} in the Lucky Draw! Try your luck too!`;
    const url = "https://sindhistore.netlify.app/";
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url  )}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  // Create wheel segments
  const createWheelSegments = () => {
    const segmentAngle = 360 / gifts.length;
    
    return gifts.map((gift, index) => {
      const startAngle = index * segmentAngle;
      const endAngle = (index + 1) * segmentAngle;
      const midAngle = (startAngle + endAngle) / 2;
      
      const x1 = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180);
      const y1 = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180);
      const x2 = 50 + 40 * Math.cos((endAngle - 90) * Math.PI / 180);
      const y2 = 50 + 40 * Math.sin((endAngle - 90) * Math.PI / 180);
      
      const imageX = 50 + 28 * Math.cos((midAngle - 90) * Math.PI / 180);
      const imageY = 50 + 28 * Math.sin((midAngle - 90) * Math.PI / 180);
      const textY = 50 + 35 * Math.sin((midAngle - 90) * Math.PI / 180);
      
      const largeArcFlag = segmentAngle > 180 ? 1 : 0;
      const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
      
      return (
        <g key={gift.id}>
          <defs>
            <clipPath id={`clip-${gift.id}`}>
              <circle cx={imageX} cy={imageY} r="10" />
            </clipPath>
          </defs>
          <path
            d={pathData}
            fill={`hsl(${index * (360 / gifts.length)}, 70%, 60%)`}
            stroke="white"
            strokeWidth="1"
          />
          <foreignObject 
            x={imageX - 10} 
            y={imageY - 10} 
            width="20" 
            height="20" 
            clipPath={`url(#clip-${gift.id})`}
          >
            <img 
              src={gift.image} 
              alt={gift.name}
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop&crop=center';
              }}
            />
          </foreignObject>
          <text
            x={imageX}
            y={textY + 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="4"
            fill="white"
            fontWeight="bold"
          >
            {gift.name.length > 8 ? gift.name.substring(0, 8) + '...' : gift.name}
          </text>
        </g>
      );
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full text-center border border-white/20">
          <div className="mb-6">
            <Gift className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
            <h1 className="text-3xl font-bold text-white mb-2">🎡 Lucky Draw Wheel</h1>
            <p className="text-white/80">Enter your passcode to spin and win!</p>
          </div>
          
          <div className="space-y-4">
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 transform hover:scale-105"
            >
              Access Lucky Draw
            </button>
          </div>
          
          {message && (
            <div className={`mt-4 p-3 rounded-lg ${messageType === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🎡 Lucky Draw Wheel</h1>
          <p className="text-white/80">Spin the wheel and discover your prize!</p>
        </div>

        <div className="">
          {/* Wheel Section */}


          {showDiv && (
          <div className={`fade-box ${showDiv ? "fade-out" : ""} bg-white/10 backdrop-blur-lg rounded-2xl  border border-white/20`}>
            <div className="flex flex-col items-center">
              <div className="relative">
                {/* Wheel */}
                <div className="relative">
                  <svg
                    width="400"
                    height="400"
                    viewBox="0 0 100 100"
                    className={`transform transition-transform duration-[4s] ease-out ${isSpinning ? 'animate-none' : ''}`}
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    {createWheelSegments()}
                  </svg>
                  
                  {/* Center circle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-4 border-gray-800 flex items-center justify-center">
                    <RotateCw className="w-4 h-4 text-gray-800" />
                  </div>
                  
                  {/* Pointer */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-yellow-400"></div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={spinWheel}
                disabled={isSpinning}
                className={`mt-6 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 ${
                  isSpinning
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600'
                } text-white`}
              >
                {isSpinning ? '🎡 Spined' : '🎲 Spin'}
              </button>
            </div>
          </div>)};

          {/* Info/Admin Panel */}
          <div className="space-y-6">
            {/* Result Section */}
            {selectedGift && (
              <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-6 text-white">
                <div className="text-center">
                  <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
                  <h3 className="text-2xl font-bold mb-2">🎉 Congratulations!</h3>
                  <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full border-4 border-white/30">
                    <img 
                      src={selectedGift.image} 
                      alt={selectedGift.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop&crop=center';
                      }}
                    />
                  </div>
                  <h4 className="text-xl font-semibold mb-4">You won: {selectedGift.name}!</h4>
                  
                  <div className="flex justify-center space-x-2 mb-4">
                    <button
                      onClick={() => shareResult('facebook')}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      📘 Facebook
                    </button>
                    <button
                      onClick={() => shareResult('twitter')}
                      className="bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors"
                    >
                      🐦 Twitter
                    </button>
                    <button
                      onClick={() => shareResult('whatsapp')}
                      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      💬 WhatsApp
                    </button>
                  </div>
                  
                  <button
                    onClick={drawAgain}
                    className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-lg transition-colors"
                  >
                    🎲 Spin Again
                  </button>
                </div>
              </div>
            )}

            {/* Gifts List */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">🎁 Available Prizes</h3>
              <div className=" flex justify-center flex-wrap items-center">
                {gifts.map((gift) => (
                  <div key={gift.id} className="flex items-center justify-between bg-white/10 rounded-lg p-3 m-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-[80px] h-[80px] overflow-hidden rounded-lg">
                        <img 
                          src={gift.image} 
                          alt={gift.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop&crop=center';
                          }}
                        />
                      </div>
                      <div>
                        <div className="text-white font-semibold">{gift.name}</div>
                      </div>
                    </div>
                    {isAdmin && (
                      <button
                        onClick={() => removeGift(gift.id)}
                        className="bg-red-500 hover:bg-red-600 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Admin Panel */}
            {isAdmin && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">
                  <Settings className="inline w-6 h-6 mr-2" />
                  Admin Panel
                </h3>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Gift name"
                    value={newGift.name}
                    onChange={(e) => setNewGift({...newGift, name: e.target.value})}
                    className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  />
                  
                  <input
                    type="text"
                    placeholder="Image URL (e.g., https://example.com/image.jpg)"
                    value={newGift.image}
                    onChange={(e) => setNewGift({...newGift, image: e.target.value})}
                    className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  />
                  
                  <input
                    type="number"
                    placeholder="Probability (%)"
                    value={newGift.probability}
                    onChange={(e) => setNewGift({...newGift, probability: e.target.value})}
                    className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  />
                  
                  <button
                    onClick={addGift}
                    className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Gift
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {message && (
          <div className={`fixed bottom-4 right-4 p-4 rounded-lg ${messageType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default LuckyDrawWheel;