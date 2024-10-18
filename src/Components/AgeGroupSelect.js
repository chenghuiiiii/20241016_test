import React, { useState } from "react";
import { Alert, Form, Input, Select, Space } from "antd";

const AgeGroupSelect = ({ overlap }) => {
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(20);
  const ageOptions = [...Array(21).keys()]

  const handleMinAgeChange = (val) => {
    setMinAge(val);
  }

  const handleMaxAgeChange = (val) => {
    setMaxAge(val);
  }

  return (
    <Form layout="vertical">
      <Form.Item label="年齡">
        <Space.Compact>
          <Select value={minAge} onChange={handleMinAgeChange} status={overlap && 'error'}>
            {ageOptions.map((age) => (
              <Select.Option key={age} value={age} disabled={age > maxAge}>
                {age}
              </Select.Option>
            ))}
          </Select>
          <Input value="~" disabled style={{ border: 'none', textAlign: 'center', width: '20%' }} />
          <Select value={maxAge} onChange={handleMaxAgeChange} status={overlap && 'error'}>
            {ageOptions.map((age) => (
              <Select.Option key={age} value={age} disabled={age < minAge}>
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