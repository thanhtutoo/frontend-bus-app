import { toast } from "react-toastify";

import { ThumbUpIcon, ShieldExclamationIcon, XCircleIcon } from "@heroicons/react/solid";

const AppUtil = {

  toast: (text = "", type = "", autoClose = 5000, layout = null, position = "top-center") => {
    let options = {
      position: position,
      autoClose: autoClose,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: false,
    };

    if(!layout){
      layout = <div>
        <span>
          {type === "success" ? <ThumbUpIcon className="h-5 w-5 text-green-500 inline-block mr-2" /> : ""}
          {type === "info" ? <ShieldExclamationIcon className="h-5 w-5 text-blue-500 inline-block mr-2" /> : ""}
          {type === "warning" ? <ShieldExclamationIcon className="h-5 w-5 text-yellow-500 inline-block mr-2" /> : ""}
          {type === "error" ? <XCircleIcon className="h-5 w-5 text-red-500 inline-block mr-2" /> : ""}
          {text}
        </span>
      </div>;
    }

    toast.dark(layout, options);
  },

  getUser: () => {
    let userStorage = window.localStorage.getItem("user");
    return JSON.parse(userStorage);
  },

  getQuery: (param) => {
    return (window.location.search.match(new RegExp('[?&]' + param + '=([^&]+)')) || [null])[1];
  }

}

export default AppUtil;
