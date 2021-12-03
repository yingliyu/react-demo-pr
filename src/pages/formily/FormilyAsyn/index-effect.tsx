/*
 * @Author: ylyu
 * @Date: 2021-11-30 16:23:38
 * @LastEditors: ylyu
 * @LastEditTime: 2021-12-01 15:18:27
 * @Description:高级联动异步联动
 */

import { useMemo } from 'react';
import { createForm, onFieldValueChange } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import { Form, FormItem, Input, Select } from '@formily/antd';

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
    },
  },
};

export default () => {
  // effects实现联动逻辑
  const form = useMemo(
    () =>
      createForm({
        effects() {
          onFieldValueChange('select', (field) => {
            field.loading = true;
            setTimeout(() => {
              field.loading = false;
              form.setFieldState('input', (state) => {
                console.log(state);
                //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
                state.display = field.value;
              });
            }, 1000);
          });
        },
      }),
    [],
  );
  return (
    <Form form={form}>
      <SchemaField schema={formSchema as any} />
      <FormConsumer>
        {() => (
          <code>
            <pre>{JSON.stringify(form.values, null, 2)}</pre>
          </code>
        )}
      </FormConsumer>
    </Form>
  );
};
