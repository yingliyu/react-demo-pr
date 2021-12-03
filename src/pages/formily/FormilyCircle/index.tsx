/*
 * @Author: ylyu
 * @Date: 2021-12-01 14:49:16
 * @LastEditors: ylyu
 * @LastEditTime: 2021-12-03 15:16:57
 * @Description: 高级联动——循环联动——被动
 */

import { createForm, onFieldReact } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import { Form, FormItem, NumberPicker } from '@formily/antd';

const SchemaField = createSchemaField({
  components: {
    FormItem,
    NumberPicker,
  },
});

const form = createForm({
  effects() {
    // onFieldReact('total', (field: any) => {
    //   const price = field.query('price').value();
    //   const count = field.query('count').value();
    //   if (price !== undefined && count !== undefined) {
    //     field.value = price * count;
    //   }
    // });
    // onFieldReact('price', (field: any) => {
    //   const total = field.query('total').value();
    //   const count = field.query('count').value();
    //   if (total !== undefined && count > 0) {
    //     field.value = total / count;
    //   }
    // });
    // onFieldReact('count', (field: any) => {
    //   const price = field.query('price').value();
    //   const total = field.query('total').value();
    //   if (total !== undefined && price > 0) {
    //     field.value = total / price;
    //   }
    // });
  },
});

const schema = {
  type: 'object',
  properties: {
    total: {
      type: 'number',
      title: '总价',
      'x-component': 'NumberPicker',
      'x-decorator': 'FormItem',
      'x-reactions': {
        dependencies: ['count', 'price'],
        fulfill: {
          state: {
            value:
              '{{$deps[0] !== undefined && $deps[1] !== undefined ?$dep[0]*$deps[1]: $self.value}}',
          },
        },
      },
    },
    count: {
      title: '数量',
      'x-component': 'NumberPicker',
      'x-decorator': 'FormItem',
      'x-reactions': {
        dependencies: ['total', 'price'],
        fulfill: {
          state: {
            value: '{{$deps[1] > 0 ? $deps[0] / $deps[1] : $self.value}}',
          },
        },
      },
    },
    price: {
      title: '单价',
      'x-component': 'NumberPicker',
      'x-decorator': 'FormItem',
      'x-reactions': {
        dependencies: ['total', 'count'],
        fulfill: {
          state: {
            value: '{{ $deps[1] > 0 ? $deps[0] / $deps[1] : $self.value}}',
          },
        },
      },
    },
  },
};

export default () => (
  <Form form={form}>
    <SchemaField schema={schema} />
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
);
