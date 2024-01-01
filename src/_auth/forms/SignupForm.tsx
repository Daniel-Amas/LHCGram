import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {Link, useNavigate} from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { SignupValidaton } from "@/lib/validation";
import Loader from "@/components/shared/loader";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

 

const SignupForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext();

  //Queries
  const {mutateAsync: createUserAccount, isPending: isCreatingAccount} = useCreateUserAccount();
  const {mutateAsync: signInAccount, isPending: isSigningIn} = useSignInAccount();

  //Form
   const form = useForm<z.infer<typeof SignupValidaton>>({
    resolver: zodResolver(SignupValidaton),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  })
 
  //Handlers
  const handleSignup = async (user: z.infer<typeof SignupValidaton>) => {
    try{
      const newUser = await createUserAccount(user);

      if(!newUser){
        //Alert if no user is created
        return toast({title: "Sign up failed. Please try again."})
      }

      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if(!session){
        return toast({title: 'Sign in failed. Please try again.'})
      }
      
      const isLoggedIn = await checkAuthUser();

      if(isLoggedIn){
        form.reset();

        navigate('/')
      }else{
        return  toast({title: 'Sign up failed. Please try again.'})
      }
    } catch (error){
      console.log({error})
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a New Account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">Please enter your details</p>
      
        <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-8 flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
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
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
              {isCreatingAccount ? (
                <div className="flex-center gap-2">
                  <Loader/>Loading...
                </div>
              ): "Sign up"}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Have an account already?
            <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignupForm