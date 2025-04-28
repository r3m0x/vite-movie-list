import React from "react";
import { z } from "zod";
import { movieSchema } from "../../../schemas/movieSchema";

interface Step2Props {
  form: any;
  isEditMode: boolean;
}

// Extract showtime schema from the movie schema
const showtimeSchema = movieSchema.shape.showtime;

const FormStep2: React.FC<Step2Props> = ({ form, isEditMode = false }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Movie Showtime
      </h2>

      <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
        <form.Field
          name="showtime"
          validators={{
            onChange: ({ value }: { value: string }) => {
              try {
                showtimeSchema.parse(value);
                if (!isEditMode) {
                  const date = new Date(value);
                  const now = new Date();
                  if (date < now) {
                    return "Showtime must be in the future";
                  }
                }

                return undefined;
              } catch (error) {
                if (error instanceof z.ZodError) {
                  return error.errors[0]?.message || "Showtime is invalid";
                }
                return "Showtime validation failed";
              }
            },
          }}
        >
          {(field: any) => {
            // Format the date for the datetime-local input
            let formattedDate = "";
            if (field.state.value) {
              const date = new Date(field.state.value);
              if (!isNaN(date.getTime())) {
                formattedDate = date.toISOString().slice(0, 16);
              }
            }

            return (
              <div>
                <label
                  htmlFor="showtime"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Showtime
                </label>
                <input
                  id="showtime"
                  type="datetime-local"
                  value={formattedDate}
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    field.handleChange(date.toISOString());
                  }}
                  onBlur={field.handleBlur}
                  className={`w-full px-4 py-2 text-left border 
                    ${
                      field.state.meta.isTouched &&
                      field.state.meta.errors &&
                      field.state.meta.errors.length > 0
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    } 
                    rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                />
                {field.state.meta.isTouched &&
                  field.state.meta.errors &&
                  field.state.meta.errors.length > 0 && (
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

                <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                  <p className="text-sm text-gray-600 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {isEditMode
                      ? "You are editing an existing movie's showtime."
                      : "Please select a future date and time for the movie showtime."}
                  </p>
                </div>
              </div>
            );
          }}
        </form.Field>
      </div>
    </div>
  );
};

export default FormStep2;
