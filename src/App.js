import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './pages/index';

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
