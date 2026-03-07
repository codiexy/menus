'use client';
import { ThemeProvider } from "@mui/material";
import TabsContent from '@/components/landingpage/toolsTabs/TabsContent';
import Feature from '@/components/landingpage/features/features';
import ProductHowItWorks from '@/components/landingpage/HowIsItWorkComponent';
import Form from '@/components/landingpage/form/form.component';
import Footer from '@/components/landingpage/footer/footer.component';
import Hero from '@/components/landingpage/hero/hero.component';
import landingThemeOptions from "@/components/landingpage/theme";
import "@/styles/home.styles.css";
import MainHeader from "@/components/landingpage/header/MainHeader";

export default function Home() {

  return (
    <ThemeProvider theme={landingThemeOptions}>
      <MainHeader />
      <Hero />
      <TabsContent />
      <Feature />
      <ProductHowItWorks />
      <Form />
      <Footer />
    </ThemeProvider>

  )
}
