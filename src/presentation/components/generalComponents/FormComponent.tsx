import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, Tag, Button } from 'antd';

interface IFieldConfig {
  title: string;
  dataIndex: string;
  key: string;
  hidden: boolean;
  editable: boolean;
  inputType: 'string' | 'number' | 'date' | 'boolean';
  validation: {
    required: boolean;
    type: 'string' | 'number' | 'date' | 'boolean';
    label: string;
  };
}

interface IConfig {
  [key: string]: IFieldConfig;
}

interface IFormComponentProps {
  config: IConfig;
  onSubmit?: (values: any) => void;
}

const FormComponent: React.FC<IFormComponentProps> = ({ config, onSubmit }) => {
  const [form] = Form.useForm();
  

  const renderField = (fieldConfig: IFieldConfig, form: any) => {
    const { inputType, title, dataIndex, key, editable, hidden, validation } = fieldConfig;

    if (hidden) return null;

    switch (inputType) {
      case 'string':
        return (
          <Form.Item
            label={title}
            name={dataIndex}
            rules={[{ required: validation.required, message: validation.label }]}
          >
            <Input />
          </Form.Item>
        );
      case 'number':
        return (
          <Form.Item
            label={title}
            name={dataIndex}
            rules={[{ required: validation.required, message: validation.label }]}
          >
            <Input type="number" />
          </Form.Item>
        );
      case 'date':
        return (
          <Form.Item
            label={title}
            name={dataIndex}
            rules={[{ required: validation.required, message: validation.label }]}
          >
            <DatePicker />
          </Form.Item>
        );
      case 'boolean':
        return (
          <Form.Item label={title} name={dataIndex}>
            <Tag color={form.getFieldValue(dataIndex) ? 'green' : 'red'}>
              {form.getFieldValue(dataIndex) ? 'Activo' : 'Inactivo'}
            </Tag>
          </Form.Item>
        );
      default:
        return null;
    }
  };

  return (
    <Form 
        form={form} 
        onFinish={onSubmit}
        scrollToFirstError={{ behavior: 'instant', block: 'end', focus: true }}
        style={{ paddingBlock: 32 }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
    >
      {Object.keys(config).map((key) => {
        const fieldConfig = config[key];
        return renderField(fieldConfig, form);
      })}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormComponent;