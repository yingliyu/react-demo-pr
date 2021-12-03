/*
 * @Description:
 * @Author: ylyu
 * @Date: 2021-11-29 16:18:22
 * @LastEditors: ylyu
 * @LastEditTime: 2021-12-03 17:34:51
 */

import React, { useMemo } from 'react';
import { createForm, createEffectHook } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Form, FormItem, Input, Password, Submit } from '@formily/antd';
import { Tabs, Card } from 'antd';
import * as ICONS from '@ant-design/icons';
import { VerifyCode } from './VerifyCode';

// 创建一个 Form 实例，作为 ViewModel 给 UI 框架层消费
// const normalForm = createForm({
//     // 是否只校验第一个非法规则
//   validateFirst: true,
// })

const phoneForm = createForm({
  validateFirst: true,
});

// 创建一个 SchemaField 组件用于解析JSON-Schema动态渲染表单的组件
const SchemaField = createSchemaField({
  // 组件列表
  components: {
    FormItem,
    Input,
    Password,
    VerifyCode,
  },
  // 全局作用域，用于实现协议表达式变量注入
  scope: {
    icon(name: string) {
      return React.createElement(ICONS[name]);
    },
  },
});
/**初始化一份json schema
 * 解析 json-schema 的能力；将 json-schema 转换成 Field Model 的能力；编译 json-schema 表达式的能力
 **/
const normalSchema = {
  // schema type
  type: 'object',
  //   属性描述
  properties: {
    username: {
      // schema type
      type: 'string',
      // 标题
      title: '用户名',
      // 必填
      required: true,
      // 字段 UI 包装器组件
      'x-decorator': 'FormItem',
      // 字段 UI 组件
      'x-component': 'Input',
      // 字段 UI 组件属性
      'x-component-props': {
        prefix: "{{icon('UserOutlined')}}",
      },
    },
    password: {
      type: 'string',
      title: '密码',
      required: true,
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        addonAfter: '强度高',
      },
      'x-component': 'Password',
      'x-component-props': {
        prefix: "{{icon('LockOutlined')}}",
      },
    },
    checkCode: {
      type: 'string',
      title: '图形验证码',
      required: true,
      'x-hidden': true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入图形验证码',
      },
      'x-reactions': [
        {
          dependencies: ['.username#value', '.password#valid'],
          // 满足条件
          fulfill: {
            schema: {
              'x-hidden': '{{!$deps[0] || !$deps[1]}}', //任意层次属性都支持表达式
            },
          },
        },
      ],
    },
  },
};

const phoneSchema = {
  type: 'object',
  properties: {
    phone: {
      type: 'string',
      title: '手机号',
      required: true,
      // 字段校验器 https://core.formilyjs.org/api/models/field#fieldvalidator
      'x-validator': 'phone',
      // 'x-validator': [{ required: true }, 'phone'],
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        prefix: "{{icon('PhoneOutlined')}}",
      },
    },
    verifyCode: {
      type: 'string',
      title: '验证码',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'VerifyCode',
      'x-component-props': {
        prefix: "{{icon('LockOutlined')}}",
      },
      'x-reactions': [
        {
          //依赖的字段路径列表，只能以点路径描述依赖，支持相对路径，如果是数组格式，
          // 那么读的时候也是数组格式，如果是对象格式，读的时候也是对象格式，只是对象格式相当于是一个alias
          dependencies: ['.phone#value', '.phone#valid'],
          // 满足条件
          fulfill: {
            // 更新状态
            state: {
              'component[1].readyPost': '{{$deps[0] && $deps[1]}}',
              'component[1].phoneNumber': '{{$deps[0]}}',
            },
          },
        },
      ],
    },
  },
};
const onCustomEvent = createEffectHook('custom-event', (payload, form) => (listener) => {
  listener(payload, form);
});

export default () => {
  const normalForm = useMemo(
    () =>
      createForm({
        initialValues: { username: '', password: '' },
        values: { username: '', password: '' },
        effects() {
          onCustomEvent((payload: any, form: any) => {
            console.log(payload, form.id);
          });
        },
      }),
    [],
  );
  normalForm.setInitialValues({ username: '', password: '' });
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <Card style={{ width: 400, height: '100%' }}>
        <Tabs style={{ overflow: 'visible', marginTop: -10 }}>
          <Tabs.TabPane key="1" tab="账密登录">
            <Form form={normalForm} layout="vertical" size="large" onAutoSubmit={console.log}>
              <SchemaField schema={normalSchema} />
              <Submit
                block
                size="large"
                onClick={() => {
                  normalForm.notify('custom-event', 'This is Custom Event');
                }}
              >
                登录
              </Submit>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="手机登录">
            <Form form={phoneForm} layout="vertical" size="large" onAutoSubmit={console.log}>
              <SchemaField schema={phoneSchema} />
              <Submit block size="large">
                登录
              </Submit>
            </Form>
          </Tabs.TabPane>
        </Tabs>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <a href="#新用户注册">新用户注册</a>
          <a href="#忘记密码">忘记密码?</a>
        </div>
      </Card>
    </div>
  );
};
