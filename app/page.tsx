import Body from "@/components/Body";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const page = () => {
  return (
    <div className="h-screen w-screen flex m-0 p-0 bg-black">
      <div className="flex flex-col w-full h-full px-2">
        {/* header */}
        <div className="flex w-full h-[13%] p-1 border-b border-green-600">
          <Header />
        </div>
        {/* body */}
        <div className="flex w-full h-[88%] p-1 overflow-hidden">
          <Body />
        </div>
        {/* footer */}
        <div className="flex w-full h-[9%] p-1 border-t border-green-600">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default page;
