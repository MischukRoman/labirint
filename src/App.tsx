import React from 'react';
import Maze from "./components/Maze";
import {Provider} from "react-redux";
import {StoreType} from "./redux/configureStore";

interface IProps {
    store: StoreType
}
const App: React.FC<IProps> = ({store}) => {
    return (
        <Provider store={store}>
            <div className="App">
                <Maze />
            </div>
        </Provider>
    );
}

export default App;
