import { useLocation, useNavigate } from 'react-router-dom';
import { actions as authActions } from '~/store/auth/auth.js';
import { SignInForm, SignUpForm } from './libs/components/components.js';
import styles from './styles.module.css';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks.js';
import { AppPath } from '~/common/enums/enums.js';
import { useEffect } from 'react';
import { SignInRequestDto, SignUpRequestDto } from '~/common/types/types.js';
import logoSrc from '~/assets/images/logo.svg';

const Auth = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const {user} = useAppSelector(({auth}) => auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(AppPath.ROOT);
    }
  }, [user, dispatch, navigate]);

  const handleSignInSubmit = (payload: SignInRequestDto): void => {
    void dispatch(authActions.signIn(payload));
  };

  const handleSignUpSubmit = (payload: SignUpRequestDto): void => {
    void dispatch(authActions.signUp(payload));
  };

  const handleScreenRender = (screen: string): React.ReactNode => {
    switch (screen) {
      case AppPath.SIGN_IN: {
        return <SignInForm onSubmit={handleSignInSubmit} />;
      }

      case AppPath.SIGN_UP: {
        return <SignUpForm onSubmit={handleSignUpSubmit} />;
      }
    }

    return null;
  };

  return (
    <main className={styles['container']}>
      <section className={styles['auth-container']}>
        <div className={styles['left-side']}>
        <img alt="logo" className={styles['logo-wrapper']} src={logoSrc} />
        </div>
        <div className={styles['right-side']}>
          <h3 className={styles['form-title']}>
            {pathname === AppPath.SIGN_IN
              ? 'Welcome back'
              : 'Create your account'}
          </h3>
          {handleScreenRender(pathname)}
        </div>
      </section>
    </main>
  );
};

export { Auth };
