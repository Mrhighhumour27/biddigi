import Site from "./redesign/Site";

export function App({ pathname = "/" }: { pathname?: string }) {
  return <Site pathname={pathname} />;
}

export default App;
