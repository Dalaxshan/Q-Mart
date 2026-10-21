"use client";
import { useState } from "react";
import ShortService from "@/components/service/ShortService";
import FooterOne from "@/components/footer/FooterOne";
import HeaderTwo from "@/components/header/HeaderTwo";
import { customerApi } from "@/app/api/customers/routes";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "", email: "", phoneNo: "", country: "",
    province: "", city: "", streetAddress: "", password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      await customerApi.register(form);
      setSuccess("Account registered successfully!");
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Registration failed");
    }
  };

  return (
    <div className="demo-one register-page">
      <HeaderTwo />
      <>
        <div className="rts-navigation-area-breadcrumb bg_light-1">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="navigator-breadcrumb-wrapper">
                  <a href="index.html">Home</a>
                  <i className="fa-regular fa-chevron-right" />
                  <a className="current" href="register.html">
                    Register
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-seperator bg_light-1">
          <div className="container">
            <hr className="section-seperator" />
          </div>
        </div>

        {/* rts register area start */}
        <div className="rts-register-area rts-section-gap bg_light-1">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="registration-wrapper-1">
                  <div className="logo-area mb--0">
                    <img
                      className="mb--10"
                      src="assets/images/logo/logo-01.png"
                      alt="logo"
                    />
                  </div>
                  <h3 className="title">Register Into Your Account</h3>

                  <form onSubmit={handleSubmit} className="registration-form">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-12">
                        <div className="input-wrapper">
                          <label htmlFor="fullName">Full Name*</label>
                          <input type="text" id="fullName" value={form.fullName} onChange={handleChange} required />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-12">
                        <div className="input-wrapper">
                          <label htmlFor="email">Email*</label>
                          <input type="email" id="email" value={form.email} onChange={handleChange} required />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-12">
                        <div className="input-wrapper">
                          <label htmlFor="phoneNo">Phone No*</label>
                          <input type="text" id="phoneNo" value={form.phoneNo} onChange={handleChange} required />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-12">
                        <div className="input-wrapper">
                          <label htmlFor="country">Country*</label>
                          <input type="text" id="country" value={form.country} onChange={handleChange} required />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-12">
                        <div className="input-wrapper">
                          <label htmlFor="province">Province</label>
                          <input type="text" id="province" value={form.province} onChange={handleChange} />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-12">
                        <div className="input-wrapper">
                          <label htmlFor="city">City</label>
                          <input type="text" id="city" value={form.city} onChange={handleChange} />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="input-wrapper">
                          <label htmlFor="streetAddress">Street Address</label>
                          <input type="text" id="streetAddress" value={form.streetAddress} onChange={handleChange} />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="input-wrapper">
                          <label htmlFor="password">Password*</label>
                          <input type="password" id="password" value={form.password} onChange={handleChange} required />
                        </div>
                      </div>

                      {error && <div className="col-lg-12"><p style={{ color: "red" }}>{error}</p></div>}
                      {success && <div className="col-lg-12"><p style={{ color: "green" }}>{success}</p></div>}

                      <div className="col-lg-12">
                        <button type="submit" className="rts-btn btn-primary">
                          Register Account
                        </button>
                      </div>
                    </div>

                    <div className="another-way-to-registration">
                      <div className="registradion-top-text">
                        <span>Or</span>
                      </div>
                      <p>
                        Already Have Account? <a href="#">Login</a>
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
      <FooterOne />
    </div>
  );
}