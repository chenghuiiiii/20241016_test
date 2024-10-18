import React from "react";
import { Alert, Form, Input, Select, Space } from "antd";

const AgeGroupSelect = ({ overlap, onChange, data }) => {
  const ageOptions = [...Array(21).keys()]

  return (
    <Form layout="vertical">
      <Form.Item label="年齡">
        <Space.Compact block>
          <Select value={data[0]} onChange={(val) => onChange([val, data[1]])} status={overlap && 'error'}>
            {ageOptions.map((age) => (
              <Select.Option key={age} value={age} disabled={age > data[1]}>
                {age}
              </Select.Option>
            ))}
          </Select>
          <Input value="~" disabled style={{ border: 'none', textAlign: 'center', width: '20%' }} />
          <Select value={data[1]} onChange={(val) => onChange([data[0], val])} status={overlap && 'error'}>
            {ageOptions.map((age) => (
              <Select.Option key={age} value={age} disabled={age < data[0]}>
                {age}
              </Select.Option>
            ))}
          </Select>
        </Space.Compact>
        {overlap && <Alert message="年齡區間不可重複" type="error" style={{ border: 'none', color: "red" }} />}
      </Form.Item>
    </Form>
  )
}

export default AgeGroupSelect;