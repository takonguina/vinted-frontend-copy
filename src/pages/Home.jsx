import Hero from "../components/home/Hero";
import HomeWrapper from "../components/home/HomeWrapper";
import "./Home.css";
const Home = ({ titleSearch, rangeValues, sort }) => {
  return (
    <main className="home">
      <Hero />
      <HomeWrapper
        titleSearch={titleSearch}
        rangeValues={rangeValues}
        sort={sort}
      />
    </main>
  );
};
export default Home;
