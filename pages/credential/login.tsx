import { useMutation } from '@apollo/client';
import { Form, Input, Checkbox, Button } from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
import { Login, LoginInput } from '../../generated/generate-types';
import { ADMIN_LOGIN } from '../../graphql/auth/auth.graphql';
import { login } from '../../redux/slice/user.slice';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = { login };
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 10 },
};

const tailLayout = {
  wrapperCol: { offset: 3, span: 10 },
};

const AdminLogin = (props) => {
  const [adminLogin, { data, loading, error }] = useMutation<
    Login.Mutation,
    Login.Variables
  >(ADMIN_LOGIN);

  const onFinish = (values: LoginInput) => {
    adminLogin({ variables: { input: values } })
      .then((res) => {
        console.log(res.data.login);
        props.login(res.data.login);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log('Props', props.user);
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>Admin Dashboards Login</title>
      </Helmet>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
              type: 'email',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="rememberMe" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);
