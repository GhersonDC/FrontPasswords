import { Card, Button, Form, Input, Table, Popconfirm } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
};

const EditableCell = ({  title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    
    useEffect(() => {
        if (editing) {
          inputRef.current.focus();
        }
    }, [editing]);
    
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
          [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
          const values = await form.validateFields();
          toggleEdit();
          handleSave({
            ...record,
            ...values,
          });
        } catch (errInfo) {
          console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item style={{  margin: 0, }} name={dataIndex} rules={[ { required: true, message: `${title} is required.`,} ]}>
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" style={{  paddingRight: 24, }} onClick={toggleEdit}> {children} </div>
        )
    }

    return <td {...restProps}>{childNode}</td>; 
}

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const CompartidoPage = () => {
    

    const onFinish = (values) => {
        console.log('Success:', values);
        console.log(dataSource)
        let key = (dataSource.length + 1).toString()
        values.key = key
        let newObj = { key: values.key };

        Object.assign(newObj, values);
        console.log(values)
        setDataSource([...dataSource, values]);
        console.log(dataSource)
    };

    const [dataSource, setDataSource] = useState([
        { key: 1, password: 'John Brown', link: "32", introduction: 'New York No. 1 Lake Park', },
        { key: 2, password: 'Jim Green', link: 42, introduction: 'London No. 1 Lake Park', },
        { key: '3', password: 'Joe Black', link: 32, introduction: 'Sydney No. 1 Lake Park', },
        { key: '4', password: 'Joe Black', link: 32, introduction: 'Sydney No. 1 Lake Park', },
        { key: '5', password: 'Ultimo', link: 32, introduction: 'Sydney No. 1 Lake Park', },
    ])

    const handleDelete = (key) => {
        console.log(key)
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };

    const defaultColumns = [
        { title: 'Password', dataIndex: 'password', key: 'password', editable: true,},
        { title: 'Link',  dataIndex: 'link', key: 'link', },
        { title: 'Description', dataIndex: 'introduction', key: 'introduction', },
        { title: 'Action', key: 'action', render: (_, record) => dataSource.length >= 1 ? (
            <span>
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                    <Button shape="circle" icon={<DeleteOutlined />}></Button>
                </Popconfirm>
            </span>
            
          ) : null, 
        },
    ]

    const handleSave = (row) => {
        console.log(row)
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        console.log(newData)
        setDataSource(newData);
    };

    const components = {
        body: {
          row: EditableRow,
          cell: EditableCell,
        },
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: (record) => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave,
          }),
        };
    });

    return (
        <Card title="Data">            
            <Card title="Add Password">
                <Form name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16,}} style={{maxWidth: 600,}} initialValues={{remember: true,}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                    <Form.Item label="Password" name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                    </Form.Item>
                    <Form.Item label="Link" name="link"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input />
                    </Form.Item>
                    <Form.Item name='introduction' label="Description">
                            <Input.TextArea />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8,  span: 16, }}>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card title="Data Table" style={{ marginTop: 16 }}>
                <Table components={components} rowClassName={() => 'editable-row'} bordered dataSource={dataSource} columns={columns}/>
            </Card> 
        </Card>
    );
};
export default CompartidoPage;