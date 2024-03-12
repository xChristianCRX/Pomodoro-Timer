import { Routes, Route} from "react-router-dom"

import { Home } from "./pages/Home";
import { History } from "./pages/History/history";
import { DefaultLayout } from "./layouts/DefaultLayout";

export function Router(){
    return(
        <Routes>
            <Route path="/" element={<DefaultLayout/>}>
                <Route path="/" element={<Home />}></Route>
                <Route path="/history" element={<History />}></Route>
            </Route>
        </Routes>
    );
}