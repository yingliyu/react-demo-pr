/*
 * @Author: ylyu
 * @Date: 2021-12-01 16:44:56
 * @LastEditors: ylyu
 * @LastEditTime: 2021-12-01 17:04:14
 * @Description:
 */

import React from 'react';
import { createForm } from '@formily/core';
import { createSchemaField, FormConsumer, FormProvider } from '@formily/react';
import { FormItem, Input, Password, Submit, FormLayout, FormButtonGroup } from '@formily/antd';
import * as ICONS from '@ant-design/icons';

//用来创建表单核心领域模型，它是作为MVVM设计模式的标准 ViewModel
const form = createForm();

// 创建一个 SchemaField 组件用于解析JSON-Schema动态渲染表单的组件
const SchemaField = createSchemaField({
  // 组件列表
  components: {
    FormLayout,
    FormItem,
    Input,
    Password,
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

const schema = {
  // schema type
  type: 'object',
  properties: {
    layout: {
      type: 'void',
      'x-component': 'FormLayout',
      'x-component-props': {
        labelCol: 2,
        wrapperCol: 6,
        labelAlign: 'right',
        // layout: 'vertical',
      },
      // 属性描述
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
      },
    },
  },
};

export default () => {
  return (
    /**
     * FormProvider组件是作为视图层桥接表单模型的入口，它只有一个参数，就是接收 createForm
     * 创建出来的 Form 实例，并将 Form 实例以上下文形式传递到子组件中
     * FormLayout组件是用来批量控制FormItem样式的组件，这里我们指定布局为水平布局，也就是标签在左，组件在右
     * FormConsumer组件是作为响应式模型的响应器而存在，它核心是一个 render props 模式，在作为 children 的回调函数中，会自动收集所有依赖，如果依赖发生变化，则会重新渲染，借助 FormConsumer 我们可以很方便的实现各种计算汇总的需求
     * FormButtonGroup组件作为表单按钮组容器而存在，主要负责按钮的布局
     * Submit组件作为表单提交的动作触发器而存在，其实我们也可以直接使用 form.submit 方法进行提交，但是使用 Submit 的好处是不需要每次都在 Button 组件上写 onClick 事件处理器，同时它还处理了 Form 的 loading 状态，如果 onSubmit 方法返回一个 Promise，且 Promise 正在 pending 状态，那么按钮会自动进入 loading 状态
     * */
    <FormProvider form={form}>
      <FormLayout layout="vertical">
        <SchemaField schema={schema} />
      </FormLayout>
      <FormButtonGroup>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
      <FormConsumer>
        {() => (
          <div
            style={{
              width: 340,
              marginTop: 20,
              padding: 5,
              border: '1px dashed #666',
            }}
          >
            实时响应-用户名：{form.values.username}
          </div>
        )}
      </FormConsumer>
    </FormProvider>
  );
};
