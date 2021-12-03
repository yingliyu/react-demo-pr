/*
 * @Author: ylyu
 * @Date: 2021-11-30 16:23:38
 * @LastEditors: ylyu
 * @LastEditTime: 2021-12-03 14:27:50
 * @Description:高级联动之依赖联动——被动
 */

import { useMemo } from 'react';
import { createForm, onFieldReact } from '@formily/core';
import { createSchemaField, FormConsumer, FormProvider } from '@formily/react';
import { FormGrid, FormItem, NumberPicker } from '@formily/antd';

const SchemaField = createSchemaField({
  components: {
    FormGrid,
    FormItem,
    NumberPicker,
  },
});

const formSchema = {
  type: 'string',
  properties: {
    grid: {
      type: 'void',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: [6, 6, 4],
      },
      properties: {
        value1: {
          type: 'number',
          title: 'value1',
          default: 0,
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-decorator-props': {
            colon: false,
            addonAfter: '乘以',
            feedbackText: '第一项',
            extra: 'extra',
          },
        },
        value2: {
          type: 'number',
          title: 'value2',
          default: 0,
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-decorator-props': {
            extra: '第二项',
            colon: false,
            addonAfter: '=',
          },
        },
        result: {
          type: 'number',
          title: 'result',
          'x-pattern': 'readPretty',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-decorator-props': {
            extra: '结果',
          },
          'x-component-props': {
            // bordered: false,
          },
          // SchemaReactions 实现联动
          // 'x-reactions': {
          //   dependencies: ['value1', 'value2'],
          //   fulfill: {
          //     state: {
          //       value: '{{$deps[0] * $deps[1]}}',
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
          onFieldReact('result', (field: any) => {
            const val1 = field.query('value1').value();
            const val2 = field.query('value2').value();
            field.value = val1 * val2;
          });
        },
      }),
    [],
  );
  return (
    <>
      <h2>乘法</h2>
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
    </>
  );
};
