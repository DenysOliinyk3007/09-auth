import css from './SignInPage.module.css'

export type SignInPageProps = {
    handleSubmit: (formData: FormData) => void | Promise<void>,
    error: string,
  }


export default function SingInPage({handleSubmit, error}: SignInPageProps) {
    return (
        <main className={css.mainContent}>
            <form action = {handleSubmit} className={css.form}>
                <h1 className={css.formTitle}>Sign in</h1>

                <div className={css.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" className={css.input} required />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" className={css.input} required />
                </div>

                <div className={css.actions}>
                    <button type="submit" className={css.submitButton}>
                        Log in
                    </button>
                </div>

                {error && <p className={css.error}>{error}</p>}
            </form>
        </main>

    )
}