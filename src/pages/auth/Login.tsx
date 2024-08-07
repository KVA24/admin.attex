import {useCallback, useEffect, useState} from 'react'
import {Link, Navigate, useLocation} from 'react-router-dom'
import {AppDispatch, RootState} from '../../redux/store'
import {loginUser, resetAuth} from '../../redux/actions'
import {useDispatch, useSelector} from 'react-redux'

// form validation
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

// components
import AuthLayout from '../../components/AuthPageLayout/AuthLayout'
import AuthContainer from '../../components/AuthPageLayout/AuthContainer'
import VerticalForm from '../../components/VerticalForm'
import FormInput from '../../components/FormInput'
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";

interface UserData {
  username: string
  password: string
  otp: string
}

/**
 * Bottom Links goes here
 */
const BottomLink = () => {
  return (
    <div className="text-center my-4">
      <p className="text-muted">
        Don&apos;t have an account?&nbsp;
        <Link to="/auth/register" className="text-muted ms-1 link-offset-3 underline underline-offset-4">
          <b>Sign Up</b>
        </Link>
      </p>
    </div>
  )
}

const PasswordInputChild = () => {
  return (
    <Link to="/auth/recover-password" className="text-muted text-xs underline decoration-dashed underline-offset-4">
      Forgot your password?
    </Link>
  )
}

const Login = () => {
  const dispatch = useDispatch<AppDispatch>()

  const {user, userLoggedIn, loading} = useSelector((state: RootState) => ({
    user: state.Auth.user,
    loading: state.Auth.loading,
    error: state.Auth.error,
    userLoggedIn: state.Auth.userLoggedIn,
  }))

  const [sign, setSign] = useState("")
  const {executeRecaptcha} = useGoogleReCaptcha();

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }
    const token = await executeRecaptcha();
    setSign(token)
  }, [executeRecaptcha]);

  useEffect(() => {
    handleReCaptchaVerify().then()
  }, [handleReCaptchaVerify]);

  useEffect(() => {
    dispatch(resetAuth())
    // dispatch(getProfile())
  }, [dispatch])

  /*
  form validation schema
  */
  const schemaResolver = yupResolver(
    yup.object().shape({
      username: yup.string().required('Please enter Username'),
      password: yup.string().required('Please enter Password'),
      otp: yup.string()
    })
  )

  /*
  handle form submission
  */
  const onSubmit = (formData: UserData) => {
    dispatch(loginUser(formData['username'], formData['password'], formData['otp'], sign))
  }

  const location = useLocation()

  // redirection back to where user got redirected from
  const redirectUrl = location?.search?.slice(6) || '/'

  return (
    <>
      {(userLoggedIn || user) && <Navigate to={redirectUrl}/>}

      <AuthContainer>
        <AuthLayout authTitle="Sign In" helpText="Enter your email or username and password to access.">
          <VerticalForm<UserData>
            onSubmit={onSubmit}
            resolver={schemaResolver}
            defaultValues={{username: 'admin', password: 'admin123456'}}
          >
            <FormInput label="Username" type="text" name="username" className="form-input"
                       placeholder="Enter your email" containerClass="mb-6 space-y-2"
                       labelClassName="font-semibold text-gray-500" required/>

            <FormInput label="Password" type="password" name="password" placeholder="Enter your password"
                       className="form-input rounded-e-none" containerClass="mb-6 space-y-2"
                       labelClassName="font-semibold text-gray-500"
                       labelContainerClassName="flex justify-between items-center mb-2" required>
              {/*<PasswordInputChild/>*/}
            </FormInput>

            <FormInput label="Otp" type="text" name="otp" className="form-input"
                       placeholder="Enter otp number" containerClass="mb-6 space-y-2"
                       labelClassName="font-semibold text-gray-500" required/>

            {/*<FormInput label="Remember me" type="checkbox" name="checkbox"*/}
            {/*           className="form-checkbox rounded text-primary" containerClass="mb-6" labelClassName="ms-2"*/}
            {/*           defaultChecked/>*/}

            <div className="text-center mb-6">
              <button className="btn bg-primary text-white" type="submit" disabled={loading}>
                {loading ? <div
                  className="animate-spin w-5 h-5 border-[3px] border-current border-t-transparent text-secondary rounded-full"
                  role="status" aria-label="loading">
                  <span className="sr-only">Loading...</span>
                </div> : "Log In"}
              </button>
            </div>
          </VerticalForm>
        </AuthLayout>
      </AuthContainer>
    </>
  )
}

export default Login
