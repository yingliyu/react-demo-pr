/*
 * @Author: ylyu
 * @Date: 2021-11-30 16:23:38
 * @LastEditors: ylyu
 * @LastEditTime: 2021-12-03 14:11:37
 * @Description:高级联动1对多——被动
 */

import { useMemo } from 'react';
import { createForm, onFieldReact } from '@formily/core';
import { createSchemaField, FormConsumer, FormProvider } from '@formily/react';
import { FormLayout, FormItem, Input, Select } from '@formily/antd';

const SchemaField = createSchemaField({
  components: {
    FormLayout,
    FormItem,
    Input,
    Select,
  },
});

const formSchema = {
  type: 'string',
  properties: {
    layout: {
      type: 'void',
      colon: false,
      'x-component': 'FormLayout',
      'x-component-props': {
        labelCol: 2,
        wrapperCol: 10,
        labelAlign: 'right',
      },
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
        },
        input1: {
          type: 'string',
          title: '受控者1',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          // SchemaReactions 实现联动
          // 'x-reactions': {
          //   dependencies: ['select'],
          //   fulfill: {
          //     state: {
          //       display: '{{$deps[0]}}',
          //     },
          //   },
          // },
        },
        input2: {
          type: 'string',
          title: '受控者2',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          // SchemaReactions 实现联动
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
    },
  },
};

export default () => {
  const form = useMemo(
    () =>
      createForm({
        effects() {
          onFieldReact('*(input1,input2)', (field) => {
            field.display = field.query('select').value();
          });
        },
      }),
    [],
  );
  return (
    <FormProvider form={form}>
      <SchemaField schema={formSchema} />
      <FormConsumer>
        {() => (
          <code>
            <pre>{JSON.stringify(form.values, null, 2)}</pre>
          </code>
        )}
      </FormConsumer>
    </FormProvider>
  );
};
