import Header from "../../components/header/Header";
import CardTabs from "../../components/tabs/CardTabs";
import TabsSection from "../../components/sectionTabs/TabsSection.jsx";

const Home = () => {
  const homepageTabs = [
    { label: "Trending", content: <p>Welcome to the homepage overview 🚀</p> },
    { label: "Latest", content: <p>Here are the key features ⭐</p> },
    { label: "Recommended", content: <p>Get in touch with us 📩</p> },
  ];
  return (
    <div>
      <Header />
      <CardTabs tabs={homepageTabs} />
      <TabsSection />
    </div>
  );
};

export default Home;
