import { useState } from "react";
import { useForm } from "@mantine/form";
import authAPI from "../../../services/authAPI";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Container,
  Modal,
  Center,
} from "@mantine/core";

const Signup = () => {
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  //Mantine
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
    },

    validate: {
      taiKhoan: (value) =>
        value.length < 6 ? "User name must be at least 6 characters" : null,
      matKhau: (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email!"),
      soDt: (value) =>
        value.length < 10 ? "Invalid number!" : null,
    },
  });

  const handleSubmit = (values) => {
    (async () => {
      try {
        await authAPI.signup(values);
        setError("");
        setOpened(true);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    })();
  };

  return (
    <>
      <Container>
        <Paper radius={15} p={30} shadow="xl">
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Title order={2} align="center" mt="md" mb={50}>
              Sign up
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
            <TextInput
              label="Email"
              size="md"
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Phone number"
              size="md"
              {...form.getInputProps("soDt")}
            />
            <TextInput
              label="Fullname"
              size="md"
              {...form.getInputProps("hoTen")}
            />
            <Button
              mt="xl"
              size="md"
              type="submit"
              className={styles.signup__button}
            >
              Sign up
            </Button>
            {error && <Text color="red">{error}</Text>}
          </form>
        </Paper>
      </Container>

      <Modal
        withCloseButton={false}
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        className="text-center"
      >
        <Text size={25} fw={700}>
          Signed up successfully!
        </Text>
        <Button
          size="md"
          className={styles.signup__button}
          onClick={() => navigate("/signin")}
        >
          Log in now!
        </Button>
      </Modal>
    </>
  );
};

export default Signup;
