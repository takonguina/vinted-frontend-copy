import Hero from "../components/home/Hero";
import HomeWrapper from "../components/home/HomeWrapper";
import "./Home.css";
const Home = () => {
  return (
    <main className="home">
      <Hero />
      <HomeWrapper />
    </main>
  );
};
export default Home;
