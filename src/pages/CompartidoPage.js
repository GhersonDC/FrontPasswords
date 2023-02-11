import React, { useState } from 'react';
import { Card } from 'antd';
import Cookies from "universal-cookie";
const cookies = new Cookies();

const CompartidoPage = () => {
    return (
        <Card title="Card title">
            <Card type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
                Test de vista
            </Card>
            <Card style={{  marginTop: 16,}}
                type="inner"
                title="Inner Card title"
                extra={<a href="#">More</a>}
            >
                Text de vista
            </Card>
        </Card>
    );
};
export default CompartidoPage;