import React from "react";
import { useForm } from "@mantine/form";
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Container,
} from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useSearchParams, useNavigate } from "react-router-dom";
import { signin } from "../../../slices/authSlice";
import styles from "./Signin.module.css";

/**
object đăng nhập:
{
  "taiKhoan": "string",
  "matKhau": "string"
}
*/

const Signin = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  //Mantine
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },

    validate: {
      taiKhoan: (value) =>
        value.length < 6 ? "Account must be at least 6 characters" : null,
      matKhau: (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : null,
    },
  });

  const handleSubmit = (values) => {
    dispatch(signin(values));
  };

  if (user) {
    const redirectUrl = searchParams.get("redirectUrl");
    // Có thông tin user => đã đăng nhập => redirect về redirectUrl hoặc Home
    return <Navigate to={redirectUrl || "/"} replace />;
  }

  return (
    <>
      <Container>
        <Paper radius={15} p={30} shadow="xl">
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Title order={2} align="center" mt="md" mb={50}>
              Log in
            </Title>

            <TextInput
              label="Username"
              size="md"
              {...form.getInputProps("taiKhoan")}
            />
            <PasswordInput
              label="Password"
              mt="md"
              size="md"
              {...form.getInputProps("matKhau")}
            />
            <Button
              mt="xl"
              size="md"
              type="submit"
              className={styles.signin__button}
              disabled={loading}
            >
              Log in
            </Button>
            {error && <Text color="red">{error}</Text>}
          </form>
          <Text align="center" mt="md">
            Not have an account yet?{" "}
            <span
              onClick={() => navigate("/signup")}
              className={styles.signin__dangKy}
            >
              Register now!
            </span>
          </Text>
        </Paper>
      </Container>
    </>
  );
};

export default Signin;
