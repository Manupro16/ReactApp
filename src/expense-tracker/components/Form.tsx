import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    id: z.string().optional(),
    description: z.string().min(3, { message: "item must be at least 3 characters" }),
    amount: z.number({invalid_type_error: "a number is required"}).min(1, { message: "number is required" }),
    category: z.string()
        .refine(val => val !== "", { message: "Category is required" })
        .refine(val => ["groceries", "utilities", "entertainment"].includes(val), { message: "Invalid category" })
});

export type FormData = z.infer<typeof schema>;

interface FormProps {
    onSubmitClick: (itemData: FormData) => void;
}


function Form({ onSubmitClick }: FormProps) {
    const { register, handleSubmit, formState: { errors} } = useForm<FormData>({resolver: zodResolver(schema)});



    function onSubmit(data: FormData) {
        console.log("hello here is the data",data);
        onSubmitClick(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input {...register('description')} id="description" type="text"
                       className={`form-control ${errors.description ? 'is-invalid' : ''}`}/>
                {errors.description && <p className="invalid-feedback">{errors.description.message}</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="amount" className="form-label">Amount</label>
                <input {...register('amount', {valueAsNumber: true})} id="amount" type="number"
                       className={`form-control ${errors.amount ? 'is-invalid' : ''}`}/>

                {errors.amount && <p className="invalid-feedback">{errors.amount.message}</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select {...register('category')} id="category" name="category" className={`form-control ${errors.category ? 'is-invalid' : ''}`}>
                    <option value="">Select a category</option>
                    <option value="groceries">Groceries</option>
                    <option value="utilities">Utilities</option>
                    <option value="entertainment">Entertainment</option>
                </select>
                {errors.category && <p className="invalid-feedback">{errors.category.message}</p>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default Form;