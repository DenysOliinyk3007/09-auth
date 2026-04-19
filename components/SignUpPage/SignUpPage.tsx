import css from './SignUpPage.module.css'

export type SignUpPageProps = {
    handleSubmit: (formData: FormData) => void | Promise<void>,
    error: string,
  }

export default function SignUpPage({handleSubmit, error}: SignUpPageProps) {
    return (
        <main className={css.mainContent}>
            <h1 className={css.formTitle}>Sign up</h1>
            <form action = {handleSubmit} className={css.form} >
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
                        Register
                    </button>
                </div>

                {error && <p className={css.error}>{error}</p>}
            </form>
        </main>
    )
}