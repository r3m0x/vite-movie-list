import { useForm } from "@tanstack/react-form";
import { movieDetailsSchema } from "../../../schemas/movieSchema";
import { Movie } from "../../../types/movie";
import { ZodError } from "zod";

interface Step1Props {
  formData: Partial<Movie>;
  updateFormData: (data: Partial<Movie>) => void;
  isEditMode: boolean;
}

const FormStep1: React.FC<Step1Props> = ({
  formData,
  updateFormData,
  isEditMode,
}) => {
  const form = useForm({
    defaultValues: {
      title: formData.title || "",
      description: formData.description || "",
      rating: formData.rating || 0,
      totalSeatsCount: formData.totalSeatsCount || 50,
      availableSeatsCount: formData.availableSeatsCount || 50,
    },
    onSubmit: async (values) => {
      updateFormData(values.value);
      return { status: "success" };
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <div>
        <form.Field
          name="title"
          validators={{
            onChange: (value) => {
              const result = movieDetailsSchema.shape.title.safeParse(value);
              return result.success
                ? { success: true }
                : {
                    success: false,
                    error:
                      result.error.errors[0]?.message || "Title is required",
                  };
            },
          }}
        >
          {(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                Movie Title
              </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {field.state.meta.touchedErrors ? (
                <div className="text-red-500 text-sm mt-1">
                  {field.state.meta.touchedErrors}
                </div>
              ) : null}
            </div>
          )}
        </form.Field>
      </div>

      <div>
        <form.Field
          name="description"
          validators={{
            onChange: (value) => {
              try {
                movieDetailsSchema.shape.description.parse(value);
                return { success: true };
              } catch (error: any) {
                return {
                  success: false,
                  error: error?.message || "Description is required",
                };
              }
            },
          }}
        >
          {(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {field.state.meta.touchedErrors ? (
                <div className="text-red-500 text-sm mt-1">
                  {field.state.meta.touchedErrors}
                </div>
              ) : null}
            </div>
          )}
        </form.Field>
      </div>

      <div>
        <form.Field
          name="rating"
          validators={{
            onChange: (value) => {
              try {
                movieDetailsSchema.shape.rating.parse(value);
                return { success: true };
              } catch (error: any) {
                return {
                  success: false,
                  error: error?.message || "Invalid rating",
                };
              }
            },
          }}
        >
          {(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                Rating (0-10)
              </label>
              <input
                id={field.name}
                name={field.name}
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={field.state.value}
                onChange={(e) => field.handleChange(parseFloat(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {field.state.meta.touchedErrors ? (
                <div className="text-red-500 text-sm mt-1">
                  {field.state.meta.touchedErrors}
                </div>
              ) : null}
            </div>
          )}
        </form.Field>
      </div>

      <div>
        <form.Field
          name="totalSeatsCount"
          validators={{
            onChange: (value) => {
              try {
                movieDetailsSchema.shape.totalSeatsCount.parse(value);
                return { success: true };
              } catch (error: any) {
                return {
                  success: false,
                  error: error?.message || "Invalid total seats",
                };
              }
            },
          }}
        >
          {(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                Total Seats
              </label>
              <input
                id={field.name}
                name={field.name}
                type="number"
                min="1"
                value={field.state.value}
                onChange={(e) => field.handleChange(parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {field.state.meta.touchedErrors ? (
                <div className="text-red-500 text-sm mt-1">
                  {field.state.meta.touchedErrors}
                </div>
              ) : null}
            </div>
          )}
        </form.Field>
      </div>

      <div>
        <form.Field
          name="availableSeatsCount"
          validators={{
            onChange: (value) => {
              try {
                movieDetailsSchema.shape.availableSeatsCount.parse(value);
                return { success: true };
              } catch (error: any) {
                return {
                  success: false,
                  error: error?.message || "Invalid available seats",
                };
              }
            },
          }}
        >
          {(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                Available Seats
              </label>
              <input
                id={field.name}
                name={field.name}
                type="number"
                min="0"
                value={field.state.value}
                onChange={(e) => field.handleChange(parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {field.state.meta.touchedErrors ? (
                <div className="text-red-500 text-sm mt-1">
                  {field.state.meta.touchedErrors}
                </div>
              ) : null}
            </div>
          )}
        </form.Field>
      </div>
    </form>
  );
};

export default FormStep1;
