import React, { Component } from "react";

import CustomDialog from "../../../components/Dialog/CustomDialog.jsx";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import CustomButton from "../../../components/Button/CustomButton.jsx";
class AvatarDialog extends Component {

  constructor(props){
    super(props);

    let open = ((props.open === true || props.open === false) ? props.open : false);
    let file = props.file;

    this.state = {
      open: open,
      file: file
    };

    this.cropArea = React.createRef();
    this.cropImage = this.cropImage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.open) {
      let open = ((nextProps.open === true || nextProps.open === false) ? nextProps.open : false);
      this.setState({
        open: open
      });
    }

    if (nextProps.file !== this.state.file) {
      let file = nextProps.file;
      this.setState({
        file: file
      });
    }
  }

  cropImage () {
    if (this.props.cropFinish) {
      this.cropArea.current.cropper.getCroppedCanvas().toBlob(blob => {
        this.props.cropFinish(blob);
        this.setState({
          open: false
        });
      });
    }
  }

  render() {
    return (
      <CustomDialog open={this.state.open} title="Change Avatar">
        <Cropper
          src={this.state.file !== null ? URL.createObjectURL(this.state.file) : this.state.file}
          style={{ height: 400, width: "100%" }}
          initialAspectRatio={1}
          viewMode={1}
          dragMode={'crop'}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={false}
          ref={this.cropArea}
        />

        <div className="mt-3">
          <CustomButton onClick={this.cropImage} htmlType="button" className="button-primary mx-auto block">
            Crop Image & Upload
          </CustomButton>
        </div>
      </CustomDialog>
    );
  }

}

export default AvatarDialog;
