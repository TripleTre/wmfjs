import React from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";
import { Viewer } from "./views/Viewer";
import { Files } from "./views/Files";
import { TestCases } from "./views/TestCases";

function App() {
    return (
        <div>
            <HashRouter basename={"/"}>
                <Switch>
                    <Route path={"/meta-viewer/:fileName"}>
                        <Viewer/>
                    </Route>
                    <Route path={"/test-cases"}>
                        <TestCases/>
                    </Route>
                    <Route>
                        <Files/>
                    </Route>
                </Switch>
            </HashRouter>
        </div>
    );
}

export default App;
