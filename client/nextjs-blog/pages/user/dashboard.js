import { useContext } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";

const Home = () => {
  const [state, setState] = useContext(UserContext);

  return (
    //we wrap UserRoute around user dashboard to protect user dashboard, the user can access to this page only and only if loged in and has a valid token (the token dosen't expired)
    <UserRoute> 
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="display-1 text-center">Dashboard page</h1>
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default Home;
