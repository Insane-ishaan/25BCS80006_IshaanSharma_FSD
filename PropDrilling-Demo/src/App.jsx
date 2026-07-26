import DashBoard from "./DashbBoard";

function App() {
  const EmployeeInfo = {
    Emp: "Rahul Sharma",
    Dep: "Engineering",
    AvailBalance: "12 days",
  };

  return <div>
    <DashBoard empInfo={EmployeeInfo}/>
  </div>;
}

export default App;
