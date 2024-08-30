import "./Hero.css";
const Hero = () => {
  return (
    <main className="home-hero">
      <img className="home-hero-forme" src="/tear.svg" alt="" />
      <div>
        <div className="home-hero-ready">
          Prêts à faire du tri dans vos placards ?
          <button>Commencer à vendre</button>
        </div>
      </div>
    </main>
  );
};
export default Hero;
