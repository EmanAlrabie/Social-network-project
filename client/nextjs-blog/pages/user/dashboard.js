import { useContext } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import Link from "next/link";

const Home = () => {
  const [state, setState] = useContext(UserContext);

  
  return (
    //we wrap UserRoute around user dashboard to protect user dashboard, the user can access to this page only and only if loged in and has a valid token (the token dosen't expired)
    <UserRoute>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="display-1 text-center">
              Name: {state && state.user.name}
              {state && state.user.username}
            </h1>
            <h1 className="display-1 text-center">
              Photo:{" "}
              {state && state.user.profilePhoto && state.user.profilePhoto.url ? (
                <div>
                  <img className="h-25 w-50 rounded-circle" src={state.user.profilePhoto.url} />
                </div>
              ) : (
                <UserOutlined />
              )}
            </h1>
          </div>
          <div className="col">
            <div>
              <Link href="/user/profile/update">
                <a className=" text-dark d-flex justify-content-end py-5 ">
                  Edit profile
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default Home;
