import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { axiosClient } from "../../api/axios";
import { useNavigate } from "react-router";
import { ADMINHOME, HOME , LOGIN } from "../../router/index";
import { useUserContext } from "../../context/UserContext";
import { Link } from 'react-router-dom';

const formSchema = z.object({
    firstname: z.string().min(2).max(30),
    lastname: z.string().min(2).max(30),
    email: z.string().min(2).max(30),
    password: z.string().min(6).max(50),
    c_password: z.string().min(6).max(50),
});

export default function ClientSignUp() {
    const { setAuthenticated } = useUserContext();
    const context = useUserContext();

    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            c_password: "",
        },
    });

    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");

    const onSubmit = async (values) => {
        setLoading(true);
        const { firstname, lastname, email, password, c_password } = values;

        await context.signup(firstname, lastname, email, password, c_password)
            .then((value) => {
                console.log(value);
                if (value.status === 200) {
                 setShow(true);
                setMessage(value.data.message);

                setTimeout(() => {
                    navigate(LOGIN);
                }, 1500);
                    
                }
            })
            .catch(({ response }) => {
                console.log(response.data.data);
                // form.setError("email", {
                //     message: response.data.data.email,
                // });
                for (const field in formSchema.shape) {
                    if (response.data.data[field]) {
                        form.setError(field, {
                            message: response.data.data[field],
                        });
                    }
                }
            });

        setLoading(false);
    };

    return (
        <div className="mt-24 mx-12 sm:mx-48  md:mx-96 space-y-4">
            <h1 className="font-semibold text-3xl">SIGN UP FORM</h1>
            {show && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
                    <p className="font-bold">SUCCESS!</p>
                    <p>{message}</p>
                </div>
            )}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="flex space-x-8">
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="First Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Last Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="example@example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="c_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Confirm Password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div>
                        {form.formState.errors.globalError && (
                            <div className="bg-red-400 text-white p-3 pl-12 w-1/3">
                                {form.formState.errors.globalError.message}
                            </div>
                        )}
                    </div>

                    <Button disabled={loading} type="submit">
                        {loading && (
                            <div role="status">
                                <svg
                                    aria-hidden="true"
                                    className="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}
                        Submit
                    </Button>
                </form>
            </Form>
            
            <div>
                <p>Already a member? <Link to={'/login'}>LOGIN</Link></p>
            </div>
        </div>
    );
}
