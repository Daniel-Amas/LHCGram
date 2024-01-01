import * as z from "zod";

export const SignupValidaton = z.object({
    name: z.string().min(2,{message: 'Name must be at least 2 characters'}),
    username: z.string().min(2, {message: 'Username is too short'}),
    email: z.string().email(),
    password: z.string().min(8, {message: 'Password must be at least 8 characters'}),
})

export const SigninValidaton = z.object({
    //username: z.string().min(2, {message: 'Username is too short'}),
    email: z.string().email(),
    password: z.string().min(8, {message: 'Password must be at least 8 characters'}),
})