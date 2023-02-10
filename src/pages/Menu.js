import React from 'react'
import { Result, Button } from 'antd';

const Menu = () => {
    return (
        <div>
            <Result
                status="success"
                title="Working page!"
                subTitle="Usuario, bienvenido"
                extra={[
                  <Button type="primary" key="console">
                    Go Console
                  </Button>,
                  <Button key="buy">Hello</Button>,
                ]}
            />
        </div>
    )
}

export default Menu;