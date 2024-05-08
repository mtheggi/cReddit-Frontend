import React, { useState, useEffect } from 'react';
import FloatingInput from '../authentication/FloatingInput';
import { patchRequest } from '../../services/Requests';
import { baseUrl } from '../../constants';
import { useParams, useNavigate } from 'react-router-dom';
import { RecoverySuccessToast, RecoveryFailedToast } from "./RecoveryToast";
import { ToastContainer, toast } from "react-toastify";

/**
 * Component for handling user password recovery.
 *
 * @component
 * @returns {JSX.Element} The PasswordRecovery component that includes input fields
 * for new password and password confirmation, along with a submit button to finalize
 * the password recovery process.
 */

const PasswordRecovery = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [recoveryError, setRecoveryError] = useState(null);
  const { token } = useParams();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    return password && password.length >= 8;
  };

  const passwordsMatch = () => {
    return password === confirmPassword;
  };

  const handleRecoverySubmit = async () => {
    if (!recoveryError && validatePassword(password) && passwordsMatch()) {
      const response = await patchRequest(`${baseUrl}/user/reset-password/${token}`, {
        password,
        confirmPassword,
      });
      if (response.status !== 200 && response.status !== 201) {
        setRecoveryError(response.data.message);
        RecoveryFailedToast(response.data.message);
      } else {
        RecoverySuccessToast("Password Changed Successfully");
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    }
  };

  return (
    <div className='w-full h-full ' style={{backgroundImage: 'url(https://www.redditstatic.com/shreddit/assets/account/standalone-auth-bg.svg)'}}>
    <div className="community-modal flex flex-row items-center justify-center pt-10">
      <ToastContainer
        position="bottom-center"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="colored"
      />
      <div className='overlay'></div>
      <div className='z-30 flex flex-col w-100% h-100% msm:w-132 msm:h-150'>
        <div className="flex min-w-88 flex-col w-full h-full msm:px-8 pl-2 pr-2 bg-reddit_menu msm:rounded-3xl">
          <div className="h-full w-full flex flex-col">
            <div className="flex flex-col h-full px-10 pt-8">
              <h1 className="text-2xl text-white font-bold mb-2">
                Reset your password
              </h1>

                <div className="flex flex-col">
                  <div className="min-h-[70px] px-2 mt-4">
                    <FloatingInput
                      id="password_recovery_new_password"
                      label="New Password"
                      validateInput={validatePassword}
                      setInputNameOnChange={setPassword}
                      backendValidationError={recoveryError}
                      setBackendValidationError={setRecoveryError}
                    />
                  </div>

                  <div className="min-h-[70px] px-2 mt-4">
                    <FloatingInput
                      id="password_recovery_confirm_password"
                      label="Confirm New Password"
                      validateInput={validatePassword}
                      setInputNameOnChange={setConfirmPassword}
                      backendValidationError={recoveryError}
                      setBackendValidationError={setRecoveryError}
                    />
                  </div>

                  {recoveryError && <div className="relative ml-3 mt-3 h-3 text-xs font-light w-85">
                    <p className="text-red-400">{recoveryError}</p>
                  </div>}
                </div>


                <p className="text-xs text-gray-400 mt-65 mb-2 text-center">
                  Resetting your password will log you out on all devices.
                </p>
                <div className="w-full h-[96px] px-2 flex justify-center items-center">
                  <div
                    id="recovery_submit"
                    role="button"
                    aria-disabled={!(passwordsMatch() && validatePassword(password) && !recoveryError)}
                    className={`${passwordsMatch() && validatePassword(password) && !recoveryError ? 'bg-reddit_upvote hover:bg-orange-800 cursor-pointer text-white' : 'text-gray-500'} flex w-full h-[48px] items-center justify-center rounded-3xl bg-reddit_search`}
                    onClick={handleRecoverySubmit}
                  >
                    <span className="flex items-center gap-[8px] text-[14px] font-[600]">
                      Continue
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;
