import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col gap-y-2 justify-center items-center font-heading text-center px-2">
      <h1 className="text-red-500 font-bold text-6xl">404</h1>
      <p className="text-lg uppercase font-medium">Page does not exist</p>
      <button
        onClick={() => navigate(-1)}
        className="btn bg-primary hover:bg-primary text-white max-w-sm w-full mt-4"
      >
        Go Back
      </button>
    </div>
  );
};

export default Error;
