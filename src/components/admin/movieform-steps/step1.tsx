import React from "react";
import { z } from "zod";
import { movieSchema } from "../../../schemas/movieSchema";

interface Step1Props {
  form: any;
}

const titleSchema = movieSchema.shape.title;
const descriptionSchema = movieSchema.shape.description;
const ratingSchema = movieSchema.shape.rating;
const totalSeatsCountSchema = movieSchema.shape.totalSeatsCount;
const availableSeatsCountSchema = movieSchema.shape.availableSeatsCount;

const FormStep1: React.FC<Step1Props> = ({ form }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Movie Details
      </h2>

      {/* Title Field */}
      <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
        <form.Field
          name="title"
          validators={{
            onChange: ({ value }: { value: string }) => {
              try {
                titleSchema.parse(value);
                return undefined;
              } catch (error) {
                if (error instanceof z.ZodError) {
                  return error.errors[0]?.message || "Title is invalid";
                }
                return "Title validation failed";
              }
            },
          }}
        >
          {(field: any) => (
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className={`w-full px-4 py-2 text-left border ${field.state.meta.isTouched && field.state.meta.errors?.length ? "border-red-500 bg-red-50" : "border-gray-300"} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                placeholder="Enter movie title"
              />
              {field.state.meta.isTouched &&
                field.state.meta.errors?.length > 0 && (
                  <div className="mt-2 text-red-600 text-sm flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    {field.state.meta.errors}
                  </div>
                )}
            </div>
          )}
        </form.Field>
      </div>

      {/* Description Field */}
      <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
        <form.Field
          name="description"
          validators={{
            onChange: ({ value }: { value: string }) => {
              try {
                descriptionSchema.parse(value);
                return undefined;
              } catch (error) {
                if (error instanceof z.ZodError) {
                  return error.errors[0]?.message || "Description is invalid";
                }
                return "Description validation failed";
              }
            },
          }}
        >
          {(field: any) => (
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                rows={4}
                className={`w-full px-4 py-2 text-left border ${field.state.meta.isTouched && field.state.meta.errors?.length ? "border-red-500 bg-red-50" : "border-gray-300"} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                placeholder="Enter movie description"
              />
              {field.state.meta.isTouched &&
                field.state.meta.errors?.length > 0 && (
                  <div className="mt-2 text-red-600 text-sm flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    {field.state.meta.errors}
                  </div>
                )}
            </div>
          )}
        </form.Field>
      </div>

      {/* Rating Field */}
      <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
        <form.Field
          name="rating"
          validators={{
            onChange: ({ value }: { value: number }) => {
              try {
                ratingSchema.parse(value);
                return undefined;
              } catch (error) {
                if (error instanceof z.ZodError) {
                  return error.errors[0]?.message || "Rating is invalid";
                }
                return "Rating validation failed";
              }
            },
          }}
        >
          {(field: any) => (
            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Rating (1-5)
              </label>
              <input
                id="rating"
                type="number"
                min="1"
                max="5"
                value={field.state.value}
                onChange={(e) => field.handleChange(parseFloat(e.target.value))}
                onBlur={field.handleBlur}
                className={`w-full px-4 py-2 text-left border 
                  ${
                    field.state.meta.isTouched &&
                    field.state.meta.errors?.length
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  } 
                    rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                placeholder="Enter rating from 0-5"
              />
              {field.state.meta.isTouched &&
                field.state.meta.errors?.length > 0 && (
                  <div className="mt-2 text-red-600 text-sm flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    {field.state.meta.errors}
                  </div>
                )}
            </div>
          )}
        </form.Field>
      </div>

      {/* Seats Fields - Grouped in a flex container */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Total Seats Count Field */}
        <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex-1">
          <form.Field
            name="totalSeatsCount"
            validators={{
              onChange: ({ value }: { value: number }) => {
                try {
                  totalSeatsCountSchema.parse(value);
                  return undefined;
                } catch (error) {
                  if (error instanceof z.ZodError) {
                    return (
                      error.errors[0]?.message || "Total seats count is invalid"
                    );
                  }
                  return "Total seats validation failed";
                }
              },
            }}
          >
            {(field: any) => (
              <div>
                <label
                  htmlFor="totalSeatsCount"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Total Seats
                </label>
                <input
                  id="totalSeatsCount"
                  type="number"
                  min="1"
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(parseInt(e.target.value, 10))
                  }
                  onBlur={field.handleBlur}
                  className={`w-full px-4 py-2 text-left border ${field.state.meta.isTouched && field.state.meta.errors?.length ? "border-red-500 bg-red-50" : "border-gray-300"} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Enter total seats"
                />
                {field.state.meta.isTouched &&
                  field.state.meta.errors?.length > 0 && (
                    <div className="mt-2 text-red-600 text-sm flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      {field.state.meta.errors}
                    </div>
                  )}
              </div>
            )}
          </form.Field>
        </div>

        {/* Available Seats Count Field */}
        <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex-1">
          <form.Field
            name="availableSeatsCount"
            validators={{
              onChange: ({
                value,
                formState,
              }: {
                value: number;
                formState: any;
              }) => {
                try {
                  // First validate with the Zod schema
                  availableSeatsCountSchema.parse(value);
                  // Then do the cross-field validation
                  if (value > formState?.values.totalSeatsCount) {
                    return "Available seats cannot exceed total seats";
                  }

                  return undefined;
                } catch (error) {
                  if (error instanceof z.ZodError) {
                    return (
                      error.errors[0]?.message ||
                      "Available seats count is invalid"
                    );
                  }
                  return "Available seats validation failed";
                }
              },
            }}
          >
            {(field: any) => (
              <div>
                <label
                  htmlFor="availableSeatsCount"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Available Seats
                </label>
                <input
                  id="availableSeatsCount"
                  type="number"
                  min="0"
                  max={form.state.values.totalSeatsCount}
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(parseInt(e.target.value, 10))
                  }
                  onBlur={field.handleBlur}
                  className={`w-full px-4 py-2 text-left border ${field.state.meta.isTouched && field.state.meta.errors?.length ? "border-red-500 bg-red-50" : "border-gray-300"} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Enter available seats"
                />
                {field.state.meta.isTouched &&
                  field.state.meta.errors?.length > 0 && (
                    <div className="mt-2 text-red-600 text-sm flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      {field.state.meta.errors}
                    </div>
                  )}
              </div>
            )}
          </form.Field>
        </div>
      </div>
    </div>
  );
};

export default FormStep1;
