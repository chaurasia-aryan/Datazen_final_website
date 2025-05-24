import { Route, Switch } from "wouter";
import Home from "@/pages/Home";
// import Resources from "@/pages/Resources";
import NotFound from "@/pages/not-found";
import PixelCardExample from "./components/PixelCardExample";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* <Route path="/resources" component={Resources} /> */}
      <Route path="/pixel-cards" component={PixelCardExample} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
