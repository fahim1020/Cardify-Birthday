import React, { useState, useEffect } from "react";
import { NotFound } from "./NotFound";
import { useParams } from "react-router-dom";
import axios from "axios";

export const GreetingCard = () => {
  const [card, setCard] = useState(null);
  const { username } = useParams();
  const [soundPlayed, setSoundPlayed] = useState(false);

  const getCardData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/get-card/${username}`
      );
      console.log("Card Data:", response.data);
      setCard(response.data);
    } catch (error) {
      console.error("Error fetching card data:", error);
      setCard(null);
    }
  };

  useEffect(() => {
    getCardData();
  }, [username]);

  const calculateAge = (day, month, year) => {
    const today = new Date();
    const dob = new Date(year, month - 1, day);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  const playBirthdayTune = () => {
    const birthDayTune = new Audio("/happy-birthday-155461.mp3");
    birthDayTune.play();
  };

  const handleClick = () => {
    if (!soundPlayed && card) {
      playBirthdayTune();
      setSoundPlayed(true);
    }
  };

  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("default", { month: "long" });
  };

  return (
    <>
      {card ? (
        <div
          className="container bg-birthday-gradient h-[100vh] flex items-center justify-center"
          onClick={handleClick}
        >
          <div className="card rounded-md bg-gray-100 shadow-left sm:w-[40%] h-[90%] ">
            <div className="card-title mx-3">
              <h1 className="card-title text-3xl font-[cursive] py-2 text-center">
                The Birthday Times
              </h1>
              <div className="hr flex justify-between">
                <div className="w-[60%]">
                  <hr className="border border-black" />
                  <span className="pl-4 font-[cursive]">
                    BORN {card.birthDate.day}{" "}
                    {getMonthName(card.birthDate.month)}
                  </span>
                </div>
                <div className="w-[30%] flex flex-col">
                  <hr className="border border-black" />
                  <span className="text-center font-[cursive]">
                    AGE:{" "}
                    {calculateAge(
                      card.birthDate.day,
                      card.birthDate.month,
                      card.birthDate.year
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="body items-center  flex flex-col justify-center">
              <div className="top flex flex-col items-center">
                <h1 className="greet font-[fangsong] text-xl text-gray-600">
                  HAPPY BIRTHDAY
                </h1>
                <h1 className="name font-[fantasy] text-3xl tracking-wider">
                  {card.name}
                </h1>
              </div>
              <div className="image h-[300px]  w-[340px]  my-4 bg-red-100 ">
                <img
                  src={card.imageSrc}
                  alt="Image not found"
                  className="object-cover h-full w-full shadow-lg rounded-md"
                />
              </div>
              <div className="wish w-[80%] text-center">
                <p className="text-[yellowgreen] font-bold shadow-md border border-1 border-black p-2 rounded-sm">
                  <span>“</span>
                  {card.wish} <span>“</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default GreetingCard;
