import React, { useCallback, useRef, useState } from "react";
import {Button} from 'antd';
import Webcam from "react-webcam";
import { Register } from "./Register";
import '../index.css'

export const WebcamCapture = ({sendDataTo})=>{
  

  const [img, setImg] = useState(null);
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

  const [imageIsSet, setimageIsSet] = React.useState(false);

  const setImage = (imageIsSet) => {
    console.log(imageIsSet)
    setimageIsSet(imageIsSet);
  };
  
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
          {
            imageIsSet=== null ?  
            (<Button onClick={()=> sendDataTo(img)} type="primary">Adjuntar</Button>)
            :
            (<Button type="primary">Agregar a collection</Button>)
          }
        </>
      )}
    </div>
  );
}