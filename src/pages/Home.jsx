import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import MainShowcaseSection from "../components/MainShowcaseSection";
import SummaryHighlight from "../components/SummaryHighlight";
import ProjectImages from "../components/ProjectImages";
import FeatureSection from "../components/FeatureSection";
import TroubleShootingSection from "../components/TroubleShootingSection";
import MyRoleSection from "../components/MyRoleSection";
import ResultSection from "../components/ResultSection";
import LinuxProjectSection from "../components/LinuxProjectSection";
import DesignWorksSection from "../designWorks/DesignWorksSection";

function Home() {
  return (
    <>
      <Header />

      <section id="dev">
        <HeroSection />
        <MainShowcaseSection />
        <SummaryHighlight />
        <ProjectImages />
        <FeatureSection />
        <TroubleShootingSection />
        <MyRoleSection />
        <ResultSection />
      </section>

      <section id="server">
        <h2 className="section-divider">Additional Project</h2>
        <h2 className="section-divider">INFRA / SECURITY PROJECT</h2>
        <LinuxProjectSection />
      </section>

      <section id="design">
        <DesignWorksSection />
      </section>
    </>
  );
}

export default Home;