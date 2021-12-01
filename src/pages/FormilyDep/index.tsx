/*
 * @Author: ylyu
 * @Date: 2021-11-30 16:23:38
 * @LastEditors: ylyu
 * @LastEditTime: 2021-12-01 14:34:24
 * @Description:高级联动之依赖联动
 */

import { useMemo } from 'react';
import { createForm, onFieldValueChange } from '@formily/core';
import { createSchemaField, FormConsumer, FormProvider } from '@formily/react';
import { FormGrid, FormItem, Input } from '@formily/antd';

const SchemaField = createSchemaField({
  components: {
    FormGrid,
    FormItem,
    Input,
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
          'x-component': 'Input',
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
        },
        value2: {
          type: 'number',
          title: 'value2',
          default: 0,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-decorator-props': {
            // inset: true,
            extra: '第二项',
            colon: false,
            addonAfter: '=',
          },
        },
        result: {
          type: 'number',
          title: 'result',
          readOnly: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-decorator-props': {
            // inset: true,
            extra: '结果',
            // colon: false,
          },
          'x-component-props': {
            bordered: false,
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
          onFieldValueChange('value1', (field) => {
            const val1 = field.value;
            const val2 = field.query('value2').value();
            form.setFieldState('result', (state) => {
              console.log(state);
              //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
              state.value = val1 * val2;
            });
          });
          onFieldValueChange('value2', (field) => {
            const val2 = field.value;
            const val1 = field.query('value1').value();
            form.setFieldState('result', (state) => {
              console.log(state);
              //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
              state.value = val1 * val2;
            });
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
