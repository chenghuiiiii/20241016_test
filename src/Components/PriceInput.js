import React, { useState } from "react";
import { Alert, Form, Input, Space } from "antd";
import { addComma } from "../FunctionList";

const PriceInput = () => {
  const [price, setPrice] = useState();
  const change = (val) => {
    const number = val.replaceAll(/[^\d.]/g, '');
    if (number.match(/\./g)?.length > 1) return
    if (val === price) return
    setPrice(number);
  }

  return (
    <Form layout="vertical" initialValues={{ value: 0 }}>
      <Form.Item
        label="入住費用 (每人每晚)"
        rules={[{ required: true, message: "不可以為空白" }]}
      >
        <Space.Compact block>
          <Input defaultValue="TWD" style={{ width: "20%" }} />
          <Input
            value={addComma(price)}
            status="error"
            width={{ width: "80%" }}
            placeholder="請輸入費用"
            onChange={(e) => change(e.target.value)}
          />
        </Space.Compact>
        {!price && <Alert message="不可以為空白" type="error" style={{ border: 'none', color: "red" }} />}
        <div style={{ marginTop: '4px', color: '#888', textAlign: 'end' }}>輸入 0 表示免費</div>
      </Form.Item>
    </Form>
  );
};

export default PriceInput;