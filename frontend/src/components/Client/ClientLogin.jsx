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
import { ADMINHOME, HOME, WORKERHOME } from "./../../router/index";
import { useUserContext } from "../../context/UserContext";
import { Link } from 'react-router-dom';

const formSchema = z.object({
    email: z.string().min(2).max(30),
    password: z.string().min(6).max(50),
});

export default function ClientLogin() {
    const { setAuthenticated, setUser  } = useUserContext();
    const context = useUserContext();

    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "abdelali@gmail.com",
            password: "123456",
        },
    });

    const [loading, setLoading] = useState(false);

    const onSubmit = async (values) => {
        setLoading(true);
        await context.login(values.email, values.password)
            .then((value) => {
                
                if (value.status === 200) {
                    setAuthenticated(true);
                    setUser(value.data.data.user);
                    console.log(value.data.data.user);
                    window.localStorage.setItem('token', value.data.data.token)
                    window.localStorage.setItem('user',JSON.stringify(value.data.data.user))
                    if(value.data.data.user.role_id === 3)
                    {
                        navigate(HOME);
                    }
                    else if (value.data.data.user.role_id === 2)
                    {
                        navigate(WORKERHOME);
                    }
                    else if (value.data.data.user.role_id === 1)
                    {
                        navigate(ADMINHOME);
                    }
                    
                }
            })
            .catch(({ response }) => {
                form.setError("globalError", {
                    message: response.data.data.error,
                });
            });

        setLoading(false);
    };
    /****/

    return (
        <div className="mt-24 mx-12 sm:mx-48  md:mx-96 space-y-4">
            <h1 className="font-semibold text-3xl">LOGIN FORM</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
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
                <p>No a member yet? <Link to={'/signup'}>SIGN UP</Link></p>
            </div>
            
        </div>
    );
}
