import React, { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import {
  Error,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../../components/auth-components";
import oiConstant from "../../oi-constant";

export default function UserLogin() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Error 내용 존재 시, 초기화
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);

      // user activation 확인
      // fail 이면, service plan으로
      navigate("/");
    } catch (e) {
      console.log(e);
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
      // set Error
    } finally {
      setLoading(false);
    }
    console.log(name, email, password);
  };
  return (
    <Wrapper>
      <Title>Log into 🛠️</Title>
      <Form onSubmit={onSubmit}>
        <Input
          name="email"
          onChange={onChange}
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          name="password"
          onChange={onChange}
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        <Input type="submit" value={isLoading ? "Loading..." : "Log in"} />
      </Form>
      {error != "" ? <Error>{error}</Error> : null}
      <Switcher>
        Don't have an account?{" "}
        <Link
          to={`${oiConstant.url.brochure.base}${oiConstant.url.brochure.createAccount}`}
        >
          Create One &rarr;
        </Link>
      </Switcher>
    </Wrapper>
  );
}
