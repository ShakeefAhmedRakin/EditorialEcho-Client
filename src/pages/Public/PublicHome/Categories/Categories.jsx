const Categories = () => {
  return (
    <div>
      <div className="flex white gap-3 overflow-x-auto font-heading border-b pb-5 text-lg">
        <button className="btn bg-transparent px-8 text-white bg-primary hover:bg-primary border-transparent hover:border-transparent">
          All
        </button>
        <button className="btn bg-transparent border-primary hover:border-primary hover:bg-transparent hover:shadow-xl px-8">
          Technology
        </button>
        <button className="btn bg-transparent border-primary hover:border-primary hover:bg-transparent hover:shadow-xl px-8">
          Food
        </button>
        <button className="btn bg-transparent border-primary hover:border-primary hover:bg-transparent hover:shadow-xl px-8">
          Fashion
        </button>
        <button className="btn bg-transparent border-primary hover:border-primary hover:bg-transparent hover:shadow-xl px-8">
          Travel
        </button>
        <button className="btn bg-transparent border-primary hover:border-primary hover:bg-transparent hover:shadow-xl px-8">
          Health
        </button>
        <button className="btn bg-transparent border-primary hover:border-primary hover:bg-transparent hover:shadow-xl px-8">
          Coding
        </button>
        <button className="btn bg-transparent border-primary hover:border-primary hover:bg-transparent hover:shadow-xl px-8">
          DIY
        </button>
      </div>
    </div>
  );
};

export default Categories;
