"use client";

import ShortService from "@/components/service/ShortService";
import FooterThree from "@/components/footer/FooterThree";
import Link from "next/link";
import HeaderTwo from "@/components/header/HeaderTwo";
import { customerApi } from "@/app/api/customers/routes";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((current) => ({ ...current, [e.target.id]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const loginResponse = await customerApi.login(form);
      localStorage.setItem("customer", JSON.stringify(loginResponse.customer));
      localStorage.setItem("authToken", loginResponse.token);
      router.push("/account");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="demo-one register-page login-page">
      <HeaderTwo />

      <>
        <div className="rts-navigation-area-breadcrumb bg_light-1">
          <div className="w-full max-w-[1696px] m-auto px-[15px]">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full max-w-full shrink-0 px-[0.75rem]">
                <div className="navigator-breadcrumb-wrapper">
                  <Link href="/">Home</Link>
                  <i className="fa-regular fa-chevron-right" />
                  <Link className="current" href="/login">
                    Log In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-seperator bg_light-1">
          <div className="w-full max-w-[1696px] m-auto px-[15px]">
            <hr className="section-seperator" />
          </div>
        </div>
        <div className="rts-register-area rts-section-gap bg_light-1">
          <div className="w-full max-w-[560px] m-auto px-[15px]">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full max-w-full shrink-0 px-[0.75rem]">
                <div className="registration-wrapper-1">
                 
                  <h3 className="title">Login Into Your Account</h3>
                  <form onSubmit={handleSubmit} className="registration-form">
                    <div className="input-wrapper">
                      <label htmlFor="email">Email*</label>
                      <input type="email" id="email" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="input-wrapper">
                      <label htmlFor="password">Password*</label>
                      <input type="password" id="password" value={form.password} onChange={handleChange} required />
                    </div>
                    {error && <p className="login-error" role="alert">{error}</p>}
                    <button type="submit" className="rts-btn btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? "Logging In..." : "Login Account"}
                    </button>
                    <div className="another-way-to-registration">
                      <div className="registradion-top-text">
                        <span>Or</span>
                      </div>
                    
                      <p>
                        Don't have an account?{" "}
                        <Link href="/register">Registration</Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* rts register area end */}
      </>

      <ShortService />
         <FooterThree/>
    </div>
  );
}
