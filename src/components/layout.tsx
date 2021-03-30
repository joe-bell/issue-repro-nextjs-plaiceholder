import * as React from "react";
import Link from "next/link";

export const Layout: React.FC<{ style?: any }> = (props) => (
  <>
    <header style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <Link href="/">
        <a>Back</a>
      </Link>
    </header>
    <main {...props} />
  </>
);
