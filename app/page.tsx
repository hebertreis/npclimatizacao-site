import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Services from '@/components/Services'
import Diferenciais from '@/components/Diferenciais'
import Brands from '@/components/Brands'
import Portfolio from '@/components/Portfolio'
import ComoFunciona3DWrapper from '@/components/ComoFunciona3DWrapper'
import Testimonials from '@/components/Testimonials'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <ComoFunciona3DWrapper />
        <Diferenciais />
        <Brands />
        <Portfolio />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
