import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import AgeGroupSelect from "./AgeGroupSelect";
import PriceInput from "./PriceInput";
import { getNumberIntervals } from "../FunctionList";
import { DEFAULT_AGE_GROUP_PRICE } from "../DataFormat";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";

const AgeGroupPriceList = ({ list, onChange }) => {
  const [validation, setValidation] = useState({ overlap: [], notInclude: [] });

  const dataChange = (target, index, val) => {
    const newList = [...list];
    const { ageGroup, price } = list[index];
    if (target === 'remove') newList.splice(index, 1);
    else newList.splice(index, 1, { ageGroup: target === 'age' ? val : ageGroup, price: target === 'price' ? val : price });
    onChange(newList);
  };

  const addAgeGroupPrice = () => {
    const newList = [...list];
    newList.push(DEFAULT_AGE_GROUP_PRICE);
    onChange(newList);
  }
  const checkInterval = (interval) => {
    if (validation.overlap.length === 0) return false;
    let res = false;
    validation.overlap.forEach(([start, end]) => {
      if (!(interval[0] > end || interval[1] < start)) res = true;
    })
    return res;
  }

  useEffect(() => {
    const currentAgeGroup = list.map((el) => el.ageGroup);
    const validate = getNumberIntervals(currentAgeGroup);
    setValidation(validate);
  }, [list])

  return (
    <div>
      {list?.map((element, index) => {
        return (
          <>
            <Row>
              <Col span={21}><p>價格設定 - {index + 1}</p></Col>
              <Col span={3}>{list.length > 1 && <Button type="text" danger icon={<CloseOutlined color="red" />} onClick={() => dataChange('remove', index, {})}>移除</Button>}</Col>
            </Row>
            <Row>
              <Col span={11}>
                <AgeGroupSelect data={element.ageGroup} onChange={(val) => dataChange('age', index, val)} overlap={checkInterval(element.ageGroup)} />
              </Col>
              <Col span={2}></Col>
              <Col span={11}>
                <PriceInput data={element.price} onChange={(val) => dataChange('price', index, val)} />
              </Col>
            </Row>
            {index !== list.length - 1 && <hr />}
          </>
        )
      })}
      <Button type="text" icon={<PlusOutlined color="primary" />} style={{ color: validation.notInclude.length === 0 ? "lightgrey" : "DarkTurquoise" }} onClick={addAgeGroupPrice} disabled={validation.notInclude.length === 0}>新增價格設定</Button>
    </div>
  )
}

export default AgeGroupPriceList;