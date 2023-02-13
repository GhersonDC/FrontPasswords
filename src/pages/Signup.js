import {
    Button,
    Checkbox,
    DatePicker,
    Form,
    Input,
    Radio,
    Select,
    Upload,
  } from 'antd';
  import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
  import { useState } from 'react';
  import '../index.css'

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const Signup = () => {
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
      setComponentSize(size);
    };

    return (
      <Form
        className='form_signup'
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        style={{
          width: 600
        }}
      >
        <Form.Item label="Nombre:">
          <Input />
        </Form.Item>
        <Form.Item label="Correo:">
          <Input type='email'/>
        </Form.Item>
        <Form.Item label="Edad:">
          <Input />
        </Form.Item>
        <Form.Item label="Genero">
          <Select>
            <Select.Option value="hombre">Hombre</Select.Option>
            <Select.Option value="mujer">Mujer</Select.Option>
            <Select.Option value="nobinario">No binario</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Nacimiento">
          <DatePicker/>
        </Form.Item>
        <Form.Item
        name="image"
        label="Imagen"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        >
        <Upload name="logo" action="/upload.do" listType="picture">
        <Button icon={<UploadOutlined />}>Click para cargar imagen</Button>
      </Upload>
    </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Checkbox /*onChange={onChange}*/>Acepto terminos y condiciones</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary'>Registrar</Button>
        </Form.Item>
        <Form.Item name="size" wrapperCol={{ offset: 6, span: 16 }}>
          <Radio.Group>
            <Radio.Button value="small">Chico</Radio.Button>
            <Radio.Button value="default">Normal</Radio.Button>
            <Radio.Button value="large">Aumentado</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    );
  };
  export default Signup;