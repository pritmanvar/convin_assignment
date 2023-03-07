import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cards from "./views/Cards";
import CreateCard from "./views/CreateCard";
function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Cards />} />
                    <Route path='/createcard' element={<CreateCard />} />
                    <Route path='/mycards' element={<Cards />} />
                    <Route path='/history' element={<Cards />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
