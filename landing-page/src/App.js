import "./App.css";
import { themeOptions } from "./theme";
import { ThemeProvider } from "@mui/material";
import NavBar from "./components/nav-bar.component.jsx";
import HowItWorks from "./components/how-it-works.component.jsx";
import Hero from "./components/hero/hero.component";
import Form from "./components/form/form.component";
import Footer from "./components/footer/footer.component";
import Feature from "./components/features/features";
import TabsContent from "./components/toolsTabs/TabsContent";



function App() {
  return (
    <ThemeProvider theme={themeOptions}>
      <NavBar />
      <Hero />
      <TabsContent />
      <Feature />
      <HowItWorks />
      <Form />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
