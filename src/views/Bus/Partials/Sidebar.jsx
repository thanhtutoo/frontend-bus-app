import { Component } from "react";
import { Link } from "react-router-dom";

import AppUtil from "../../../AppUtil.jsx";
import ApiUtil from "../../../api/ApiUtil.jsx";
import AuthApi from "../../../api/AuthApi.jsx";

import cameraIcon from "../../../assets/img/profile/camera.png";
import lockIcon from "../../../assets/img/profile/lock.png";
import logoutIcon from "../../../assets/img/profile/logout.png";
import profileIcon from "../../../assets/img/profile/profile.png";

import { AuthContext } from "../../../components/Auth/AuthContext.jsx";
import Loading from "../../../components/Loading.jsx";
import defaultAvatar from "../../../assets/img/avatar.png";

import AvatarDialog from "./AvatarDialog.jsx";

class Sidebar extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    let image = defaultAvatar;
    this.state = {
      avatarOpenDialog: false,
      avatarFile: null,
      avatarImage: image,
      avatarLoading: false
    };

    this.browseImage = this.browseImage.bind(this);
  }

  logout(e) {
    e.preventDefault();
    e.stopPropagation();

    const { clearStorage } = this.context;
    clearStorage();

    window.location.replace("/sign-in");
  }

  browseImage (e) {
    e.preventDefault();
    e.stopPropagation();
    this.refs.imageRef.click();
  }

  handleAvatarChange (e) {
    this.setState({
      avatarOpenDialog: true,
      avatarFile: e.target.files[0]
    });
  }

  handleCropFinish (file) {
    let user = AppUtil.getUser();
    let formData = new FormData();

    formData.append("picture", file);
    formData.append("picture_name", this.state.avatarFile.name);
    formData.append("folder_name", user.id !== undefined ? String(user.id) : "0");

    this.setState({
      avatarLoading: true
    });

    ApiUtil.callFormData("upload", formData, "post").then(result => {
      if (result.status !== 200 || result.data === undefined) {
        this.setState({
          avatarLoading: false
        });
        AppUtil.toast("Upload image error, please try again", "error");
        return false;
      }

      let userDataDetails = JSON.parse(user.extra_details);
      if (result.data.data.result.image_big_url !== undefined) {
        userDataDetails['image_big'] = result.data.data.result.image_big_url;
      }

      if (result.data.data.result.image_medium_url !== undefined) {
        userDataDetails['image_medium'] = result.data.data.result.image_medium_url;
      }

      if (result.data.data.result.image_small_url !== undefined) {
        userDataDetails['image_small'] = result.data.data.result.image_small_url;
      }

      AuthApi.updateAccount(user.id, {
        extra_details: JSON.stringify(userDataDetails)
      }).then(result => {
        if (result.data.status === 200) {
          window.localStorage.setItem("user", JSON.stringify(result.data.data));
          AppUtil.toast("Avatar changed.", "success");
          window.location.reload();
        } else {
          AppUtil.toast("Submit error, please try again.", "error");
        }
        this.setState({
          avatarLoading: false
        });
      }, (error, type) => {
        console.log("error", error);
        AppUtil.toast("Something went wrong, please try again.", "error");
        this.setState({
          loading: false
        });
      });
    }).catch(error => {
      console.log(error);
      this.setState({
        avatarLoading: false
      });
      AppUtil.toast("Something went wrong, please try again", "error");
      return false;
    });
  }

  render () {
    return (
      <div className="h-full px-20 py-14 bg-white">
        { 
          this.state.avatarLoading ?
          <Loading text="Uploading Image..." /> : ""
        }
        <div className="mb-10 relative block mx-auto w-5/12">
          <img src={this.state.avatarImage} alt="" className="rounded-full" />
          <input 
            type="file" 
            id="avatarFile" 
            ref="imageRef"
            style={{display: 'none'}}
            accept="image/*"
            onChange={(event)=> { 
              this.handleAvatarChange(event);
            }}
            onClick={(event)=> { 
              event.target.value = null
            }}
          />
          <button className="absolute p-3 bg-gray-200 rounded-full -bottom-2 right-2 hover:shadow-md hover:bg-gray-300 transition-all w-10" onClick={(e) => this.browseImage(e)}>
            <img src={cameraIcon} alt="" className="block mx-auto" />
          </button>
        </div>

        <div className="mb-10">
          <div className="block p-3">
            <Link to="#" className={"text-black " + (this.props.active === "profile" ? " font-bold" : "")}>
              <img src={profileIcon} alt="" className="inline-block mr-2 w-7 align-middle" /> My Profile
            </Link>
          </div>

          <div className="block p-3">
            <Link to="#" className={"text-black " + (this.props.active === "change-password" ? " font-bold" : "")}>
              <img src={lockIcon} alt="" className="inline-block mr-2 w-7 align-middle" /> New Service
            </Link>
          </div>

          {/*<div className="block p-3">
            <Link to="/quote-list" className={"text-black " + (this.props.active === "quote-list" ? " font-bold" : "")}>
              <img src={folderIcon} alt="" className="inline-block mr-2 w-7 align-middle" /> Quote List
            </Link>
          </div>*/}

          <div className="block p-3">
            <Link to="#" onClick={(e) => this.logout(e)} className="text-black">
              <img src={logoutIcon} alt="" className="inline-block mr-2 w-7 align-middle" /> Sign Out
            </Link>
          </div>
        </div>

        <AvatarDialog
          cropFinish={(file) => this.handleCropFinish(file)}
          open={this.state.avatarOpenDialog}
          file={this.state.avatarFile}
        />
      </div>
    );
  }

}

export default Sidebar;