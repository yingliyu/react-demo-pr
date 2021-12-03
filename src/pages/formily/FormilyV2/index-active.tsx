/*
 * @Author: ylyu
 * @Date: 2021-11-30 16:23:38
 * @LastEditors: ylyu
 * @LastEditTime: 2021-12-01 13:25:13
 * @Description:高级联动demo2
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
          default: 'visible',
          required: true,
          enum: [
            { label: '显示', value: 'visible' },
            { label: '隐藏', value: 'none' },
            { label: '隐藏-保留值', value: 'hidden' },
          ],
          'x-decorator': 'FormItem',
          'x-component': 'Select',

          // SchemaReactions 实现联动
          // 'x-reactions': {
          //   target: '*(input1,input2)',
          //   fulfill: {
          //     state: {
          //       display: '{{$self.value}}',
          //     },
          //   },
          // },
        },
        input1: {
          type: 'string',
          title: '受控者1',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        input2: {
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
            form.setFieldState('*(input1,input2)', (state) => {
              console.log(state);
              //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
              state.display = field.value;
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
