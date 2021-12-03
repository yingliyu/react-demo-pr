/*
 * @Author: ylyu
 * @Date: 2021-11-30 16:23:38
 * @LastEditors: ylyu
 * @LastEditTime: 2021-12-03 14:12:36
 * @Description:高级联动1对1——被动
 */

import { createForm, onFieldReact } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import { Form, FormItem, Input, Select } from '@formily/antd';

// effects实现联动逻辑
const form = createForm({
  effects() {
    onFieldReact('input', (field) => {
      field.display = field.query('select').value();
    });
  },
});

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
  },
});

const formSchema = {
  type: 'string',
  properties: {
    select: {
      type: 'string',
      title: '控制者',
      default: 'visible',
      required: true,
      enum: [
        { label: '显示', value: 'visible' },
        { label: '隐藏', value: 'none' },
        { label: '隐藏-保留值', value: 'hidden' },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        style: {
          width: 300,
        },
      },
    },
    input: {
      type: 'string',
      title: '受控者',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-decorator-props': {
        style: {
          marginLeft: 10,
        },
      },
      'x-component-props': {
        style: {
          width: 300,
        },
      },
      // SchemaReactions 实现被动联动
      // 'x-reactions': {
      //   dependencies: ['select'],
      //   fulfill: {
      //     state: {
      //       display: '{{$deps[0]}}',
      //     },
      //   },
      // },
    },
  },
};

export default () => (
  <Form form={form}>
    <SchemaField schema={formSchema} />
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
);
