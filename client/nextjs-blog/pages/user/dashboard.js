import { useContext } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import Link from "next/link";

const Home = () => {
  const [state, setState] = useContext(UserContext);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData(); //we need FormData to send image to the cloudinary to store it.
    formData.append("image", file); // key: value
    console.log([...formData]);

    try {
      const { data } = await axios.post("/upload-image", formData);

      setState({
        user: data.user,
      });
      console.log("state: ", state);
    } catch (err) {
      console.log(err);
    }
  };
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
              {state && state.user.photo ? (
                <div>
                  <img src={state.user.photo} />
                </div>
              ) : (
                " "
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
        <div className="row">
          <div className="col d-flex justify-content-center">
            <label className="text-muted">
              <UserOutlined />
              <input
                onChange={handleImage}
                type="file"
                accept="images/*"
                hidden
              />
              <button type="subnit">submit</button>
            </label>
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default Home;
