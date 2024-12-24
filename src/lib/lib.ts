import { SafeParseReturnType, z } from 'zod';

export const dateYearMonthFormatter = (obj: {
  [key: string]: string;
}): string => {
  const date = obj.month.split('T')[0];
  const month = date.slice(0, -3);
  return month;
};

export const mapDayOfWeek = (obj: { [key: string]: number }): string => {
  const week = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];
  return week[obj.day_of_week];
};

export const fromFormData = <TData>(
  formDataObj: { [key: string]: FormDataEntryValue },
  schema: z.ZodType<TData>,
): SafeParseReturnType<TData, TData> => {
  let normalizedObject = {};

  for (const key in formDataObj) {
    const isNumber = !isNaN(Number(formDataObj[key]));
    const isNotEmpty = formDataObj[key] !== '';
    const isNotPhone = key !== 'phone';
    if (isNumber && isNotEmpty && isNotPhone) {
      normalizedObject = {
        ...normalizedObject,
        [key]: Number(formDataObj[key]),
      };
    } else {
      normalizedObject = { ...normalizedObject, [key]: formDataObj[key] };
    }
  }

  const result = schema.safeParse(normalizedObject);

  return result;
};
