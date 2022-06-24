import React, { useEffect, useState, useRef } from "react";
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
  Form,
  Pagination,
} from "antd";
import { LogoutOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const { TabPane } = Tabs;
const { Header, Content } = Layout;
const { Option } = Select;
const API_HOST = process.env.REACT_APP_API_HOST || "http://localhost:8000";

export const Formulario = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); //use State para el modal
  const [data, setData] = useState([]); //Use statePara obtener datos del api
  const [loading, setLoading] = useState(false);
  const [datos, setDatos] = useState({
    customerId: cookies.get("clientid"),
    address: cookies.get("address"),
    rfc: cookies.get("rfc"),
    email: cookies.get("email"),
    phone_number: cookies.get("telefono"),
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
  const [ports, setPorts] = useState([]);
  const [location, setlocation] = useState([]);
  const [packaging, setpackaging] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [form] = Form.useForm();

  const searchInput = useRef(null);

  const url = `${API_HOST}/api/`;
  const token = cookies.get("token");

  //Fetch para getAll del api
  const getData = async () => {
    setLoading(true);
    const resp = await fetch(url + "clients/" + cookies.get("clientid"), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, //Agregado
      },
    });
    setLoading(false);

    const { data } = await resp.json();

    setData(data);
  };

  const getSelects = async (url, selects) => {
    const resp = await fetch(url + selects);
    const { data } = await resp.json();

    return data;
  };

  const getAll = async () => {
    setPorts(await getSelects(url, "ports"));
    setlocation(await getSelects(url, "location"));
    setpackaging(await getSelects(url, "type_packaging"));
    setEquipment(await getSelects(url, "type_equipment"));
  };

  async function postData() {
    await fetch(url + "clients", {
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
        message.error(error + '🥲')
      });
  }

  const resetDatos = () => {
    setDatos({
      customerId: cookies.get("clientid"),
      address: cookies.get("address"),
      rfc: cookies.get("rfc"),
      email: cookies.get("email"),
    });
    form.resetFields();
  };

  //
  const cerrarSesion = () => {
    cookies.remove("nombre", { path: "/" });
    cookies.remove("token", { path: "/" });
    cookies.remove("clientid", { path: "/" });
    cookies.remove("address", { path: "/" });
    cookies.remove("rfc", { path: "/" });
    cookies.remove("telefono", { path: "/" });
    cookies.remove("email", { path: "/" });
    window.location.href = "/";
  };

  useEffect(() => {
    getData();
    getAll();
    if (
      !cookies.get("nombre") &&
      !cookies.get("clientid") &&
      !cookies.get("address")
    ) {
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
  //Buscador filtrado
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const onFinishFailed = () => {
    message.error('Required inputs incomplete')
  };

  //Columnas que se mostraran en la tabla
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "1",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.id - b.id,
      ...getColumnSearchProps("id"),
    },
    {
      title: "Service Type",
      dataIndex: "type_service",
      key: "2",
      width: "15%",
      ...getColumnSearchProps("type_service"),
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "3",
      ...getColumnSearchProps("reference"),
    },
    {
      title: "Incoterm",
      dataIndex: "incoterm",
      key: "4",
      ...getColumnSearchProps("incoterm"),
    },
    {
      title: "Type Equipment",
      dataIndex: "type_equipment",
      key: "5",
      ...getColumnSearchProps("type_equipment"),
    },
    {
      title: "POL",
      dataIndex: "pol",
      key: "6",
      ...getColumnSearchProps("pol"),
    },
    {
      title: "POD",
      dataIndex: "pod",
      key: "7",
      ...getColumnSearchProps("pod"),
    },
    {
      title: "HS Code",
      dataIndex: "tariff",
      key: "8",
      ...getColumnSearchProps("tariff"),
    },
    {
      title: "Type packaging",
      dataIndex: "type_packaging",
      key: "9",
      ...getColumnSearchProps("type_packaging"),
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "10",
      ...getColumnSearchProps("volume"),
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "11",
      ...getColumnSearchProps("weight"),
    },
    {
      title: "Height",
      dataIndex: "height",
      key: "12",
      ...getColumnSearchProps("height"),
    },
    {
      title: "Width",
      dataIndex: "width",
      key: "13",
      ...getColumnSearchProps("width"),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "14",
      ...getColumnSearchProps("quantity"),
    },
  ];
  return (
    <div className="form-menu">
      <Header>
        <h2>{cookies.get("nombre")}</h2>
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
          <Table key='table1' rowKey={(record) => record.id} loading={loading} dataSource={data} columns={columns} scroll={{ x: 2000, y:1000 }} 
          pagination={{ defaultPageSize: 10,showQuickJumper:true, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'],total:data.length,showTotal:(total) => `Total ${total} items`}}/>
        </div>
        {/* Formulario Modal */}
        <Modal
          centered={true}
          destroyOnClose={true}
          bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
          title="Add Instruction Letter"
          visible={isModalVisible}
          onCancel={handleCancel}
          onOk={form.submit}
          width={600}
        >
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 13,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            onFinish={postData}
            onFinishFailed={onFinishFailed}
          >
            <Tabs defaultActiveKey="5" centered>
              <TabPane tab="Service Type" key="5">
                <Form.Item
                  label="Service Type"
                  name="type_service"
                  rules={[
                    {
                      required: true,
                      message: "Please select Service Type!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select Service Type"
                    name="type_service"
                    style={{ width: "100%" }}
                    onSelect={(event) => handleChange(event, "type_service")}
                    filterOption={(input, option) =>
                      option.children
                        .toUpperCase()
                        .includes(input.toUpperCase())
                    }
                  >
                    <Option key="1" value={1}>
                      TERRESTRE
                    </Option>
                    <Option key="2" value={2}>
                      MARITIMO
                    </Option>
                    <Option key="3" value={3}>
                      DESPACHO ADUANAL/REGIMEN SI APLICA
                    </Option>
                    <Option key="4" value={4}>
                      COMBINADO
                    </Option>
                    <Option key="5" value={5}>
                      OTRO
                    </Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Reference"
                  name="reference"
                  rules={[
                    {
                      required: true,
                      message: "Please input a Reference!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Reference"
                    name="reference"
                    onChange={handleInputChange}
                    maxLength='50'
                  />
                </Form.Item>

                <Form.Item
                  label="Incoterm"
                  name="incoterm"
                  rules={[
                    {
                      required: true,
                      message: "Please select Incoterm!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select Incoterm"
                    name="incoterm"
                    style={{ width: "100%" }}
                    onSelect={(event) => handleChange(event, "incoterm")}
                    filterOption={(input, option) =>
                      option.children
                        .toUpperCase()
                        .includes(input.toUpperCase())
                    }
                  >
                    <Option key="1" value="EXW">
                      EXW
                    </Option>
                    <Option key="2" value="FCA">
                      FCA
                    </Option>
                    <Option key="3" value="CPT">
                      CPT
                    </Option>
                    <Option key="4" value="CIP">
                      CIP
                    </Option>
                    <Option key="5" value="DAP">
                      DAP
                    </Option>
                    <Option key="6" value="DPU">
                      DPU
                    </Option>
                    <Option key="7" value="DDP">
                      DDP
                    </Option>
                    <Option key="8" value="CFR">
                      CFR
                    </Option>
                    <Option key="9" value="FOB">
                      FOB
                    </Option>
                    <Option key="10" value="FAS">
                      FAS
                    </Option>
                    <Option key="11" value="CIF">
                      CIF
                    </Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Type Equipment"
                  name="equipment"
                  rules={[
                    {
                      required: true,
                      message: "Please select Type Equipment!",
                    },
                  ]}
                >
                  <Select showSearch
                    optionFilterProp="children"
                    placeholder="Type Equipment"
                    name="equipment"
                    style={{ width: '100%' }}
                    onSelect={(event) => handleChange(event, 'type_equipment')}
                    filterOption={(input, option) => option.children.toUpperCase().includes(input.toUpperCase())}>
                    {equipment.map((option) => (
                      <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Pickup Address"
                  name="Pickup Address"
                  rules={[
                    {
                      required: true,
                      message: "Please select Pickup address!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder="Pickup Address"
                    name="Pickup Address"
                    style={{ width: "100%" }}
                    onSelect={(event) => handleChange(event, "pickup_address")}
                    filterOption={(input, option) =>
                      option.children
                        .toUpperCase()
                        .includes(input.toUpperCase())
                    }
                  >
                    {location.map((option) => (
                      <Select.Option key={option.id} value={option.id}>
                        {option.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Delivery Address"
                  name="Delivery Address"
                  rules={[
                    {
                      required: true,
                      message: "Please select Delivery address!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder="Delivery Address"
                    name="pol"
                    style={{ width: "100%" }}
                    onSelect={(event) =>
                      handleChange(event, "delivery_address")
                    }
                    filterOption={(input, option) =>
                      option.children
                        .toUpperCase()
                        .includes(input.toUpperCase())
                    }
                  >
                    {location.map((option) => (
                      <Select.Option key={option.id} value={option.id}>
                        {option.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Port Of Load"
                  name="pol"
                  rules={[
                    {
                      required: true,
                      message: "Please select Port of load!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select Port of Load"
                    name="pol"
                    style={{ width: "100%" }}
                    onSelect={(event) => handleChange(event, "pol")}
                    filterOption={(input, option) =>
                      option.children
                        .toUpperCase()
                        .includes(input.toUpperCase())
                    }
                  >
                    {ports.map((option) => (
                      <Select.Option key={option.id} value={option.id}>
                        {option.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Port Of Discharge"
                  name="pod"
                  rules={[
                    {
                      required: true,
                      message: "Please select Port of discharge!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select Port of discharge"
                    name="pol"
                    style={{ width: "100%" }}
                    onSelect={(event) => handleChange(event, "pod")}
                    filterOption={(input, option) =>
                      option.children
                        .toUpperCase()
                        .includes(input.toUpperCase())
                    }
                  >
                    {ports.map((option) => (
                      <Select.Option key={option.id} value={option.id}>
                        {option.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </TabPane>

              <TabPane tab="Merchandise" key="merchandise">
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please input a description!",
                    },
                  ]}
                >
                  <Input name="description" onChange={handleInputChange} maxLength={100} />
                </Form.Item>

                <Form.Item
                  label="HSCODE"
                  name="tariff"
                  rules={[
                    {
                      required: true,
                      message: "Please input a HSCODE",
                    }, {
                      min: 8,
                      message: "Must have 8 charachters"
                    }
                  ]}
                >
                  <InputNumber
                    stringMode
                    className="InputNumber"
                    placeholder="hscode must be greater than 8"
                    name="tariff"
                    onChange={(event) => handleChange(event, "tariff")}
                    maxLength={10}
                  />
                </Form.Item>

                <Form.Item
                  label="Packing Type"
                  name="type_pckaging"
                  rules={[
                    {
                      required: true,
                      message: "Please select Pickup address!",
                    },
                  ]}
                >
                  <Select showSearch
                    optionFilterProp="children"
                    placeholder="Type Packaging"
                    name="packaging"
                    style={{ width: '100%' }}
                    onSelect={(event) => handleChange(event, 'type_packaging')}
                    filterOption={(input, option) => option.children.toUpperCase().includes(input.toUpperCase())}>
                    {packaging.map((option) => (
                      <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Volume"
                  name="volume"
                  rules={[
                    {
                      required: true,
                      message: "Please input a volume!",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Volume"
                    name="volume"
                    className='InputNumber'
                    onChange={(event) => handleChange(event, 'volume')}
                  />
                </Form.Item>

                <Form.Item
                  label="Net Weight"
                  name="weight"
                  rules={[
                    {
                      required: true,
                      message: "Please input a weight!",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Net Weight"
                    name="weight"
                    onChange={(event) => handleChange(event, 'weight')}
                    className='InputNumber'
                  />
                </Form.Item>

                <Form.Item
                  label="Cubic Meters"
                  name="cbm"
                  rules={[
                    {
                      required: true,
                      message: "Please input a cubic meters!",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Cubic Meters"
                    name="cbm"
                    onChange={(event) => handleChange(event, 'cbm')}
                    className='InputNumber'
                    maxLength={35}
                  />
                </Form.Item>

                <Form.Item
                  label="length"
                  name="lenght"
                  rules={[
                    {
                      required: true,
                      message: "Please input a length!",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="lenght"
                    name="lenght"
                    onChange={(event) => handleChange(event, 'lenght')}
                    className='InputNumber'
                  />
                </Form.Item>

                <Form.Item
                  label="Width"
                  name="width"
                  rules={[
                    {
                      required: true,
                      message: "Please input a width!",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Width"
                    name="width"
                    onChange={(event) => handleChange(event, 'width')}
                    className='InputNumber'
                  />
                </Form.Item>

                <Form.Item
                  label="Height"
                  name="height"
                  rules={[
                    {
                      required: true,
                      message: "Please input a height!",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Height"
                    name="height"
                    onChange={(event) => handleChange(event, 'height')}
                    className='InputNumber'
                  />
                </Form.Item>

                <Form.Item
                  label="Quantity"
                  name="quantity"
                >
                  <InputNumber
                    placeholder="Quantity"
                    name="quantity"
                    onChange={(event) => handleChange(event, 'quantity')}
                    className='InputNumber'
                  />
                </Form.Item>

              </TabPane>

              <TabPane tab="Special Instructions" key="special_info">
                <Form.Item label="Introduction">
                  <Input.TextArea rows={7} placeholder="Special Instructions" name="special_description" onChange={handleInputChange} maxLength={100} />
                </Form.Item>
              </TabPane>


            </Tabs>
          </Form>
        </Modal>
      </Content>
    </div>
  );
};
