'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    login: z.string(),
    password: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export default function SignInPage() {
    const f = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const OnSubmit = async (data: FormData) => {
        try {
            // const res = await axios.post(`${await getApiUrl()}/api/accounts/login`, {
            //     email: data.login,
            //     password: data.password
            // });

        } catch (e) {
            console.log(e);
        }
    };

    const t = useTranslations("Forms.auth.login");
    return (
        <div className="container min-h-screen flex items-center justify-center p-5">
            <form autoComplete="off"
                onSubmit={f.handleSubmit(OnSubmit)}
                className="max-w-100 w-full">
                <h1>{t("header")}</h1>
                <div className="field">
                    <label>{t("login.label")}</label>
                    <input type="text" placeholder={t("login.placeholder")} />
                </div>
                <div className="field">
                    <label>{t("password.label")}</label>
                    <input type="password" placeholder={t("password.placeholder")} />
                </div>
                <Link href="/register">{t("register-link")}</Link>
                <button type="submit">
                    {t("submit")}
                </button>
            </form>
        </div>
    );
}