import { useEffect, useState, useRef } from "react";
import Card from "./Card";
const Data = Array.from({ length: 10000 }, (_, index) => index + 1);
export default function VirtualList() {
  const [indices, setIndices] = useState(0);
  const VisibleList = Data.slice(indices, indices + 20);
  const firstCardRef = useRef(null);
  const lastCardRef = useRef(null);
  useEffect(() => {
    const lastCardObserver = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          lastCardObserver.unobserve(e[0].target);
          loadmore();
        }
      },
      {
        root: null, // Scroll inside this div (like Instagram feed)
        rootMargin: "0px 0px 100px 0px", // Start loading a bit before bottom
        threshold: 0, // As soon as sentinel touches viewport
      }
    );
    const firstCardObserver = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          firstCardObserver.unobserve(e[0].target);
          scrollback();
        }
      },
      {
        root: null, // Scroll inside this div (like Instagram feed)
        rootMargin: "0px 0px 300px 0px", // Start loading a bit before bottom
        threshold: 0, // As soon as sentinel touches viewport
      }
    );
    if (firstCardRef.current) firstCardObserver.observe(firstCardRef.current);
    if (lastCardRef.current) lastCardObserver.observe(lastCardRef.current);
    return () => {
      lastCardObserver.disconnect();
      firstCardObserver.disconnect();
    };
  }, [VisibleList]);
  const loadmore = () => {
    setIndices((prev) => (prev += 10));
  };
  const scrollback = () => {
    if (indices === 0) return;
    setIndices((prev) => (prev -= 10));
  };
  return (
    <div
      style={{ height: "70vh", border: "1px solid black", overflow: "auto" }}
    >
      {VisibleList.map((item, index) => {
        return (
          <Card
            ref={
              index === 0
                ? firstCardRef
                : index === VisibleList.length - 1
                ? lastCardRef
                : null
            }
            key={item}
            name={item}
          />
        );
      })}
    </div>
  );
}
