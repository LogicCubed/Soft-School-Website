"use client";

import dynamic from "next/dynamic";

const App = dynamic(() => import("./app"), { ssr: false });

const AppClient = () => {
  return <App />;
};

export default AppClient;
