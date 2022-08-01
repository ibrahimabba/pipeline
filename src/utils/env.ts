/* eslint-disable prettier/prettier */
import 'dotenv/config'

export const env = (name: string, validate = true) => {
  const value = process.env[name];

  if (!value && validate) {
    throw new Error(`Missing: process.env['${name}'].`);
  }

  return value || '';
};
