export const grid = {
  display: "grid",
  gap: "1rem",
  height: "100vh",
  gridTemplateRows: "repeat(2, 1fr)",
  gridTemplateColumns: "repeat(3, 1fr)",
} as const;

export const gridItem = { position: "relative", overflow: "hidden" } as const;

export const gridItemPlaceholder = {
  display: "block",
  overflow: "hidden",
  position: "absolute",
  top: "0",
  left: "0",
  bottom: "0",
  right: "0",
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  margin: "0",
  filter: "blur(20px)",
  transform: "scale(1.2)",
} as const;
