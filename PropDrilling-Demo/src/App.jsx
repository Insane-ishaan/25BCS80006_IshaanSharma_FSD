import DashBoard from "./DashbBoard";

function App() {
  const userInfo = {
    name: "Karan Mehta",
    email: "karan@gmail.com",
    program: "Web Development",
  };

  const courseList = [
    "React Bascs 999/-",
    "Node.js Essential  1199/-",
    "UI/UX Design 799/-",
  ];

  return (
    <div>
      <DashBoard userInfo={userInfo} courseList={courseList} />
    </div>
  );
}

export default App;
