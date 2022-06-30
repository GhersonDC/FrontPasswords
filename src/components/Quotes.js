import React,{useState} from 'react'
import { Button, Drawer, Space,Card } from 'antd';
import PropTypes from 'prop-types';

const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };

export const Quotes = ({quote, close}) => {
      
  return (
    
    <>
    <Drawer
      title={`Quote`}
      placement="right"
      width={750}
      onClose={close}
      visible={quote}
      extra={
        <Space>
          <Button onClick={close}>Cancel</Button>
          <Button type="primary" onClick={close}>
            OK
          </Button>
        </Space>
      }
    >
      <Card title="COT-12-2022-01-28">
    <Card.Grid style={gridStyle} >Content</Card.Grid>
    <Card.Grid hoverable={false} style={gridStyle}>
      Content
    </Card.Grid>
    <Card.Grid style={gridStyle}>LetterId</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
  </Card>
    </Drawer>
  </>
  )
}

Quotes.propTypes = {
    close: PropTypes.func.isRequired,
};

Quotes.defaulProps = {
    quote: {},
    close: () => false,
};