import React, { useState, useEffect } from "react";
import { Button, Drawer, Space, List, message,Switch } from "antd";
import PropTypes from "prop-types";
import {PDF}  from "./Pdf";
//const para tomar la direccion del api cuando esta en linea o local
const API_HOST = process.env.REACT_APP_API_HOST || "http://localhost:8000";

export const Quotes = ({ quote, close }) => {
  const [dataQuote, setdataQuote] = useState([]);
  const [verPdf, setverPdf] = useState(false)

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
              console.log(data);
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
  }, [quote.isLoading]);

  return (
    <>
      <Drawer
        title={`Quote ${quote.id ? quote.id.name: "..."}`}
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
          renderItem={(item) => (
            <List.Item 
            actions={[<Button type='primary'>Descargar PDF</Button>,<p>Accept <Switch/></p>]}>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.localstotal}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
        {verPdf ? <PDF/> : null}
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
