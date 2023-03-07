import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cards from "./views/Cards";
import CreateCard from "./views/CreateCard";
import SignUp from "./views/SignUp";
import Login from "./views/Login";
function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Cards />} />
                    <Route path='/createcard' element={<CreateCard />} />
                    <Route path='/mycards' element={<Cards />} />
                    <Route path='/history' element={<Cards />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
