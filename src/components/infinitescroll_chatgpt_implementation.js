import { useEffect, useRef, useState } from "react";

const ITEM_HEIGHT = 50;
const VISIBLE_COUNT = 12;

// Fake backend data source
const TOTAL_DATA = Array.from({ length: 100000 }, (_, i) => `Item ${i + 1}`);

export default function VirtualizedInfiniteList() {
  const [dataEnd, setDataEnd] = useState(20); // Start with 20 items available
  const [startIndex, setStartIndex] = useState(0);

  const containerRef = useRef(null);
  const sentinelRef = useRef(null);

  const visibleData = TOTAL_DATA.slice(0, dataEnd);
  const virtualizationSlice = visibleData.slice(
    startIndex,
    startIndex + VISIBLE_COUNT
  );

  const totalHeight = visibleData.length * ITEM_HEIGHT;

  // Virtualization Scroll Handler
  const handleScroll = () => {
    const scrollTop = containerRef.current.scrollTop;
    const newStartIndex = Math.floor(scrollTop / ITEM_HEIGHT);
    setStartIndex(newStartIndex);
  };

  // IntersectionObserver to load more data
  useEffect(() => {
    const container = containerRef.current;
    const sentinel = sentinelRef.current;

    if (!container || !sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // load next chunk (simulate delay)
          setTimeout(() => {
            setDataEnd((prev) => prev + 20);
          }, 300);
        }
      },
      {
        root: container,
        rootMargin: "0px 0px 200px 0px",
        threshold: 0,
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [visibleData]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        height: "60vh",
        overflowY: "auto",
        border: "1px solid black",
        position: "relative",
      }}
    >
      {/* Total height wrapper */}
      <div style={{ height: totalHeight, position: "relative" }}>
        {/* Only render visible items */}
        {virtualizationSlice.map((item, i) => {
          const index = startIndex + i;
          const top = index * ITEM_HEIGHT;

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                top,
                left: 0,
                right: 0,
                height: ITEM_HEIGHT,
                borderBottom: "1px solid #ccc",
                display: "flex",
                alignItems: "center",
                paddingLeft: "12px",
                background: "white",
              }}
            >
              {item}
            </div>
          );
        })}

        {/* Sentinel for infinite loading */}
        <div
          ref={sentinelRef}
          style={{
            position: "absolute",
            top: totalHeight - 20,
            height: 20,
            width: "100%",
            background: "transparent",
          }}
        />
      </div>
    </div>
  );
}
