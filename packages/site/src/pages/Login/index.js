import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { useForm } from 'react-hook-form';
import styled, { css } from "styled-components";
import { Form, Divider } from "semantic-ui-react";

import { loggedInUserSelector, setLoggedInUser } from "../../store/reducers/userSlice";
import scanApi from "../../services/scanApi";
import Card from "../../components/Card";
import Text from "../../components/Text";
import { TEXT_DARK_MAJOR, TEXT_DARK_MINOR, PRIMARY_THEME_COLOR } from "../../constants";
import FormInput from "../../components/FormInput";
import FormPasswordWrapper from "../../components/FormPasswordWrapper";
import ButtonPrimary from "../../components/ButtonPrimary";
import Button from "../../components/Button";
import GrayImage from "../../components/GrayImage";
import TextMinor from "../../components/TextMinor";

const CardWrapper = styled(Card)`
  max-width: 424px;
  margin: auto;
  margin-top: 28px;
  padding: 32px;
  .ui.form input:focus {
    border-color: ${PRIMARY_THEME_COLOR} !important;
  }
  label {
    color: ${TEXT_DARK_MAJOR} !important;
    font-weight: 500 !important;
    line-height: 24px !important;
    margin-bottom: 8px !important;
  }
  .field:first-child {
    margin-bottom: 24px !important;
  }
  .field:nth-child(2) {
    margin-bottom: 8px !important;
  }
  @media screen and (max-width: 408px) {
    padding: 32px 16px;
  }
`

const Header = styled(Text)`
  font-family: "Montserrat";
  font-size: 28px;
  font-weight: bold;
  line-height: 44px;
  margin-bottom: 24px;
  text-align: center;
`

const HelperWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

const RememberMe = styled.div`
  display: flex;
  align-items: center;
  color: ${TEXT_DARK_MINOR};
  p {
    line-height: 24px;
  }
  cursor: pointer;
`

const StyledTextMnor = styled(TextMinor)`
  text-decoration: underline;
`

const CheckImage = styled(GrayImage)`
  margin-right: 8px;
  ${p => p.active && css`
    -webkit-filter: grayscale(0);
    filter: grayscale(0);
    opacity: 1;
  `}
`

const StyledButtonPrimary = styled(ButtonPrimary)`
  width: 100%;
  margin-bottom: 16px !important;
`

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: 24px !important;
`

const StyledDivider = styled(Divider)`
  margin: 0 !important;
`

const SignUpWrapper = styled.div`
  margin-top: 16px;
  line-height: 24px;
  text-align: center;
  color: ${TEXT_DARK_MINOR};
`

const StyledLink = styled(Link)`
  margin-left: 8px;
  color: ${PRIMARY_THEME_COLOR};
  :hover {
    color: ${PRIMARY_THEME_COLOR};
  }
`

function Login({ location }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const loggedInUser = useSelector(loggedInUserSelector);
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  // Redirect out of here if user has already logged in
  if (loggedInUser) {
    const q = queryString.parse(location.search);
    return <Redirect to={q.returnUrl || '/'} />;
  }

  // Do login
  const onSubmit = async (formData) => {
    const loginResult = await scanApi.login(formData.username, formData.password);
    if (loginResult) {
      const loggedInUser = {
        username: loginResult.username,
        email: loginResult.email,
      };
      dispatch(setLoggedInUser(loggedInUser));

      localStorage.setItem("token", JSON.stringify({
        accessToken: loginResult.accessToken,
        refreshToken: loginResult.refreshToken,
      }));
    }
  };

  return (
    <CardWrapper>
      <Header>Login</Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Field>
            <label htmlFor="username">Username
              { errors.username
                && <span>
                    <span>*</span>
                  </span>
              }
            </label>
            <FormInput name="username" type="text" ref={register({required: true})} />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">Password
              { errors.password
                && <span>
                    <span>*</span>
                  </span>
              }
            </label>
            <FormPasswordWrapper show={showPassword} toggleClick={() => setShowPassword(!showPassword)}>
              <FormInput name="password" type={showPassword ? "text" : "password"} ref={register({required: true})} />
            </FormPasswordWrapper>
          </Form.Field>
        <HelperWrapper>
          <RememberMe onClick={() => setIsRememberMe(!isRememberMe)}>
            <CheckImage src="/imgs/circle-pass.svg" active={isRememberMe} />
            <p>Remember me</p>
          </RememberMe>
          <Link>
            <StyledTextMnor>Forgot password?</StyledTextMnor>
          </Link>
        </HelperWrapper>
        <StyledButtonPrimary type="submit" >Login</StyledButtonPrimary>
        <StyledButton>Login with web3 address</StyledButton>
        <StyledDivider />
        <SignUpWrapper>
          Don't have an account?
          <StyledLink to="/register">Sign up</StyledLink>
        </SignUpWrapper>
      </Form>
    </CardWrapper>
  );
}

export default Login;