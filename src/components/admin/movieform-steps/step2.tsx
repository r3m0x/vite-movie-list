import { useForm } from "@tanstack/react-form";
import { showtimeSchema } from "../../../schemas/movieSchema";
import { Movie } from "../../../types/movie";

interface Step2Props {
  formData: Partial<Movie>;
  updateFormData: (data: Partial<Movie>) => void;
  isEditMode: boolean;
}

const FormStep2: React.FC<Step2Props> = ({ 
  formData, 
  updateFormData,
  isEditMode
}) => {
  const currentShowtime = formData.showtime 
    ? new Date(formData.showtime) 
    : new Date();
  
  const formatDateForInput = (date: Date) => {
    return date.toISOString().slice(0, 16);
  };

  const form = useForm({
    defaultValues: {
      showtime: currentShowtime,
    },
    onSubmit: async (values) => {
      updateFormData({ showtime: values.showtime.toISOString() });
      return { status: "success" };
    }
  });

  return (
    <form.Provider>
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
            name="showtime"
            validators={{
              onChange: (value) => {
                try {
                  showtimeSchema.shape.showtime.parse(value);
                  return { success: true };
                } catch (error: any) {
                  return {
                    success: false,
                    error: error?.message || 'Invalid date'
                  };
                }
              }
            }}
            children={(field) => (
              <div>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                  Showtime
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="datetime-local"
                  value={formatDateForInput(field.state.value)}
                  onChange={(e) => field.handleChange(new Date(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {field.state.meta.touchedErrors ? (
                  <div className="text-red-500 text-sm mt-1">{field.state.meta.touchedErrors}</div>
                ) : null}
              </div>
            )}
          />
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
          <h3 className="text-sm font-medium text-yellow-800">Showtime Guidelines</h3>
          <ul className="mt-2 text-sm text-yellow-700 list-disc pl-5 space-y-1">
            <li>Schedule movies at least 24 hours in advance</li>
            <li>Avoid scheduling multiple movies at the same time</li>
            <li>Consider peak hours for popular movies</li>
          </ul>
        </div>
      </form>
    </form.Provider>
  );
};

export default FormStep2;