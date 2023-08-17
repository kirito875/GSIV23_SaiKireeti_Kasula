import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import Detailspage from "./components/DetailsPage/Detailspage";
import Listpage from "./components/ListPage/Listpage";

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="*"  element={ <Navigate to="/listpage" />}/>
      <Route path="/listpage" Component={Listpage}/>
      <Route path="/detailspage" Component={Detailspage}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
