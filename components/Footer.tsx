import LiveDateTime from "./Time";

const Footer = async () => {
  return (
    <div className="h-full py-4 text-sm max-sm:text-xs font-mono text-center w-full flex justify-between items-center text-gray-600 p-1 max-w-5xl m-auto border-x border-green-600">
      <p className=" text-gray-300 max-sm:hidden">#elvisomondi@owuor</p>
      <div className="text-green-600">
        <LiveDateTime />
      </div>
      <p className=" text-gray-300">
        &copy; {new Date().getFullYear()} My Portfolio. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
