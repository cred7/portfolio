import Terminal from "./Cursors";

const Body = () => {
  return (
    <div className="flex-1 min-h-0 max-w-4xl mx-auto w-full border-x border-green-600 flex flex-col overflow-hidden">
      <div className="text-green-600 font-mono border-b border-green-600 p-2 flex flex-wrap gap-2 justify-center">
        <span>help |</span>
        <span>about |</span>
        <span>skills |</span>
        <span>projects |</span>
        <span>contact |</span>
        <span>education |</span>
        <span>sudo |</span>
        <span>clear</span>
      </div>
      <div className="flex-1 min-h-0 h-full w-full overflow-hidden p-1">
        <div className="h-full w-full  min-h-0 ">
          <Terminal />
        </div>
      </div>
    </div>
  );
};

export default Body;
