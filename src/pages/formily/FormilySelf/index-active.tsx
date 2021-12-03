/*
 * @Author: ylyu
 * @Date: 2021-12-01 15:00:35
 * @LastEditors: ylyu
 * @LastEditTime: 2021-12-03 15:34:21
 * @Description: 自身联动
 */

import { createForm, onFieldValueChange } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import { Form, FormItem, Input } from '@formily/antd';
import './style.less';

const form = createForm({
  effects() {
    onFieldValueChange('color', (field) => {
      field.setComponentProps({
        style: {
          backgroundColor: field.value,
        },
      });
    });
  },
});

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
});

const schema = {
  type: 'object',
  properties: {
    color: {
      type: 'number',
      title: '颜色',
      default: '#FFFFFF',
      'x-component': 'Input',
      'x-decorator': 'FormItem',
      'x-reactions': {
        target: 'color',
        fulfill: {
          state: {
            'component[1].style.backgroundColor': '{{$self.value}}',
          },
          //以下用法也可以
          // schema: {
          //   'x-component-props.style.backgroundColor': '{{$self.value}}',
          // },
        },
      },
    },
  },
};

export default () => (
  <Form form={form}>
    <SchemaField schema={schema as any} />
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
);
