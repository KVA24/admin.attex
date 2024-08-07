import React, {useEffect} from 'react'
import AllRoutes from './routes/Routes'
import 'gridjs/dist/theme/mermaid.min.css'
import './index.scss'
import config from './config'
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";
import {useDispatch} from "react-redux";
import {getProfile} from "@/redux/auth/actions.ts";

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		console.log("Start")
		const token = sessionStorage.getItem("token")
		if (token) {
			dispatch(getProfile())
		}
	}, []);

	return (
		<React.Fragment>
			<GoogleReCaptchaProvider
				reCaptchaKey={config.GOOGLE_RECAPTCHA_KEY}
				language="en-GB"
				useRecaptchaNet={true}
				useEnterprise={false}
				scriptProps={{
					async: false, // optional, default to false,
					defer: false, // optional, default to false
					appendTo: 'head', // optional, default to "head", can be "head" or "body",
					nonce: undefined // optional, default undefined
				}}
			>
			<AllRoutes />
			</GoogleReCaptchaProvider>
		</React.Fragment>
	)
}

export default App
