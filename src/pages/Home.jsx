import Caruosel from "../components/Caruosel";
import CategorySection from "../components/CategorySection";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Recommendations from "../components/Recommendations";
import Service from "../components/Service";
import '../styles/ContactUs.css'

function Home() {
    return (
        <div className="home">
            <Caruosel />
            <Header title="Featured Categories" />
            <CategorySection />
            <Header title="Recommended for you" />
            <Recommendations />
            <div className="overlay">
                <Header title="Contact us" className="white-header" />
                <ContactUs />
            </div>
            <Service />
            <Footer/>
        </div>
    );
}

export default Home;