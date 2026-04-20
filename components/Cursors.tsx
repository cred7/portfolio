"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";

type HistoryItem = {
  command: string;
  response: string[];
};

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [displayedHistory, setDisplayedHistory] = useState<HistoryItem[]>([]);
  const [isPrinting, setIsPrinting] = useState(false);
  const [onFocus, setOnfocus] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // scroll to bottom
  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [displayedHistory]);

  // simulate typing effect
  const typeText = async (text: string) => {
    let result = "";

    for (let i = 0; i < text.length; i++) {
      result += text[i];

      setDisplayedHistory((prev) => {
        const copy = [...prev];
        copy[copy.length - 1].response[
          copy[copy.length - 1].response.length - 1
        ] = result;
        return copy;
      });

      await new Promise((res) => setTimeout(res, 13)); // speed control
    }
  };

  // process queue
  useEffect(() => {
    if (history.length === 0) return;
    if (isPrinting) return;

    const process = async () => {
      setIsPrinting(true);

      const next = history[displayedHistory.length];
      if (!next) {
        setIsPrinting(false);
        return;
      }

      // push empty response first
      setDisplayedHistory((prev) => [
        ...prev,
        { command: next.command, response: [""] },
      ]);

      await typeText(next.response.join("\n"));

      setIsPrinting(false);
    };

    process();
  }, [history, displayedHistory, isPrinting]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    let response = [] as string[];

    switch (trimmed) {
      case "help":
        response = [
          "help | about | projects | skills | experience | contact | education | certifications | leadership | sudo | clear",
        ];
        break;

      case "about":
        response = [
          "Multidisciplinary Engineer working across Aerospace, Mechanical, and Software systems.",
          "Focus on engineering systems design, maintenance operations, industrial machinery, and software-driven engineering solutions.",
        ];
        break;
      case "hey":
        response = [
          "Hi, there. welcome to my terminlal.",
          "this are some of the commands you can try:",
          "help",
          "about",
          "projects",
          "skills",
          "experience",
          "contact",
          "education",
          "certifications",
          "leadership",
          "sudo",
          "clear",

          "",
          "type 'help' to see the list of commands again.",
        ];
        break;

      case "projects":
        response = [
          "Aircraft Maintenance & Tracking System: AMP, MEL, AD compliance, scheduling and technical records.",
          "Mechanical Systems Tools: turbine inspection workflows, vibration and rotor analysis models.",
          "Engineering Software Systems: dashboards and tools for industrial and aviation data management.",
          "AI/ML Engineering Tools: predictive models for classification and operational optimization.",
        ];
        break;

      case "skills":
        response = [
          "Aerospace Systems: aircraft maintenance (AMP, MEL, AD compliance), rotorcraft & fixed-wing operations",
          "Mechanical Engineering: turbine systems, vibration analysis, rotor dynamics, machining & fabrication",
          "Software Engineering: React, Next.js, Django, Node.js, Python",
          "Engineering Tools: ANSYS, MATLAB",
          "DevOps & Systems: Linux, Docker, Nginx, Git",
          "Industrial Systems: hydropower turbine inspection & maintenance",
        ];
        break;

      case "experience":
        response = [
          "KenGen – Mechanical & Industrial Engineering Exposure",
          "• Turbine inspection, maintenance, and performance monitoring",
          "• Rotor shaft alignment and vibration optimization",
          "• Mechanical systems reliability improvement",
          "",
          "KWS-Airwing – Aerospace Maintenance Exposure",
          "• Aircraft maintenance: Bell 206/407, R-44, Cessna series",
          "• Engine systems: PT6A-114A, Rolls-Royce 250-C47B",
          "• Structural repair, fabrication, and airworthiness compliance",
          "",
          "Software Engineering Work",
          "• Built engineering tools for maintenance tracking and data systems",
          "• Developed full-stack applications and AI-assisted systems",
        ];
        break;

      case "contact":
        response = [
          "Email: omondielvis.owuor@gmail.com",
          "Phone: +254-796-432-637",
          "GitHub: github.com/cred7",
        ];
        break;

      case "education":
        response = [
          "BSc Aerospace Engineering – Kenyatta University (2019–2025)",
          "",
          "Engineering Core:",
          "• Aerospace Systems & Aircraft Maintenance",
          "• Mechanical Systems & Thermodynamics",
          "• Fluid Mechanics & Propulsion",
          "• Material Science & Structural Analysis",
          "",
          "Software & Systems Focus:",
          "• Programming for engineering systems",
          "• Data-driven engineering tools",
        ];
        break;

      case "certifications":
        response = [
          "Aircraft Maintenance Systems (AMP/MEL/AD compliance)",
          "Mechanical workshop training: machining, fabrication, welding",
          "Industrial systems exposure: turbines & power generation systems",
        ];
        break;

      case "leadership":
        response = [
          "Engineering systems thinker across Aerospace, Mechanical, and Software domains.",
          "Focus on building structured, reliable, and data-driven engineering workflows.",
          "Strong emphasis on operational discipline, systems reliability, and automation.",
        ];
        break;

      case "sudo":
        response = ["Access denied: You are not root."];
        break;

      case "clear":
        setHistory([]);
        setDisplayedHistory([]);
        return;

      default:
        response = [
          `${trimmed} ~ Unknown command. Type 'help' to see available commands.`,
        ];
        break;
    }

    setHistory((prev) => [...prev, { command: trimmed, response }]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isPrinting) return; // 🔒 LOCK INPUT

    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
      onFocus && setOnfocus(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-y-auto bg-black text-green-500 font-mono px-4 pb-6 remove-scrollbar"
      onClick={() => inputRef.current?.focus()}
    >
      {/* HISTORY */}

      <div className="">
        <div className="flex flex-col mb-2">
          <span className="text-blue-400 mr-2">omondielvis@portfolio:~$</span>
          <span className="text-white">
            Hi, I'm Elvis! a Graduate Engineer. Type 'help' to see a list of
            commands.
          </span>
        </div>
      </div>
      <div className="pt-4">
        {displayedHistory.map((item, i) => (
          <div key={i} className="mb-4">
            <div className="flex">
              <span className="text-blue-400 mr-2">
                omondielvis@portfolio:~$
              </span>
              <span>{item.command}</span>
            </div>

            <div className="text-white whitespace-pre-wrap flex flex-col ml-4 mt-1">
              {item.response.map((line, j) => (
                <div key={j}>{line}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="flex items-center border-t border-dashed border-green-600 ">
        <span className="text-blue-400 mr-2">omondielvis@portfolio:~$</span>

        <div className="flex-1 relative flex ">
          <span>{input}</span>

          {/* cursor */}
          {!isPrinting && (
            <span
              className={`ml-1 w-2 h-5 bg-green-500 inline-block ${onFocus ? "animate-blink" : "bg-white"}`}
            />
          )}

          <input
            ref={inputRef}
            className="absolute top-0 left-0 w-full h-full opacity-0"
            type="text"
            value={input}
            onFocus={() => setOnfocus(true)}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {/* PRINTING CURSOR */}
      {isPrinting && (
        <span className={`ml-1 w-2 h-5 bg-green-500 inline-block `} />
      )}
    </div>
  );
}
