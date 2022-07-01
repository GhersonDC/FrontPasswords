import { Modal, Col, Row } from "antd";
// import { useState } from 'react';

export const PDF = ({ visible, close }) => {
  return (
    <>
      <Modal
        title="Basic Modal"
        visible={visible}
        onCancel={close}
        centered
        width={"90vw"}
      >
        <div className="pdf-content">
          <Row>
            <Col span={24} className="col-Header">
              <img
                style={{ width: "20vw" }}
                src="https://g-global.com/wp-content/uploads/2022/03/Logo-gglobal.png"
              />
            </Col>
            <Col span={24} className="col-normal">
              Fecha: Fri Jun 17 2022 00:00:00 GMT-0700 (Pacific Daylight Time)
            </Col>
            <div className="double-col">
              <Col span={12} className="col-normal">
                COTIZACION G-TRANSPORT
              </Col>
              <Col span={12} className="col-normal">
                <p>Referencia Cliente</p> <br /> <p>6503</p>
              </Col>
            </div>
            <div className="four-col">
              <Col span={5} className="col-services">
                SERVICIOS LOCALES
              </Col>
              <Col span={5} className="col-services">
                PRECIO UNITARIO
              </Col>
              <Col span={5} className="col-services">
                IVA
              </Col>
              <Col span={5} className="col-services">
                DIVISA
              </Col>
              <Col span={5} className="col-services">
                TOTAL
              </Col>
            </div>
                <col span={24} className="col-services"></col>
                <div className="four-col">
              <Col span={5} className="col-services">
                SERVICIOS MARITIMOS
              </Col>
              <Col span={5} className="col-services">
                PRECIO UNITARIO
              </Col>
              <Col span={5} className="col-services">
                IVA
              </Col>
              <Col span={5} className="col-services">
                DIVISA
              </Col>
              <Col span={5} className="col-services">
                TOTAL
              </Col>
            </div>
            <col span={25} className="col-services"></col>
                <div className="four-col">
              <Col span={5} className="col-services">
                AAMX (GASTOS A CUENTA DE CLIENTE)
              </Col>
              <Col span={5} className="col-services">
                PRECIO UNITARIO
              </Col>
              <Col span={5} className="col-services">
                IVA
              </Col>
              <Col span={5} className="col-services">
                DIVISA
              </Col>
              <Col span={5} className="col-services">
                TOTAL
              </Col>
            </div>
            <col span={25} className="col-services"></col>
                <div className="four-col">
              <Col span={5} className="col-services">
                SERVICIOS TERRESTRES
              </Col>
              <Col span={5} className="col-services">
                PRECIO UNITARIO
              </Col>
              <Col span={5} className="col-services">
                IVA
              </Col>
              <Col span={5} className="col-services">
                DIVISA
              </Col>
              <Col span={5} className="col-services">
                TOTAL
              </Col>
            </div>
            
          </Row>
        </div>
      </Modal>
    </>
  );
};
