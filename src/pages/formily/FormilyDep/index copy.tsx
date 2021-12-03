/*
 * @Author: ylyu
 * @Date: 2021-11-30 16:23:38
 * @LastEditors: ylyu
 * @LastEditTime: 2021-12-01 14:07:46
 * @Description:高级联动之依赖联动
 */

import { useMemo } from 'react';
import { createForm, onFieldValueChange } from '@formily/core';
import { createSchemaField, FormConsumer, FormProvider } from '@formily/react';
import { FormGrid, FormItem, Input, NumberPicker } from '@formily/antd';

const SchemaField = createSchemaField({
  components: {
    FormGrid,
    FormItem,
    Input,
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
        // maxColumns: 6,
      },
      properties: {
        value1: {
          type: 'number',
          title: 'value1',
          default: 0,
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-decorator-props': {
            // inset: true,
            colon: false,
            // addonBefore: 'Before',
            addonAfter: '乘以',
            feedbackText: '第一项',
            extra: 'extra',
            // labelCol: 6,
            // wrapperCol: 10,
          },
          // SchemaReactions 实现联动
          'x-reactions': {
            dependencies: ['value2'],
            target: 'result',
            fulfill: {
              state: {
                value: '{{$deps[0] * $self.value}}',
              },
            },
          },
        },
        value2: {
          type: 'number',
          title: 'value2',
          default: 0,
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-decorator-props': {
            // inset: true,
            extra: '第二项',
            colon: false,
            addonAfter: '=',
          },
          'x-reactions': {
            dependencies: ['value1'],
            target: 'result',
            fulfill: {
              state: {
                value: '{{$deps[0] * $self.value}}',
              },
            },
          },
        },
        result: {
          type: 'number',
          title: 'result',
          readOnly: true,
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-decorator-props': {
            // inset: true,
            bordered: false,
            extra: '结果',
            colon: false,
          },
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
