import React, { useEffect, useState } from "react";
import {
  PageHeader,
  Button,
  Table,
  Modal,
  Tabs,
  Input,
  InputNumber,
  Space,
  Layout,
  message,
  Select,
} from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Header, Content } = Layout;
const { Option } = Select;

export const Formulario = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); //use State para el modal
  const [data, setData] = useState([]); //Use statePara obtener datos del api
  const [loading, setLoading] = useState(false);
  const [datos, setDatos] = useState({
    customerId: cookies.get('clientid'),
    address: cookies.get('address'),
    rfc: cookies.get('rfc'),
    email: cookies.get('email'),
    phone_number: cookies.get('telefono'),
    type_service: 0,
    reference: "",
    incoterm: 0,
    pickup_address: "",
    pol: 0,
    pod: 0,
    delivery_address: "",
    description: "",
    tariff: 0,
    type_packaging: "",
    volume: 0,
    weight: 0,
    cbm: "",
    quantity: 0,
    lenght: 0,
    width: 0,
    height: 0,
    special_description: "",
    type_equipment: 0,
  });
  const [ports,setPorts] = useState([]);
  const [location, setlocation] = useState([]);
  const [packaging, setpackaging] = useState([]);
  const [equipment, setEquipment] = useState([]);

  const API_HOST = process.env.REACT_APP_API_HOST || "http://localhost:8000";
  const url = `${API_HOST}/api/`;
  const token = cookies.get("token");

  //Fetch para getAll del api
  const getData = async () => {
    setLoading(true);
    const resp = await fetch(url+'clients/'+cookies.get('clientid'), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, //Agregado
      },
    });
    setLoading(false)

    const { data } = await resp.json();

    setData(data);
  };


  const getSelects = async (url, selects) => {
    const resp = await fetch(url+selects);
    const {data} = await resp.json();

    return data;
  }

  const getAll= async() =>{
    setPorts(await getSelects(url,'ports'));
    setlocation(await getSelects(url,'location'));
    setpackaging(await getSelects(url,'type_packaging'));
    setEquipment(await getSelects(url,'type_equipment'));
  }


  async function postData() {
    await fetch(url+'clients/', {
      method: "POST", 
      cache: "no-cache", 
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer", 
      body: JSON.stringify(datos), 
    })
      .then(async (response) => {
        // check for error response
        if (!response.ok) {
          console.log(datos);
          return Promise.reject("Error: Complete Correctly");
        } else if (response.ok) {
          message.success("Instruction Letter Created");
          resetDatos();
          getData();
          setIsModalVisible(false);
        }
      })
      .catch((error) => {
        message.error(error);
      });
  }

  const resetDatos= () =>{
    setDatos({customerId: cookies.get('clientid'),
    address: cookies.get('address'),
    rfc: cookies.get('rfc'),
    email: cookies.get('email')});
  }

  //
  const cerrarSesion = () => {
    cookies.remove("nombre", { path: "/" });
    cookies.remove("token", { path: "/" });
    cookies.remove("clientid", { path: "/" });
    cookies.remove("address", { path: "/" });
    cookies.remove("rfc", { path: "/" });
    cookies.remove("telefono", { path: "/" });
    cookies.remove("email", { path: "/" })
    window.location.href = "/";
  };

  useEffect(() => {
    getData();
    getAll();
    if (!cookies.get("nombre") && !cookies.get("clientid") && !cookies.get("address")) {
      window.location.href = "/";
    }
  }, []);

  //Funciones para desplegar el modal addInstructionLetter
  const showModal = () => {
    setIsModalVisible(true);
  };

  //funciones de botones dentro del modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //handles para datos
  const handleInputChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };
  const handleChange = (value, name) => {
    setDatos({
      ...datos,
      [name]: value,
    });
  };
  

  //Columnas que se mostraran en la tabla
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "1",
      fixed: 'left',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Service Type",
      dataIndex: "type_service",
      key: "2",
      width:'15%'
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "3",
    },
    {
      title: "Incoterm",
      dataIndex: "incoterm",
      key: "4",
    },
    {
      title: "Type Equipment",
      dataIndex: "type_equipment",
      key: "5",
    },
    {
      title: "POL",
      dataIndex: "pol",
      key: "6",
    },
    {
      title: "POD",
      dataIndex: "pod",
      key: "7",
    },
    {
      title: "Tariff",
      dataIndex: "tariff",
      key: "8",
    },
    {
      title: "Type packaging",
      dataIndex: "type_packaging",
      key: "9",
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "10",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "11",
    },
    {
      title: "Height",
      dataIndex: "height",
      key: "12",
    },
    {
      title: "Width",
      dataIndex: "width",
      key: "13",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "14",
    },
  ];
  return (
    <div className="form-menu">
      <Header>
        <h2>{cookies.get('nombre')}</h2>
        <Button
          style={{ position: "absolute", right: 15, top: 15 }}
          type="primary"
          icon={<LogoutOutlined />}
          onClick={cerrarSesion}
        >
          Log out
        </Button>
      </Header>
      <Content>
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            className="site-page-header"
            ghost={false}
            title="Instruction Letter"
            extra={[
              <Button key="6" type="primary" onClick={showModal}>
                Add Instruction Letter
              </Button>,
            ]}
          />
        </div>
        <div className="table-div">
          <Table key='table1' rowKey={(record) => record.id} loading={loading} dataSource={data} columns={columns} scroll={{ x: 2000, y:300 }} />
        </div>
        {/* Formulario Modal */}
        <Modal
          centered={true}
          destroyOnClose
          bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}
          title="Add Instruction Letter"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              close
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={postData}
              disabled={false}
            >
              Submit
            </Button>,
          ]}
          width={600}
        >
          <Tabs defaultActiveKey="5">
            <TabPane tab="Tipo de Servicio" key="5">
              <Space direction="vertical" style={{ display:'flex' }} size='middle'>
                <label>
                  Service Type<p>*</p>
                  <Select
                  showSearch
                    placeholder="Select Service Type"
                    style={{ width: '100%'}}
                    name="type_service"
                    onSelect={(event)=>handleChange(event,'type_service')}
                    filterOption={(input, option) => option.children.toUpperCase().includes(input.toUpperCase())}
                  >
                    <Option key='1' value="1">TERRESTRE</Option>
                    <Option key='2' value="2">MARITIMO</Option>
                    <Option key='3' value="3">DESPACHO ADUANAL/REGIMEN SI APLICA</Option>
                    <Option key='4' value="4">COMBINADO</Option>
                    <Option key='5' value="5">OTRO</Option>
                  </Select>
                </label>
                <label>
                  Reference<p>*</p>
                  <InputNumber
                    className="InputNumber"
                    placeholder="Reference"
                    name="reference"
                    onChange={(event)=>handleChange(event,'reference')}
                  />
                </label>
                <label>
                  Incoterm<p>*</p>
                  <Select
                  showSearch
                    placeholder="Select Incoterm"
                    name="incoterm"
                    style={{ width: '100%' }}
                    onSelect={(event)=>handleChange(event,'incoterm')}
                    filterOption={(input, option) => option.children.toUpperCase().includes(input.toUpperCase())}>
                    <Option key='1' value="EXW">EXW</Option>
                    <Option key='2' value="FCA">FCA</Option>
                    <Option key='3' value="CPT">CPT</Option>
                    <Option key='4' value="CIP">CIP</Option>
                    <Option key='5' value="DAP">DAP</Option>
                    <Option key='6' value="DPU">DPU</Option>
                    <Option key='7' value="DDP">DDP</Option>
                    <Option key='8' value="CFR">CFR</Option>
                    <Option key='9' value="FOB">FOB</Option>
                    <Option key='10' value="FAS">FAS</Option>
                    <Option key='11' value="CIF">CIF</Option>
                  </Select>
                </label>
                <label>
                  Type equipment<p>*</p>
                  <Select showSearch
                  optionFilterProp="children"
                  placeholder="Type Equipment"
                  name="equipment"
                  style={{ width: '100%' }}
                  onSelect={(event)=>handleChange(event,'type_equipment')}
                  filterOption={(input, option) => option.children.toUpperCase().includes(input.toUpperCase())}>
                    {equipment.map((option) => (
                      <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>
                      ))}
                    </Select>
                </label>
                <label>
                  Pickup Address<p>*</p>
                  <Select showSearch
                  optionFilterProp="children"
                  placeholder="Pickup Address"
                  name="Pickup Address"
                  style={{ width: '100%' }}
                  onSelect={(event)=>handleChange(event,'pickup_address')}
                  filterOption={(input, option) => option.children.toUpperCase().includes(input.toUpperCase())}>
                    {location.map((option) => (
                      <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>
                      ))}
                    </Select>
                </label>
                <label>
                Port of Load<p>*</p>
                  <Select
                  showSearch
                  placeholder="Select Port of Load"
                  name="pol"
                  style={{ width: '100%' }}
                  onSelect={(event)=>handleChange(event,'pol')}
                  filterOption={(input, option) => option.children.toUpperCase().includes(input.toUpperCase())}>
                     {ports.map((option) => (
                      <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>
                      ))}
                  </Select>
                </label>
                <label>
                Port of discharge<p>*</p>
                  <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="Select Port of discharge"
                  name="pol"
                  style={{ width: '100%' }}
                  onSelect={(event)=>handleChange(event,'pod')}
                  filterOption={(input, option) => option.children.toUpperCase().includes(input.toUpperCase())}>
                     {ports.map((option) => (
                      <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>
                      ))}
                  </Select>
                </label>
                <label>
                  Delivery Address<p>*</p>
                  <Select showSearch
                  optionFilterProp="children"
                  placeholder="Delivery Address"
                  name="pol"
                  style={{ width: '100%' }}
                  onSelect={(event)=>handleChange(event,'delivery_address')}
                  filterOption={(input, option) => option.children.toUpperCase().includes(input.toUpperCase())}>
                    {location.map((option) => (
                      <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>
                      ))}
                    </Select>
                </label>
              </Space>
            </TabPane>

            <TabPane tab="Mercancia" key="merchandise">
              <Space direction="vertical" style={{ width: "100%" }}>
                <label>
                  Description<p>*</p>
                  <Input
                    placeholder="Description"
                    name="description"
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Tariff Fraction<p>*</p>
                  <InputNumber
                    className="InputNumber"
                    placeholder="Tariff Fraction must be greater than 8"
                    name="tariff"
                    onChange={(event)=>handleChange(event,'tariff')}
                    maxLength={10}
                  />
                  
                </label>
                <label>
                  Packaging Type<p>*</p>
                  <Select showSearch
                  optionFilterProp="children"
                  placeholder="Type Packaging"
                  name="packaging"
                  style={{ width: '100%' }}
                  onSelect={(event)=>handleChange(event,'type_packaging')}
                  filterOption={(input, option) => option.children.toUpperCase().includes(input.toUpperCase())}>
                    {packaging.map((option) => (
                      <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>
                      ))}
                    </Select>
                </label>
                <label>
                  Volume<p>*</p>
                  <InputNumber
                    placeholder="Volume"
                    name="volume"
                    className='InputNumber'
                    onChange={(event)=>handleChange(event,'volume')}
                  />
                </label>
                <label>
                  Weight<p>*</p>
                  <InputNumber
                    placeholder="Net Weight"
                    name="weight"
                    onChange={(event)=>handleChange(event,'weight')}
                    className='InputNumber'
                  />
                </label>
                <label>
                  Cubic Meters<p>*</p>
                  <InputNumber
                    placeholder="Cubic Meters"
                    name="length"
                    onChange={(event)=>handleChange(event,'cbm')}
                    className='InputNumber'
                  />
                </label>
                <label>
                  Length<p>*</p>
                  <InputNumber
                    placeholder="Length"
                    name="length"
                    onChange={(event)=>handleChange(event,'length')}
                    className='InputNumber'
                  />
                </label>
                <label>
                  Width<p>*</p>
                  <InputNumber
                    placeholder="Width"
                    name="width"
                    onChange={(event)=>handleChange(event,'width')}
                    className='InputNumber'
                  />
                </label>
                <label>
                Height<p>*</p>
                  <InputNumber
                    placeholder="Height"
                    name="height"
                    onChange={(event)=>handleChange(event,'height')}
                    className='InputNumber'
                  />
                </label>
                <label>
                  Quantity
                  <InputNumber
                    placeholder="Quantity"
                    name="quantity"
                    onChange={(event)=>handleChange(event,'quantity')}
                    className='InputNumber'
                  />
                </label>
              </Space>
            </TabPane>

            <TabPane tab="Instrucciones Especiales" key="special_info">
              <TextArea rows={7} placeholder="Special Instructions" name="special_description" onChange={handleInputChange} />
            </TabPane>
          </Tabs>
        </Modal>
      </Content>
    </div>
  );
};
