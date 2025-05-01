
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RepairFormData } from '../schemas/repairFormSchema';
import { BasicInfoFields } from './BasicInfoFields';
import { DetailFields } from './DetailFields';
import { AssignmentFields } from './AssignmentFields';

interface RepairFormFieldsProps {
  form: UseFormReturn<RepairFormData>;
}

export const RepairFormFields = ({ form }: RepairFormFieldsProps) => {
  return (
    <>
      {/* Basic repair information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Información Básica</h3>
        <BasicInfoFields form={form} />
      </div>
      
      {/* Detailed description and diagnosis */}
      <div className="space-y-4 mt-6">
        <h3 className="text-lg font-medium">Detalles y Diagnóstico</h3>
        <DetailFields form={form} />
      </div>
      
      {/* Assignment and scheduling */}
      <div className="space-y-4 mt-6">
        <h3 className="text-lg font-medium">Asignación y Programación</h3>
        <AssignmentFields form={form} />
      </div>
    </>
  );
};
