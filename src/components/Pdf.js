import { Modal, Col, Row, Spin,Button,message } from "antd";
import { useState, useEffect } from "react";
import { LoadingOutlined } from '@ant-design/icons';

const API_HOST = process.env.REACT_APP_API_HOST || "http://localhost:8000";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

export const PDF = ({ visible, close }) => {
  const [loading, setLoading] = useState(true);
  const [locals, setlocals] = useState();
  const [maritime, setmaritime] = useState();
  const [land, setland] = useState();
  const [aamx, setaamx] = useState();
  const [totals] = useState({
    local: 0,
    maritime: 0,
    land: 0,
    aamx: 0,
  });

  const url = `${API_HOST}/api/`;

  async function getSelects (url, selects) {
    const resp = await fetch(`${url}${selects}/${visible.data.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, //Agregado
      },
    });
    const { data } = await resp.json();

    return data;
  };

  async function getAll (){
    setlocals(await getSelects(url, "locals"));
    setmaritime(await getSelects(url, "maritime"));
    setland(await getSelects(url, "land"));
    setaamx(await getSelects(url, "aamx"));
  };

  useEffect(() => {
    getAll();
  }, []);

  const setTotals = () => {
    locals.forEach(function (a) {
      totals.local += a.total;
    });
    maritime.forEach(function (a) {
      totals.maritime += a.total;
    });
    land.forEach(function (a) {
      totals.land += a.total;
    });
    aamx.forEach(function (a) {
      totals.aamx += a.total;
    });
    console.log(locals)
  };

  useEffect(() => {
    if ((locals, land, maritime, aamx)) {
      setTotals();
      setLoading(false)
    }
  }, [aamx]);

  async function acceptQuote(status) {
    await fetch(`${url}quote/${visible.data.id}`, {
      method: "PUT",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({status:status}),
    })
      .then(async (response) => {
        // check for error response
        if (!response.ok) {
          // console.log(datos);
          return Promise.reject("Error: Complete Correctly");
        } else if (response.ok) {
          message.success("Quote updated");
        }
      })
      .catch((error) => {
        message.error(error);
      });
  }

  return (
    <>
      <Modal
        title="Quote"
        visible={visible.visible}
        onCancel={close}
        centered
        width={"50vw"}
        bodyStyle={{ overflowY: "scroll", maxHeight: "calc(100vh - 200px)"}}
        footer={[
          <Button key="back" type="primary" onClick={()=>(acceptQuote(0))} danger>
            Reject Quote
          </Button>,
          <Button key="submit" type="primary" onClick={()=>(acceptQuote(1))}>
            Accept Quote
          </Button>
        ]}
      >
        <Spin spinning={loading} tip='Loading...' indicator={antIcon} >
          {totals.aamx ? <div className="pdf-content">
            <Row>
              <Col span={24} className="col-Header">
                <img
                  style={{ width: "15vw" }}
                  src="https://g-global.com/wp-content/uploads/2022/03/Logo-gglobal.png"
                />
              </Col>
              <Col span={24} className="col-normal">
                Fecha: {visible.data.date} (Pacific Daylight Time)
              </Col>
              <div className="double-col">
                <Col span={12} className="col-normal">
                  COTIZACION G-TRANSPORT
                </Col>
                <Col span={12} className="col-normal">
                  Referencia Cliente <br /> {localStorage.getItem('nombre')}
                </Col>
              </div>
              <div className="four-col">
                <Col span={7} className="col-services">
                  SERVICIOS LOCALES
                </Col>
                <Col span={4} className="col-services">
                  PRECIO UNITARIO
                </Col>
                <Col span={4} className="col-services">
                  IVA
                </Col>
                <Col span={4} className="col-services">
                  DIVISA
                </Col>
                <Col span={5} className="col-services">
                  TOTAL
                </Col>
              </div>
              {locals
                ? locals.map((option) => (
                    <div className="four-col-printed" key={option.id}>
                      <Col span={7} className="col-services">
                        <div className="material">{option.materialEs}</div>
                      </Col>
                      <Col span={4} className="col-services">
                      ${option.unitPrice}
                      </Col>
                      <Col span={4} className="col-services">
                        {option.iva}
                      </Col>
                      <Col span={4} className="col-services">
                        USD
                      </Col>
                      <Col span={5} className="col-services">
                      ${option.total}
                      </Col>
                    </div>
                  ))
                : null}

              <div className="four-col">
                <Col span={5} className="col-services"></Col>
                <Col span={5} className="col-services"></Col>
                <Col span={5} className="col-services"></Col>
                <Col span={5} className="col-services">
                  TOTAL
                </Col>
                <Col span={5} className="col-services">
                ${totals.local}
                </Col>
              </div>
                <Col span={24} style={{background:'#0068ff',height:"1.5vh"}}></Col>
              <div className="four-col">
                <Col span={7} className="col-services">
                  SERVICIOS MARITIMOS
                </Col>
                <Col span={4} className="col-services">
                  PRECIO UNITARIO
                </Col>
                <Col span={4} className="col-services">
                  IVA
                </Col>
                <Col span={4} className="col-services">
                  DIVISA
                </Col>
                <Col span={5} className="col-services">
                  TOTAL
                </Col>
              </div>
              {maritime
                ? maritime.map((option) => (
                    <div className="four-col-printed" key={option.id}>
                      <Col span={7} className="col-services">
                      <div className="material">{option.materialEs}</div>
                      </Col>
                      <Col span={4} className="col-services">
                        ${option.unitPrice}
                      </Col>
                      <Col span={4} className="col-services">
                        {option.iva}
                      </Col>
                      <Col span={4} className="col-services">
                        USD
                      </Col>
                      <Col span={5} className="col-services">
                        ${option.total}
                      </Col>
                    </div>
                  ))
                : null}

              <div className="four-col">
                <Col span={5} className="col-services"></Col>
                <Col span={5} className="col-services"></Col>
                <Col span={5} className="col-services"></Col>
                <Col span={5} className="col-services">
                  TOTAL
                </Col>
                <Col span={5} className="col-services">
                ${totals.maritime}
                </Col>
              </div>
              <Col span={24} style={{background:'#0068ff',height:"1.5vh"}}></Col>
              <div className="four-col">
                <Col span={7} className="col-services">
                  AAMX (GASTOS A CUENTA DE CLIENTE)
                </Col>
                <Col span={4} className="col-services">
                $PRECIO UNITARIO
                </Col>
                <Col span={4} className="col-services">
                  IVA
                </Col>
                <Col span={4} className="col-services">
                  DIVISA
                </Col>
                <Col span={5} className="col-services">
                $TOTAL
                </Col>
              </div>
              {aamx
                ? aamx.map((option) => (
                    <div className="four-col-printed" key={option.id}>
                      <Col span={7} className="col-services">
                      <div className="material">{option.materialEs}</div>
                      </Col>
                      <Col span={4} className="col-services">
                      ${option.unitPrice}
                      </Col>
                      <Col span={4} className="col-services">
                        {option.iva}
                      </Col>
                      <Col span={4} className="col-services">
                        USD
                      </Col>
                      <Col span={5} className="col-services">
                      ${option.total}
                      </Col>
                    </div>
                  ))
                : null}
              <div className="four-col">
                <Col span={5} className="col-services"></Col>
                <Col span={5} className="col-services"></Col>
                <Col span={5} className="col-services"></Col>
                <Col span={5} className="col-services">
                  TOTAL
                </Col>
                <Col span={5} className="col-services">
                ${totals.aamx}
                </Col>
              </div>
              <Col span={24} style={{background:'#0068ff',height:"1.5vh"}}></Col>
              <div className="four-col">
                <Col span={7} className="col-services">
                  SERVICIOS TERRESTRES
                </Col>
                <Col span={4} className="col-services">
                PRECIO UNITARIO
                </Col>
                <Col span={4} className="col-services">
                  IVA
                </Col>
                <Col span={4} className="col-services">
                  DIVISA
                </Col>
                <Col span={5} className="col-services">
                  TOTAL
                </Col>
              </div>
              {land
                ? land.map((option) => (
                    <div className="four-col-printed" key={option.id}>
                      <Col span={7} className="col-services">
                      <div className="material">{option.materialEs}</div>
                      </Col>
                      <Col span={4} className="col-services">
                      ${option.unitPrice}
                      </Col>
                      <Col span={4} className="col-services">
                        {option.iva}
                      </Col>
                      <Col span={4} className="col-services">
                        USD
                      </Col>
                      <Col span={5} className="col-services">
                      ${option.total}
                      </Col>
                    </div>
                  ))
                : null}
              <div className="four-col">
                <Col span={5} className="col-services"></Col>
                <Col span={5} className="col-services"></Col>
                <Col span={5} className="col-services"></Col>
                <Col span={5} className="col-services">
                  TOTAL
                </Col>
                <Col span={5} className="col-services">
                ${totals.land}
                </Col>
              </div>
              <div className="total-col">
                <Col span={8} className="col-services">
                  TOTAL USD
                </Col>
                <Col span={8} className="col-services">
                  USD
                </Col>
                <Col span={8} className="col-services">
                  ${parseFloat(totals.local+totals.land+totals.aamx+totals.maritime)}
                </Col>
              </div>
              <div className="total-col-white">
                <Col span={8} className="col-services">
                  COSTO DE OPERACION
                </Col>
                <Col span={8} className="col-services"></Col>
                <Col span={8} className="col-services"></Col>
              </div>
              <div className="total-col-white">
                <Col span={8} className="col-services">
                  ANTICIPO
                </Col>
                <Col span={8} className="col-services">
                  $
                </Col>
                <Col span={8} className="col-services"></Col>
              </div>
              <div className="total-col">
                <Col span={8} className="col-services">
                  TOTAL MXN(CUENTA CLIENTE)
                </Col>
                <Col span={8} className="col-services">
                  MXN
                </Col>
                <Col span={8} className="col-services">
                  $$$
                </Col>
              </div>
              <Col span={12} style={{ padding: 15 }}>
                Important. This rate is valid for GENERAL CARGO This rate is
                valid per container This rate is valid for non-overweight and
                non oversized containers. This rate is valid for merchandise
                according to the data provided for quotation purposes. This rate
                generates +8% VAT This rate is valid as of JUNE 19, 2022
                (subject to fuel and highway surcharges) This rate INCLUDES
                Highways and toll roads in sections necessary for securityand
                mobility issues. Operators with radio communication and 24-hour
                monitoring. 6 free hours for loading (for the 2 containers in
                case of full load) 6 free hours for unloading at final
                destination (for the 2 containers in case of full load). This
                rate DOES NOT INCLUDE Transport insurance for the goods and for
                the empty container. Loading and/or unloading maneuvers of the
                goods. Maneuvers of taking and/or unloading of the empty
                container at the port terminal. c Weighing maneuvers for VGM
                Stays charge per 6 hours if generated: 240 USD per container.
                The additional demurrage charge is considered for each
                additional hour after the free time and is quoted per event,
                i.e. at the time of generation. Additional costs. Demurrage :
                240 USD per container per day. DAY RUN: 100 % of the service
                Cancellation without anticipation: 80% of the total service cost
                Rescheduling without anticipation: 100 % of the total service.
                This quote is an approximate, may varyupon invoicing.
              </Col>
              <div className="double-col-white" style={{ height: "6vh" }}>
                <Col span={12} className="col-normal">
                  ELABORADO POR
                </Col>
                <Col span={12} className="col-normal">
                  DANAHE CONTRERAS
                </Col>
              </div>
              <div className="col-footer">
                <Col span={14} className="col-normal"></Col>
                <Col span={10} className="col-normal">
                  G-TMS <br />
                  Telefono: (664) 380 5018 <br />
                  Correo: g-transport@g-global.com
                  <br />
                  Visita nuestra pagina: g-global.com
                </Col>
              </div>
            </Row>
         </div>:<div style={{textAlign:'center',height:'10vh'}}></div>}
        </Spin> 
      </Modal>
    </>
  );
};
