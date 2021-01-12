import React from "react"
import {useRouter} from "next/router";
import {Box, Button} from "@chakra-ui/react"
import {Form, Formik} from "formik";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import {toErrorMap} from "../utils/toErrorMap";
import {useLoginMutation} from "../generated/graphql";

const login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [{}, login] = useLoginMutation();

  return (
    <Wrapper variant={"small"}>
      <Formik initialValues={{username: "", password: ""}} onSubmit={async ({username, password}, {setErrors}) => {
        const response = await login({username, password});

        if (response.data?.login.errors) setErrors(toErrorMap(response.data.login.errors))
        else if (response.data?.login.user) router.push("/");
      }}>
        {({isSubmitting}) => (
          <Form>
            <Box>
              <InputField name={"username"} placeholder={"username"} label={"Username"}/>
            </Box>
            <Box mt={4}>
              <InputField name={"password"} placeholder={"password"} label={"Password"} type={"password"}/>
            </Box>
            <Button mt={4} type={"submit"} isLoading={isSubmitting} colorScheme={"teal"}>Login</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default login;
