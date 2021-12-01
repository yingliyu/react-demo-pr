/*
 * @Author: ylyu
 * @Date: 2021-12-01 14:49:16
 * @LastEditors: ylyu
 * @LastEditTime: 2021-12-01 14:56:04
 * @Description: 循环联动
 */
import { createForm } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import { Form, FormItem, NumberPicker } from '@formily/antd';
const form = createForm();

const SchemaField = createSchemaField({
  components: {
    FormItem,
    NumberPicker,
  },
});

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.Number
        name="total"
        title="总价"
        x-component="NumberPicker"
        x-decorator="FormItem"
        x-reactions={[
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
        ]}
      />
      <SchemaField.Number
        name="count"
        title="数量"
        x-component="NumberPicker"
        x-decorator="FormItem"
        x-reactions={{
          target: 'total',
          effects: ['onFieldInputValueChange'],
          dependencies: ['price'],
          fulfill: {
            state: {
              value: '{{$deps[0] !== undefined ? $self.value * $deps[0] : $target.value}}',
            },
          },
        }}
      />
      <SchemaField.Number
        name="price"
        title="单价"
        x-component="NumberPicker"
        x-decorator="FormItem"
        x-reactions={{
          target: 'total',
          effects: ['onFieldInputValueChange'],
          dependencies: ['count'],
          fulfill: {
            state: {
              value: '{{$deps[0] !== undefined ? $self.value * $deps[0] : $target.value}}',
            },
          },
        }}
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
);
