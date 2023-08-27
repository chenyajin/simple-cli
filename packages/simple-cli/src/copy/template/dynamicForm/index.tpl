import React from 'react';
import { Button, Form, Input } from 'antd';

// 标记：动态表单
const App = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  return (
    <Form onFinish={onFinish} autoComplete="off">
      <Form.Item label="Username" name="username">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">提交</Button>
      </Form.Item>
    </Form>
  );
};
export default App;