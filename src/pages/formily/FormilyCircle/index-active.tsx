/*
 * @Author: ylyu
 * @Date: 2021-12-01 14:49:16
 * @LastEditors: ylyu
 * @LastEditTime: 2021-12-03 15:22:27
 * @Description: 高级联动——循环联动
 */

import { createForm, onFieldInputValueChange } from '@formily/core';
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
    // onFieldInputValueChange('total', (field) => {
    //   if (field.value === undefined) return;
    //   form.setFieldState('count', (state) => {
    //     const price = form.values.price;
    //     if (!price) return;
    //     state.value = field.value / price;
    //   });
    //   form.setFieldState('price', (state) => {
    //     const count = form.values.count;
    //     if (!count) return;
    //     state.value = field.value / count;
    //   });
    // });
    // onFieldInputValueChange('price', (field) => {
    //   form.setFieldState('total', (state) => {
    //     const count = form.values.count;
    //     if (count === undefined) return;
    //     state.value = field.value * count;
    //   });
    // });
    // onFieldInputValueChange('count', (field) => {
    //   form.setFieldState('total', (state) => {
    //     const price = form.values.price;
    //     if (price === undefined) return;
    //     state.value = field.value * price;
    //   });
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
      'x-reactions': [
        {
          target: 'count',
          effects: ['onFieldInputValueChange'],
          dependencies: ['price'],
          fulfill: {
            state: {
              value: '{{$deps[0] ? $self.value / $deps[0] : $target.value}}',
            },
          },
        },
        {
          target: 'price',
          effects: ['onFieldInputValueChange'],
          dependencies: ['count'],
          fulfill: {
            state: {
              value: '{{$deps[0] ? $self.value / $deps[0] : $target.value}}',
            },
          },
        },
      ],
    },
    count: {
      title: '数量',
      'x-component': 'NumberPicker',
      'x-decorator': 'FormItem',
      'x-reactions': {
        target: 'total',
        effects: ['onFieldInputValueChange'],
        dependencies: ['price'],
        fulfill: {
          state: {
            value: '{{$deps[0] !== undefined ? $self.value * $deps[0] : $target.value}}',
          },
        },
      },
    },
    price: {
      title: '单价',
      'x-component': 'NumberPicker',
      'x-decorator': 'FormItem',
      'x-reactions': {
        target: 'total',
        effects: ['onFieldInputValueChange'],
        dependencies: ['count'],
        fulfill: {
          state: {
            value: '{{$deps[0] !== undefined ? $self.value * $deps[0] : $target.value}}',
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
