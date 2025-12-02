import { useState, useEffect } from "react";
import { MoveUp } from "lucide-react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-yellow-500 text-black rounded-full shadow-lg hover:bg-yellow-400 hover:scale-110 transition-transform z-50"
          aria-label="Scroll to top"
        >
          <MoveUp className="w-full h-8" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;