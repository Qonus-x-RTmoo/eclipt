'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    username: z.string()
        .min(2, "Username should be at least 2 characters long")
        .max(64, "Username can't be longer than 64 characters"),
    email: z.string().email(),
    password: z.string().min(8, "Password should be atleast 8 characters"),
    confirm_password: z.string()
}).superRefine(({ confirm_password, password }, ctx) => {
    if (confirm_password !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['confirm_password']
        });
    }
});

type FormData = z.infer<typeof formSchema>;

export default function RegisterPage() {
    const f = useForm<FormData>({
        resolver: zodResolver(formSchema),
    })

    const OnSubmit = async (data: FormData) => {
        // const res = await axios.post(`${await getApiUrl()}/api/accounts/register`, {
        //     email: data.email,
        //     username: data.username,
        //     password: data.password,
        //     password2: data.confirm_password,
        // });
    };

    const t = useTranslations("Forms.auth.register");
    return (
        <div className="container min-h-screen flex items-center justify-center p-5">
            <form autoComplete="off"
                onSubmit={f.handleSubmit(OnSubmit)}
                className="max-w-100 w-full">
                <h1>{t("header")}</h1>
                <div className="field">
                    <label>{t("username.label")}</label>
                    <input type="text" placeholder={t("username.placeholder")} />
                </div>
                <div className="field">
                    <label>{t("email.label")}</label>
                    <input type="email" placeholder={t("email.placeholder")} />
                </div>
                <div className="field">
                    <label>{t("password.label")}</label>
                    <input type="password" placeholder={t("password.placeholder")} />
                </div>
                <div className="field">
                    <label>{t("confirm_password.label")}</label>
                    <input type="password" placeholder={t("confirm_password.placeholder")} />
                </div>
                <Link href="/login">{t("login-link")}</Link>
                <button type="submit">
                    {t("submit")}
                </button>
            </form>
        </div>
    )
}