import { z } from 'zod';

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.expected === 'string' && issue.received === 'undefined') {
      return { message: 'general.form-validations.required' };
    }
    if (issue.expected === 'number') {
      if (issue.received === 'undefined') {
        return { message: 'general.form-validations.required' };
      } else {
        return { message: 'general.form-validations.not-number' };
      }
    }
    if (issue.expected === 'date') {
      if (issue.received === 'undefined') {
        return { message: 'general.form-validations.required' };
      } else {
        return { message: 'general.form-validations.not-date' };
      }
    }
  }
  if (issue.code === z.ZodIssueCode.invalid_string) {
    if (issue.validation === 'email') {
      return { message: 'general.form-validations.email' };
    }
  }
  if (issue.code === z.ZodIssueCode.too_small) {
    if (issue.type === 'string') {
      return { message: 'general.form-validations.required' };
    }
  }
  if (issue.code === z.ZodIssueCode.invalid_date) {
    return { message: 'general.form-validations.not-date' };
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);
