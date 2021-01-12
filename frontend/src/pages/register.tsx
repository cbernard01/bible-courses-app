import React from "react"
import {useRouter} from "next/router";
import {Box, Button} from "@chakra-ui/react"
import {Form, Formik} from "formik";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import {useRegisterMutation} from "../generated/graphql";
import {toErrorMap} from "../utils/toErrorMap";

interface registerProps {

}

const register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [{}, register] = useRegisterMutation();

  return (
    <Wrapper variant={"small"}>
      <Formik initialValues={{username: "", password: ""}} onSubmit={async ({username, password}, {setErrors}) => {
        const response = await register({username, password});

        if (response.data?.register.errors) setErrors(toErrorMap(response.data.register.errors))
        else if (response.data?.register.user) router.push("/");
      }}>
        {({isSubmitting}) => (
          <Form>
            <Box>
              <InputField name={"username"} placeholder={"username"} label={"Username"}/>
            </Box>
            <Box mt={4}>
              <InputField name={"password"} placeholder={"password"} label={"Password"} type={"password"}/>
            </Box>
            <Button mt={4} type={"submit"} isLoading={isSubmitting} colorScheme={"teal"}>register</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default register;
