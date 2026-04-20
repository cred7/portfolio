const Header = () => {
  return (
    <div className="py-4 flex justify-between px-4 max-w-5xl mx-auto w-full border-x bg-black border-green-600">
      <div className="flex flex-col justify-center font-mono">
        <h1 className="text-green-600 font-bold text-xl">My Portfolio</h1>
        <p className="text-gray-300">ml-enthusiasts</p>
      </div>
      <div>
        <h1 className="text-green-600 font-bold border-b-2 border-blue-600">
          Aerospace Engineer
        </h1>
      </div>
    </div>
  );
};

export default Header;
