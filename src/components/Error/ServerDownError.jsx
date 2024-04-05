import { TbServerOff } from "react-icons/tb";

const ServerDownError = () => {
  return (
    <div className="h-screen flex-col gap-4 text-center flex justify-center font-heading items-center">
      <div className="flex items-center gap-3 border-b pb-2">
        <h1 className="font-heading font-semibold text-4xl">
          Street<span className="font-normal">Wise</span>
        </h1>
      </div>
      <TbServerOff className="text-6xl text-red-500"></TbServerOff>
      <h1 className="text-2xl font-medium">{`We'll be back!`}</h1>
      <p>Servers are currently down</p>
    </div>
  );
};

export default ServerDownError;
