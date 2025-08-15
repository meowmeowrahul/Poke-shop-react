import React, { useState, useRef, useEffect } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import bg1 from "/src/img/bg1.jpg";
import giratina from "/src/img/giratina.jpg";
import pikachu from "/src/img/pikachu.jpg";
import lugia from "/src/img/lugia.jpg";
import bidoof from "/src/img/bidoof.jpg";
import snom from "/src/img/snom.webp";
import umbreon from "/src/img/umbroen.jpg";
import rayquaza from "/src/img/rayquaza.jpg";
import dreepy from "/src/img/dreepy.png";
import gyrados from "/src/img/gyrados.jpeg";

// The main App component that renders the Pokemon cards with the holo effect.
const App = () => {
  // Define a constant for the Pokemon card data.
  // This helps keep the JSX clean and easily extensible.
  const [pokemonCards, setPokemonCards] = useState([
    {
      name: "Giratina",
      color1: "#fac",
      color2: "#ddccaa",
      front: giratina,
      animated: true,
      isItemAdded: false,
      quantity: 0,
      price: 573,
      rarity: "Rare",
    },
    {
      name: "Pikachu",
      color1: "#54a29e",
      color2: "#a79d66",
      front: pikachu,
      animated: true,
      isItemAdded: false,
      quantity: 0,
      price: 65,
      rarity: "Common",
    },
    {
      name: "Lugia",
      color1: "#ec9bb6",
      color2: "#ccac6f",
      front: lugia,
      animated: true,
      isItemAdded: false,
      quantity: 0,
      price: 890,
      rarity: "Legendary",
    },
    {
      name: "Bidoof",
      color1: "#54a29e",
      color2: "#a79d66",
      front: bidoof,
      animated: true,
      isItemAdded: false,
      quantity: 0,
      price: 400,
      rarity: "Common",
    },
    {
      name: "Umbreon",
      color1: "#54a29e",
      color2: "#a79d66",
      front: umbreon,
      animated: true,
      isItemAdded: false,
      quantity: 0,
      price: 995,
      rarity: "Rare",
    },
    {
      name: "Dreepy",
      color1: "#54a29e",
      color2: "#a79d66",
      front: dreepy,
      animated: true,
      isItemAdded: false,
      quantity: 0,
      price: 80,
      rarity: "Common",
    },
    {
      name: "Gyrados",
      color1: "#54a29e",
      color2: "#a79d66",
      front: gyrados,
      animated: true,
      isItemAdded: false,
      quantity: 0,
      price: 765,
      rarity: "Rare",
    },
    {
      name: "Rayquaza",
      color1: "#54a29e",
      color2: "#a79d66",
      front: rayquaza,
      animated: true,
      isItemAdded: false,
      quantity: 0,
      price: 1200,
      rarity: "Legendary",
    },
    {
      name: "Snom",
      color1: "#54a29e",
      color2: "#a79d66",
      front: snom,
      animated: true,
      isItemAdded: false,
      quantity: 0,
      price: 58,
      rarity: "Common",
    },
  ]);

  // State to manage the active card's index and its dynamic styles.
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [dynamicStyles, setDynamicStyles] = useState({});
  const [cartQuantity, setCartQuantity] = useState(0);

  // Use a ref to store a timeout for the animation reset.
  const timeoutRef = useRef(null);
  const messageTimeoutRefs = useRef({});

  //Function to calc rarity
  const findRarity = (rarity) => {
    if (rarity == "Common") {
      return "bg-blue-300 rounded-lg p-2 pl-3 pr-3 font-bold  font-serif";
    } else if (rarity == "Rare") {
      return "bg-pink-500 rounded-lg p-2 pl-3 pr-3 font-bold  font-serif";
    } else {
      return "bg-yellow-400 rounded-lg p-2 pl-3 pr-3 font-bold  font-serif";
    }
  };

  //Handle Cart Click
  const handleCartCick = (index) => {
    const updatedCards = [...pokemonCards];

    setCartQuantity(cartQuantity + updatedCards[index].quantity);
    updatedCards[index].quantity = 0;

    updatedCards[index].isItemAdded = true;
    setPokemonCards(updatedCards);

    clearTimeout(messageTimeoutRefs.current[index]);

    messageTimeoutRefs.current[index] = setTimeout(() => {
      setPokemonCards((prevCards) => {
        const newCards = [...prevCards];
        newCards[index].isItemAdded = false;
        return newCards;
      });
    }, 3000);
  };

  //Handle Quantity Click
  const handleAddClick = (index) => {
    const updatedCards = [...pokemonCards];

    updatedCards[index].quantity++;

    setPokemonCards(updatedCards);
  };

  const handleSubClick = (index) => {
    const updatedCards = [...pokemonCards];
    if (updatedCards[index].quantity > 0) {
      updatedCards[index].quantity--;

      setPokemonCards(updatedCards);
    }
  };

  // Function to handle mouse/touch movement on the cards.
  const handleMouseMove = (e, index) => {
    // Clear any existing animation timeout.
    clearTimeout(timeoutRef.current);

    // Set the active card.
    setActiveCardIndex(index);

    // Get the card element and its dimensions.
    const card = e.currentTarget;
    const { width, height } = card.getBoundingClientRect();

    let l, t;
    if (e.type === "touchmove") {
      l = e.touches[0].clientX - card.offsetLeft;
      t = e.touches[0].clientY - card.offsetTop;
    } else {
      l = e.nativeEvent.offsetX;
      t = e.nativeEvent.offsetY;
    }

    // Calculate mouse position relative to the card center.
    const px = Math.abs(Math.floor((100 / width) * l) - 100);
    const py = Math.abs(Math.floor((100 / height) * t) - 100);

    // Calculate positions for gradient, sparkles, and card rotation.
    const lp = 50 + (px - 50) / 1.5;
    const tp = 50 + (py - 50) / 1.5;
    const ty = ((tp - 50) / 2) * -1;
    const tx = ((lp - 50) / 1.5) * 0.5;

    // Create the dynamic styles object.
    setDynamicStyles({
      transform: `rotateX(${ty}deg) rotateY(${tx}deg)`,
    });
  };

  // Function to handle mouse/touch leaving the card.
  const handleMouseOut = () => {
    setActiveCardIndex(null);
    setDynamicStyles({});

    // Set a timeout to re-apply the animation class.
    timeoutRef.current = setTimeout(() => {}, 2500);
  };

  // Clean up the timeout when the component unmounts.
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    // The main container for the application.
    <main className="min-h-screen w-full text-white  bg-[#333844] font-['Heebo'] text-center overflow-hidden">
      <h1 className="my-8 block">Product Based Site</h1>
      <h1>Rahul Dubey SE Comps A</h1>
      <div
        className="flex  items-center heading mb-5"
        style={{ backgroundImage: `url(${bg1})` }}
      >
        <h1 className="flex  w-full justify-center items-center header font-bold text-amber-400 m-1 p-5 text-6xl">
          Pokemon Cards Shop
        </h1>
        <div className="backdrop-blur-[5px] border rounded-full relative m-3">
          <button className=" flex items-center justify-center  rounded-full p-3 pt-4 pb-4 text-4xl">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-[#333844]"
            ></FontAwesomeIcon>
          </button>
          {cartQuantity > 0 && (
            <p className="absolute top-0 left-1 bg-red-500 text-white font-bold text-xs rounded-full h-6 w-6 flex items-center justify-center p-1">
              {cartQuantity}
            </p>
          )}
        </div>
      </div>

      {/* Section for the cards with the 3D holo effect */}
      <section className="flex flex-col flex-wrap items-center justify-evenly relative z-10 md:flex-row">
        {pokemonCards.map((card, index) => (
          <>
            <div
              key={index}
              className="flex flex-col items-center three-d-wrapper isolate perspective-[750px] transform translate-x-[0.1px] translate-y-[0.1px] translate-z-[0.1px]"
            >
              <div className="flex items-center font-bold text-2xl bg-gray-500 rounded-lg w-fit p-3">
                <h3 className="pr-4">{card.name}</h3>
                <h5 className={findRarity(card.rarity)}>{card.rarity}</h5>
              </div>
              <div
                className={`card w-[71.5vw] h-[100vw] sm:w-[clamp(12.9vw,61vh,18vw)] sm:h-[clamp(18vw,85vh,25.2vw)]
                  relative overflow-hidden m-5 mb-8 z-10 touch-none isolation-isolate rounded-[5%/3.5%]
                  transition-all duration-500 ease-in-out will-change-transform
                  bg-cover bg-no-repeat bg-center transform-origin-center
                  shadow-[var(--shadow)]
                  hover:shadow-[var(--shadow-hover)] 
                  ${card.name} ${index === activeCardIndex ? "active" : ""} ${
                  card.animated ? "animated" : ""
                }
              `}
                style={{
                  ...dynamicStyles,
                  "--color1": card.color1,
                  "--color2": card.color2,
                  backgroundImage: `url(${card.front})`,
                }}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseOut={handleMouseOut}
                onTouchMove={(e) => handleMouseMove(e, index)}
                onTouchEnd={handleMouseOut}
                onTouchCancel={handleMouseOut}
              ></div>
              <tag className="text-lg font-semibold bg-amber-600 rounded-lg p-2 m-2">
                Price: ${card.price}
              </tag>
              <div className="flex items-center ">
                <button
                  className="bg-blue-800 p-3 mb-3 rounded-xl"
                  onClick={() => {
                    handleCartCick(index);
                  }}
                >
                  Add To Cart
                </button>
                <button
                  className="bg-gray-300 mb-3 text-gray-700 font-bold text-2xl p-2 rounded-l-2xl"
                  onClick={() => {
                    handleSubClick(index);
                  }}
                >
                  -
                </button>
                <p className="bg-gray-300 p-2  mb-3 font-bold text-2xl text-gray-700">
                  {card.quantity}
                </p>
                <button
                  className="bg-gray-300 mb-3 text-gray-700 font-bold text-2xl p-2 rounded-r-2xl"
                  onClick={() => {
                    handleAddClick(index);
                  }}
                >
                  +
                </button>
              </div>
            </div>
            {card.isItemAdded && (
              <p className="fixed bottom-4 left-1/2 -translate-x-1/2 p-4 rounded-xl bg-green-500 text-white font-bold z-[1000] shadow-lg animate-fadeInOut">
                {card.name} added to cart!
              </p>
            )}
          </>
        ))}
      </section>
    </main>
  );
};

export default App;
