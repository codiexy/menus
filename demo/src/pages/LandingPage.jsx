
import NavBar from "../components/landingpage/nav-bar.component.jsx";
import HowItWorks from "../components/landingpage/how-it-works.component.jsx";
import Hero from "../components/landingpage/hero/hero.component";
import Form from "../components/landingpage/form/form.component";
import Footer from "../components/landingpage/footer/footer.component";
import Feature from "../components/landingpage/features/features";
import TabsContent from "../components/landingpage/toolsTabs/TabsContent";

import { themeOptions } from "../components/landingpage/theme";
import { ThemeProvider } from "@mui/material";



function LandingPage() {
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

export default LandingPage;
