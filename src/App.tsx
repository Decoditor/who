import { EndorsementProvider } from './contexts/endorsement';
import { Outlet } from 'react-router-dom';

function App() {
    return (
        <EndorsementProvider>
            <Outlet />
        </EndorsementProvider>
    )
}

export default App