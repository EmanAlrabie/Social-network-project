import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../context";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import { UserOutlined, LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import AuthForm from "../../../components/forms/AuthForm";
import { useRouter } from "next/router";
import { route } from "next/dist/server/router";
import Avatar from "antd/lib/avatar/avatar";

export default function update() {
  const [state, setState] = useContext(UserContext);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  //profile photo
  const [profilePhoto, setProfilePhoto] = useState({});
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setName(state.user.name);
    setUsername(state.user.username);
    setAbout(state.user.about);
    setProfilePhoto(state.user.profilePhoto);
  }, [state && state.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put(`/profile-update`, {
        name,
        username,
        about,
        profilePhoto
      });
      console.log("update user: ", data);
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        //update user and keep token in local storage
        let auth = JSON.parse(localStorage.getItem("auth")); //Converts a JSON string into an object.
        auth.user = data;

        window.localStorage.setItem("auth", JSON.stringify(auth)); //Converts an object string into a JSON .

        setState({ ...state, user: data });

        setOk(true);
        setLoading(false);
        router.push("/user/dashboard");
      }
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData(); //we need FormData to send image to the cloudinary to store it.
    formData.append("image", file); // key: value


    try {
      const { data } = await axios.post("/upload-image", formData); //upload photo to cloudinary and retun the url

      setProfilePhoto({
        url: data.url,
        public_id: data.public_id
      });
      console.log("ProfilePhoto: ", profilePhoto);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row py-5 ">
          <div className="col text-center">
            <h1>Profile</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            {/* upload image */}
            <label className="d-flex justify-content-center h5">
              {profilePhoto && profilePhoto.url ? (
                <Avatar size={30} src={profilePhoto.url} className="mt-1" />
              ) : uploading ? (
                <LoadingOutlined className="mt-2" />
              ) : (
                <UserOutlined className="mt-2" />
              )}
              <input
                onChange={handleImage}
                type="file"
                accept="images/*"
                hidden
              />
            </label>
            <AuthForm
              profileUpdate={true}
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              username={username}
              setUsername={setUsername}
              about={about}
              setAbout={setAbout}
              profilePhoto={profilePhoto}
              handleImage={handleImage}
              loading={loading}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Modal
            title="Great!"
            visible={ok}
            onCancel={() => setOk(false)}
            footer={null}
          >
            <p>You have successfully update your profile!.</p>
            <Link href="/login">
              <a className="btn btn-primary btn-sm">Login</a>
            </Link>
          </Modal>
        </div>
      </div>
    </div>
  );
}
