import React from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";
import { Viewer } from "./views/Viewer";
import { Files } from "./views/Files";

function App() {
    return (
        <div>
            <HashRouter basename={"/"}>
                <Switch>
                    <Route path={"/files"}>
                        <Files/>
                    </Route>
                    <Route path={"/meta-viewer/:fileName"}>
                        <Viewer/>
                    </Route>
                </Switch>
            </HashRouter>
        </div>
    );
}

export default App;
