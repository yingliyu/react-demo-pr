/*
 * @Author: ylyu
 * @Date: 2021-11-30 16:23:38
 * @LastEditors: ylyu
 * @LastEditTime: 2021-12-03 15:58:54
 * @Description:高级联动异步联动——被动
 */

import { createForm, onFieldReact } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import { Form, FormItem, Input, Select } from '@formily/antd';

const form = createForm({
  effects() {
    onFieldReact('input', (field) => {
      const select: any = field.query('select').take();
      if (!select) return;
      const selectValue = select.value;
      select.loading = true;
      if (selectValue) {
        setTimeout(() => {
          select.loading = false;
          field.display = selectValue;
        }, 1000);
      }
    });
  },
});

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
  },
  scope: {
    asyncVisible(field: any) {
      const select = field.query('select').take();
      if (!select) return;
      const selectVal = select.value;
      select.loading = true;
      if (selectVal) {
        setTimeout(() => {
          select.loading = false;
          field.display = selectVal;
        }, 1000);
      }
    },
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
      // SchemaReactions 实现联动
      // 'x-reactions': '{{asyncVisible}}',
    },
  },
};

export default () => {
  return (
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
};
