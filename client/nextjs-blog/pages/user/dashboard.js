import { useContext } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import Link from "next/link";

const Home = () => {
  const [state, setState] = useContext(UserContext);

  return (
    //we wrap UserRoute around user dashboard to protect user dashboard, the user can access to this page only and only if loged in and has a valid token (the token dosen't expired)
    <UserRoute>
      <div className="container">
        <div className="row">
          <div className="col float-start d-flex flex-column py-5 ">
            <h1 className="">
              {state &&
              state.user.profilePhoto &&
              state.user.profilePhoto.url ? (
                <div>
                  <img
                    className="h-50 w-50 rounded-circle"
                    src={state.user.profilePhoto.url}
                  />
                </div>
              ) : (
                <UserOutlined style={{ fontSize: '70px' }} />
              )}
            </h1>
            {/* <h6>@{state && state.user && state.user.username}</h6> */}
          </div>
          <div className="col ">
          
              <Link href="/user/profile/update" className="border">
                <a className=" text-dark float-end py-5 " >
                  Edit profile <EditOutlined />
                </a>
              </Link>
         
          </div>
        </div>
    
      <div className="row float-start">
        <div className="col">
          <h1 className="display-4 text-center">
            {state && state.user.name} <br/>
          <h6>  @{state && state.user.username}</h6>
          </h1>
        </div>
      </div>
      </div>
    </UserRoute>
  );
};

export default Home;
