import { Route, Switch } from "wouter";
import Home from "@/pages/Home";
import Resources from "@/pages/Resources";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/resources" component={Resources} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
