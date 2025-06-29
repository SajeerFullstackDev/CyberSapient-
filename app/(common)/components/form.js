"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  email: z.string().email("Please enter your work email!"),
});

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <div className="w-full sm:w-64">
          <input
            type="email"
            placeholder="Your Work Email"
            {...register("email")}
            className="px-4 py-2 rounded-md text-gray-800 w-full bg-white border border-gray-300 focus:ring-2 focus:ring-red-500"
          />
          {errors.email && (
            <p className="text-white-300 text-sm ">{errors.email.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="animate-pulse bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-semibold w-full sm:w-auto"
        >
          GET STARTED NOW!
        </button>
      </div>
    </form>
  );
};

export default Form;
