import React, { useState, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { v7 as uuidv7 } from "uuid";
import { Movie } from "../../types/movie";
import FormStep1 from "./movieform-steps/step1";
import FormStep2 from "./movieform-steps/step2";
import FormStep3 from "./movieform-steps/step3";
import {
  movieDetailsSchema,
  movieSchema,
  showtimeSchema,
} from "../../schemas/movieSchema";
import FormErrors from "./formerror";
import { PreviousButton, NextButton, SubmitButton } from "./formtoolbarbutton";

// Main form component
interface MovieFormMainProps {
  initialData: Partial<Movie>;
  onSubmit: (formData: Movie) => void;
  isEditMode: boolean;
}

const MovieFormMain: React.FC<MovieFormMainProps> = ({
  initialData,
  onSubmit,
  isEditMode,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Define form steps
  const steps = [
    {
      name: "Movie Details",
      component: FormStep1,
      schema: movieDetailsSchema,
    },
    {
      name: "Showtime",
      component: FormStep2,
      schema: showtimeSchema,
    },
    {
      name: "Confirmation",
      component: FormStep3,
      schema: movieSchema,
    },
  ];

  // Define default values function to reuse in both places
  const getDefaultValues = (data: Partial<Movie> = {}) => ({
    id: data.id || uuidv7(),
    title: data.title || "",
    description: data.description || "",
    rating: data.rating ?? 5,
    totalSeatsCount: data.totalSeatsCount ?? 50,
    availableSeatsCount: data.availableSeatsCount ?? 50,
    showtime: data.showtime || new Date().toISOString(),
  });

  // Initialize form with default values
  const form = useForm({
    defaultValues: getDefaultValues(),
    validators: {
      onSubmit: movieSchema,
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  // Reset form when initialData changes
  useEffect(() => {
    if (!initialData) return;

    form.reset(getDefaultValues(initialData));
  }, [initialData, isEditMode]);

  const handleNext = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      await steps[currentStep].schema.parseAsync(form.state.values);

      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log("Form validation failed", error.errors[0]?.message);
      } else {
        console.log("Unexpected validation error", error);
      }
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="max-w-3xl mx-auto"
    >
      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="flex items-center justify-center w-full">
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 shadow-md ${
                    index < currentStep
                      ? "bg-gradient-to-r from-green-400 to-green-500 text-white transform scale-105"
                      : index === currentStep
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white ring-4 ring-indigo-100 transform scale-110"
                        : "bg-gray-100 text-gray-500 border border-gray-200"
                  }`}
                >
                  {index < currentStep ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span className="text-xl font-bold">{index + 1}</span>
                  )}
                </div>
              </div>
              <div className="mt-3 text-center w-full">
                <div
                  className={`font-medium transition-all duration-300 ${
                    index === currentStep
                      ? "text-indigo-600 text-base"
                      : index < currentStep
                        ? "text-green-600 text-sm"
                        : "text-gray-500 text-sm"
                  }`}
                >
                  {step.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Render current step component */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <CurrentStepComponent form={form} isEditMode={isEditMode} />

        {/* Display form errors */}
        <FormErrors errors={form.state.errors} />

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
          <PreviousButton
            onClick={handlePrevious}
            disabled={currentStep === 0}
            hidden={currentStep === 0}
          />

          {currentStep < steps.length - 1 ? (
            <NextButton
              onClick={handleNext}
              isSubmitting={form.state.isSubmitting}
            />
          ) : (
            <SubmitButton
              isSubmitting={form.state.isSubmitting}
              isValid={form.state.isValid}
              isEditMode={isEditMode}
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default MovieFormMain;
