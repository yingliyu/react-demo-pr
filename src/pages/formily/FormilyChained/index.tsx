/*
 * @Author: ylyu
 * @Date: 2021-11-30 16:23:38
 * @LastEditors: ylyu
 * @LastEditTime: 2021-12-03 14:42:56
 * @Description:高级联动之链式联动——被动
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
        wrapperCol: 22,
        labelAlign: 'right',
        // layout: 'vertical',
      },
      properties: {
        select: {
          type: 'string',
          title: '控制者',
          default: false,
          enum: [
            { label: '显示', value: true },
            { label: '隐藏', value: false },
          ],
          'x-decorator': 'FormItem',
          'x-component': 'Select',
        },
        select1: {
          type: 'string',
          title: '受控者1',
          default: true,
          enum: [
            { label: '显示', value: true },
            { label: '隐藏', value: false },
          ],
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          // SchemaReactions 实现联动
          // 'x-reactions': {
          //   dependencies: ['select'],
          //   fulfill: {
          //     state: {
          //       visible: '{{!!$deps[0]}}',
          //     },
          //   },
          // },
        },
        input: {
          type: 'string',
          title: '受控者2',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          // SchemaReactions 实现联动
          // 'x-reactions': {
          //   dependencies: ['select1'],
          //   fulfill: {
          //     state: {
          //       visible: '{{!!$deps[0]}}',
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
          onFieldReact('select1', (field) => {
            field.visible = !!field.query('select').value();
          });
          onFieldReact('input', (field) => {
            field.visible = !!field.query('select1').value();
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
