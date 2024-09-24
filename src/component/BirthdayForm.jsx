import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogBox } from "./DialogBox";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const BirthdayForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    birthDate: "",
    wish: "",
    imageSrc: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedUsername = formData.username.trim();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/create-card`,
        { ...formData, username: trimmedUsername }
      );

      const cardUrl = `https://cardify-birthday.netlify.app/greet/${trimmedUsername}`;

      // Copy URL to clipboard
      copyToClipboard(cardUrl);

      // Show toast message
      toast.success("Event has been created. URL copied to clipboard.");
      setFormData({
        username: "",
        name: "",
        birthDate: "",
        wish: "",
        imageSrc: "",
      });
      setTimeout(() => {
        window.open(cardUrl, "_blank");
      }, 2000);
    } catch (error) {
      console.error("Error creating card:", error);
      toast.error("Username Already Exists");
    }
  };

  const handleFocus = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .catch((err) => console.error("Could not copy URL to clipboard", err));
  };

  return (
    <div className="left-form w-full sm:bg-none bg-[url('/birthday-image.jpg')] bg-cover bg-center sm:w-[40%] flex flex-col items-center sm:bg-gray-200 justify-center">
      <h1 className="text-center text-2xl font-bold italic text-black sm:text-orange-400">
        Create a BirthDay Card
      </h1>
      <p>Wish to your friend!!🥳</p>
      <form
        onSubmit={handleSubmit}
        className="mt-2 p-2 bg-orange-300 w-[60%] rounded-md"
      >
        <label htmlFor="username" className="pl-7 font-bold">
          Username
        </label>
        <Input
          type="text"
          id="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-[80%] my-2 mx-auto"
          required
        />
        <label htmlFor="name" className="pl-7 font-bold">
          Name
        </label>
        <Input
          type="text"
          id="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-[80%] my-2 mx-auto"
          required
        />
        <label htmlFor="birthDate" className="pl-7 font-bold">
          Birth Date
        </label>
        <Input
          type="date"
          id="birthDate"
          placeholder="Birth Date"
          value={formData.birthDate}
          onChange={handleChange}
          className="w-[80%] my-2 cursor-pointer mx-auto"
          required
        />
        <label htmlFor="wish" className="pl-7 font-bold">
          Wish
        </label>
        <Textarea
          id="wish"
          placeholder="Make a wish..."
          value={formData.wish}
          onChange={handleChange}
          className="w-[80%] my-2 cursor-pointer mx-auto resize-none"
          required
        />
        <label htmlFor="imageSrc" className="pl-7 font-bold">
          Image
        </label>
        <Input
          type="url"
          id="imageSrc"
          placeholder="Image URL"
          value={formData.imageSrc}
          onChange={handleChange}
          className="w-[80%] my-2 cursor-pointer mx-auto"
          required
        />
        <p
          className="text-center text-blue-700 font-bold cursor-pointer"
          onClick={handleFocus}
        >
          Create image URL
        </p>
        <Button type="submit" className="ml-7 mb-2">
          Submit
        </Button>
      </form>
      {isDialogOpen && (
        <DialogBox isOpen={isDialogOpen} onClose={handleClose} />
      )}
      <ToastContainer />
    </div>
  );
};
