import { FaSearch, FaTags, FaStore, FaMoneyBillWave } from "react-icons/fa";
import '../styles/Service.css';

const services = [
  {
    icon: <FaSearch />,
    title: "Smart Search",
    description: "Search products using text or even images to get instant, relevant results tailored for you.",
  },
  {
    icon: <FaTags />,
    title: "Best Prices",
    description: "We compare prices from top vendors to make sure you always get the best deal available.",
  },
  {
    icon: <FaStore />,
    title: "Sell with Us",
    description: "Start selling your products easily on our platform and reach a wide audience.",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Totally Free",
    description: "Enjoy all features completely free—no subscriptions, no hidden fees, just pure value.",
  },
];

const Service = () => {
  return (
    <section className="services">
      <h2 className="services-title">Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;
