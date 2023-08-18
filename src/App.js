import {Header,Footer} from "./components/index"
import { AllRoutes } from "./routes/AllRoutes";

import './App.css';

function App() {

  return (
    <div className="App">
      <Header />
      <main className="min-h-[70vh] dark:bg-slate-800 p-5">
        <AllRoutes/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
