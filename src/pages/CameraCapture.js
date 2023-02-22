import React, { useCallback, useRef, useState } from "react";
import {Button} from 'antd';
import Webcam from "react-webcam";
import  Login  from "./Login";
import '../index.css'

export const WebcamCapture = ({onNewCategory})=>{
  

  const [img, setImg] = useState(null);
  const [upload, setUpload] =useState('');
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 480,
    height: 720,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  const sendDataTo = () =>{
    // event.preventDefault();
    console.log(img)
    onNewCategory({img});

    setImg = null;
    
    // setUpload(setImg);
  }

  return (
    <div className="container_image">
      {img === null ? (
        <>
          <Webcam
            audio={false}
            mirrored={true}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className={"imagen_capture"}
          />
          <Button className="button_camera" type="primary" onClick={capture}>Tomar fotografia de Autenticacion</Button>
        </>
      ) : (
        <>
          <img src={img} alt="screenshot" />
          <Button onClick={() => setImg(null)} type="primary" danger>Retomar</Button>
          <br />
          <Button onClick={()=> sendDataTo()} type="primary">Adjuntar</Button>
        </>
      )}
    </div>
  );
}

// export default WebcamImage({sendDataTo});