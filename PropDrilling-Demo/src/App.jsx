import DashBoard from "./DashbBoard";

function App() {
  const userInfo = {
    name: "Karan Mehta",
    email: "karan@gmail.com",
    program: "Web Development",
  };

  return (
    <div>
      <DashBoard userInfo={userInfo} />
    </div>
  );
}

export default App;
