
import Image from 'next/image';
import React from 'react';
import { AiFillInstagram, AiFillTwitterCircle ,AiFillFacebook} from 'react-icons/ai'
import ButtonLogin from '../buttons/button-login.component';
import ButtonSecondary from '../buttons/button-secondary.component';

export default function MainHeader() {
    return (
        <div className="container-fluid position-relative nav-bar p-0">
            <div className="container-fluid nav-bg py-3 d-none d-md-block">
                <div style={{ marginLeft: "0", marginRight: "0", display: "flex", justifyContent: "space-between" }}>
                    <div style={{ zIndex: "999" }}>
                        <a className="text-white pr-3" href="">FAQs</a>
                        <span className="text-white">|</span>
                        <a className="text-white px-3" href="">Help</a>
                        <span className="text-white">|</span>
                        <a className="text-white pl-3" href="">Support</a>
                    </div>
                    <div className=" text-lg-right" style={{ zIndex: "999", fontSize: "30px" }}>
                        <a className="text-white px-3" href="">
                            <AiFillFacebook />
                        </a>
                        <a className="text-white px-3" href="">
                            <AiFillTwitterCircle />
                        </a>
                        <a className="text-white px-3" href="">
                            <AiFillInstagram />
                        </a>

                    </div>
                </div>
            </div>
            <div className="container-fluid position-relative nav-bar p-0">
                <div className="container-lg position-relative p-0 px-lg-3" style={{ zIndex: "9" }}>
                    <nav className="navbar navbar-expand-lg  navbar-light shadow p-lg-0 main_shadow mb-5" style={{ background: "#f5f5f5" }}>

                        {/* <button type="button" className="navbar-toggler collapsed" data-toggle="collapse" data-target="#navbarCollapse" aria-expanded="false">
                            <span className="navbar-toggler-icon"></span>
                        </button> */}
                        <div className="navbar-collapse justify-content-between collapse" id="navbarCollapse" >
                            <div className="navbar-nav ml-auto py-0">
                                <a href="#" className="nav-item nav-link">Features</a>
                                <a href="#" className="nav-item nav-link">How it works</a>
                                <a href="#" className="nav-item nav-link">Pricing</a>
                                <a href="#" className="nav-item nav-link">Blog</a>
                            </div>

                            <Image src="https://res.cloudinary.com/nell1818/image/upload/v1678603710/MENUUI_6_o6upjt.png" height={50} width={250} alt='logo' style={{ margin: "0 40px 0 40px" }} />
                            <div className="navbar-nav mr-auto py-0">
                                <ButtonLogin />
                                <ButtonSecondary />
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}
