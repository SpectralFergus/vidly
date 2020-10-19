import React from "react";
import "./App.css";
import Movies from "./components/movies";
import Pagination from "./components/common/pagination";

function App() {
  return (
    <main className="container">
      <Movies />
    </main>
  );
}

export default App;
