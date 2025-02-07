'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import InputField from '../components/InputField';
import { useFormStore } from '../store/useFormStore';

const loginSchema = z.object({
  firstname: z
    .string()
    .min(3, 'First name is required')
    .regex(/^[A-Za-z ]+$/, 'First name can only contain letters and spaces'),
  lastname: z
    .string()
    .min(3, 'Last name is required')
    .regex(/^[A-Za-z ]+$/, 'Last name can only contain letters and spaces'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const { firstname, lastname, setFormData, setSubStep } = useFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { firstname, lastname }, // Load data from Zustand
  });

  const onSubmit = (data: LoginFormData) => {
    setFormData(data); // Persist form data
    setSubStep(2);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2"
      >
        <div className="font-bold text-xl mb-2">Some introductions</div>
        <InputField
          label="First name"
          name="firstname"
          register={register}
          error={errors.firstname?.message}
          placeholder="Your first name"
          autoFocus
        />
        <InputField
          label="Last name"
          name="lastname"
          register={register}
          error={errors.lastname?.message}
          placeholder="Your last name"
        />
        <button
          type="submit"
          className="mt-4 p-3 bg-blue-500 text-white rounded-full w-full"
        >
          Continue
        </button>
      </form>
      <div className="flex justify-center mt-4">
        <button className="text-blue-500 font-bold mt-2 text-sm">
          Already have an account?
        </button>
      </div>
    </>
  );
};

export default LoginForm;
