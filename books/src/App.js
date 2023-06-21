import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BookList from './components/booklist';
import BookDetails from './components/bookDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={BookList} />
        <Route path="/books/:id" component={BookDetails} />
      </Switch>
    </Router>
  );
}

export default App;
