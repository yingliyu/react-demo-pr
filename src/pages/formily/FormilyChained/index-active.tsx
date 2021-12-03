/*
 * @Author: ylyu
 * @Date: 2021-11-30 16:23:38
 * @LastEditors: ylyu
 * @LastEditTime: 2021-12-03 14:31:14
 * @Description:高级联动之链式联动
 */

import { useMemo } from 'react';
import { createForm, onFieldValueChange } from '@formily/core';
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
          // SchemaReactions 实现联动
          // 'x-reactions': {
          //   target: 'select1',
          //   fulfill: {
          //     state: {
          //       visible: '{{!!$self.value}}',
          //     },
          //   },
          // },
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
          //   target: 'input',
          //   fulfill: {
          //     state: {
          //       visible: '{{!!$self.value}}',
          //     },
          //   },
          // },
        },
        input: {
          type: 'string',
          title: '受控者2',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
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
          onFieldValueChange('select', (field) => {
            form.setFieldState('select1', (state) => {
              //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
              state.visible = !!field.value;
            });
          });
          onFieldValueChange('select1', (field) => {
            form.setFieldState('input', (state) => {
              //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
              state.visible = !!field.value;
            });
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
