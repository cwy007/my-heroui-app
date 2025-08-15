
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import DefaultLayout from "@/layouts/default";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <HeroUIProvider>
//       <div className="w-screen h-screen p-8 flex items-start justify-center">
//         <App />
//       </div>
//     </HeroUIProvider>
//   </React.StrictMode>
// );

export default function MultiStepWizard() {
  return (
    <DefaultLayout>

      <div className="w-screen h-screen p-8 flex items-start justify-center">
        <App />
      </div>
    </DefaultLayout>
  );
}