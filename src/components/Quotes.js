import React, { useState, useEffect } from "react";
import { Button, Drawer, Space, List, message,Switch } from "antd";
import PropTypes from "prop-types";
import {PDF}  from "./Pdf";
//const para tomar la direccion del api cuando esta en linea o local
const API_HOST = process.env.REACT_APP_API_HOST || "http://localhost:8000";

export const Quotes = ({ quote, close }) => {
  const [dataQuote, setdataQuote] = useState([]);
  const [verPdf, setverPdf] = useState({visible:false,quoteData:'',data:''})

  const url = `http://127.0.0.1:8000/api/quote/1`;

  useEffect(() => {
    if (quote.isLoading) {
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            // ⬅️ verificamos que todo esté bien con la respuesta HTTP
            response.json().then(({ data }) => {
              setdataQuote(data); 
              quote.isLoading = false;
            });
          } else {
            message.error("Error");
          }
        })
        .catch((error) => {
          // ⬅️ hubo un problema que no permitió hacer la solicitud
          message.log("Error de red");
        });
    }
  }, []);
  
  return (
    <>
      <Drawer
        title={`Letter ${quote.id ? quote.id.name: "..."}`}
        placement="right"
        width={750}
        onClose={close}
        visible={quote.status}
        extra={
          <Space>
            <Button onClick={close}>Cancel</Button>
            <Button type="primary" onClick={close}>
              OK
            </Button>
          </Space>
        }
      >
        <List
          itemLayout="horizontal"
          dataSource={dataQuote}
          loading={quote.isLoading}
          renderItem={(item) => {
            let color;
            let border;
            

            if(item.status===1){
              color='rgba(23, 255, 0,.4)'
            border='1px solid #17FF00'}
            else if(item.status===0){color='rgba(250, 19, 0,.3)' 
            border='1px solid #C82A0E'}
            else{color='white'
            border='1px solid black'}

            return <List.Item 
            style={{background:color,border:border,height:'10vh',padding:10,marginTop:5,borderRadius:4}}
            actions={[<Button type='primary' onClick={()=>{setverPdf({visible:true,data:item})}}>View Quote</Button> ]}>
              <List.Item.Meta
                title={item.name}
                description={`${quote.id.reference} Port of load ${quote.id.pol}  Port of discharge ${quote.id.pod}`}
              />
            </List.Item>
          }}
        />
        {verPdf ? <PDF visible={verPdf} close={() => setverPdf(false)}/> : null}
      </Drawer>
    </>
  );
};

Quotes.propTypes = {
  close: PropTypes.func.isRequired,
};

Quotes.defaulProps = {
  quote: {},
  close: () => false,
};
