import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

// Car data with images, descriptions, and sound URLs
const carData = [
  {
    id: 1,
    name: "Tesla Model S",
    description: "Electric luxury sedan with autopilot capabilities and incredible acceleration.",
    image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800",
    soundUrl: "https://www.soundjay.com/misc/sounds-888.mp3", // Placeholder - replace with actual car sounds
    color: "Electric Blue"
  },
  {
    id: 2,
    name: "BMW M3",
    description: "High-performance sports sedan with precise handling and powerful engine.",
    image: "https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=800",
    soundUrl: "https://www.soundjay.com/misc/sounds-889.mp3",
    color: "Alpine White"
  },
  {
    id: 3,
    name: "Porsche 911",
    description: "Iconic sports car with timeless design and exceptional driving dynamics.",
    image: "https://images.pexels.com/photos/3802509/pexels-photo-3802509.jpeg?auto=compress&cs=tinysrgb&w=800",
    soundUrl: "https://www.soundjay.com/misc/sounds-890.mp3",
    color: "Guards Red"
  },
  {
    id: 4,
    name: "Mercedes-AMG GT",
    description: "Luxury sports car combining comfort with track-ready performance.",
    image: "https://images.pexels.com/photos/3802511/pexels-photo-3802511.jpeg?auto=compress&cs=tinysrgb&w=800",
    soundUrl: "https://www.soundjay.com/misc/sounds-891.mp3",
    color: "Magno Grey"
  },
  {
    id: 5,
    name: "Audi RS6",
    description: "High-performance wagon with quattro all-wheel drive and twin-turbo V8.",
    image: "https://images.pexels.com/photos/3802512/pexels-photo-3802512.jpeg?auto=compress&cs=tinysrgb&w=800",
    soundUrl: "https://www.soundjay.com/misc/sounds-892.mp3",
    color: "Nardo Grey"
  },
  {
    id: 6,
    name: "Lamborghini Huracán",
    description: "Exotic supercar with naturally aspirated V10 and all-wheel drive.",
    image: "https://images.pexels.com/photos/3802513/pexels-photo-3802513.jpeg?auto=compress&cs=tinysrgb&w=800",
    soundUrl: "https://www.soundjay.com/misc/sounds-893.mp3",
    color: "Arancio Borealis"
  },
  {
    id: 7,
    name: "Ferrari F8 Tributo",
    description: "Mid-engine supercar with turbocharged V8 delivering incredible performance.",
    image: "https://images.pexels.com/photos/3802514/pexels-photo-3802514.jpeg?auto=compress&cs=tinysrgb&w=800",
    soundUrl: "https://www.soundjay.com/misc/sounds-894.mp3",
    color: "Rosso Corsa"
  },
  {
    id: 8,
    name: "McLaren 720S",
    description: "British supercar with carbon fiber monocoque and active aerodynamics.",
    image: "https://images.pexels.com/photos/3802515/pexels-photo-3802515.jpeg?auto=compress&cs=tinysrgb&w=800",
    soundUrl: "https://www.soundjay.com/misc/sounds-895.mp3",
    color: "Papaya Orange"
  }
];

function App() {
  // State for tracking which audio is currently playing
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  // Ref to store audio elements for each car
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement }>({});

  // Function to handle car card clicks and play/pause audio
  const handleCarClick = (carId: number, soundUrl: string) => {
    // Stop any currently playing audio
    if (playingAudio !== null && playingAudio !== carId) {
      const currentAudio = audioRefs.current[playingAudio];
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    }

    // Get or create audio element for this car
    let audio = audioRefs.current[carId];
    if (!audio) {
      audio = new Audio(soundUrl);
      audioRefs.current[carId] = audio;
      
      // Set up event listeners for when audio ends
      audio.addEventListener('ended', () => {
        setPlayingAudio(null);
      });
    }

    // Toggle play/pause
    if (playingAudio === carId) {
      audio.pause();
      setPlayingAudio(null);
    } else {
      audio.play().catch(error => {
        console.log('Audio play failed:', error);
        // Fallback for when audio can't be played (common with placeholder URLs)
        alert(`Playing ${carData.find(car => car.id === carId)?.name} sound effect!`);
      });
      setPlayingAudio(carId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Premium Car Collection
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our exclusive collection of luxury and sports cars. Click on any car to hear its unique engine sound.
          </p>
        </div>

        {/* Car Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {carData.map((car) => (
            <div
              key={car.id}
              className="group bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 cursor-pointer border border-white/20"
              onClick={() => handleCarClick(car.id, car.soundUrl)}
            >
              {/* Car Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback for broken images
                    e.currentTarget.src = `https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800`;
                  }}
                />
                
                {/* Audio Control Overlay */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {playingAudio === car.id ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white" />
                  )}
                </div>

                {/* Playing Indicator */}
                {playingAudio === car.id && (
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-green-500/80 backdrop-blur-sm rounded-full px-3 py-1">
                    <Volume2 className="w-4 h-4 text-white animate-pulse" />
                    <span className="text-white text-sm font-medium">Playing</span>
                  </div>
                )}
              </div>

              {/* Car Information */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                  {car.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">{car.color}</span>
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {car.description}
                </p>

                {/* Action Button */}
                <div className="flex items-center justify-between">
                  <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    {playingAudio === car.id ? 'Stop Sound' : 'Play Sound'}
                  </button>
                  
                  <div className="text-blue-300 text-sm">
                    Click to hear
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Information */}
        <div className="text-center mt-16 text-gray-400">
          <p className="text-lg mb-2">🎵 Audio Experience</p>
          <p className="text-sm">
            Note: Some audio files may not play due to browser restrictions or placeholder URLs. 
            Replace soundUrl properties with actual car sound files for full functionality.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;