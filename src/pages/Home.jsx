import { BirthdayForm } from "../component/BirthdayForm";
import BI from "/birthday-image.jpg";
export const Home = () => {
  return (
    <div className="main flex  bg-orange-100 h-[100vh] ">
      <BirthdayForm />
      <div className="relative  right w-[60%] items-center hidden sm:flex">
        <img src={BI} className="object-cover w-full h-full" />
      </div>
    </div>
  );
};
