import "./index.css";
import hero from "./assets/illustration-working.svg";
// import bg from "./assets/bg-boost-desktop.svg";
import { useState } from "react";

import reco from "./assets/icon-brand-recognition.svg";
// import custom from "./assets/icon-fully-customizable.svg";
import recs from "./assets/icon-detailed-records.svg";

import facebook from "./assets/social/icon-facebook.svg";
import instagram from "./assets/social/icon-instagram.svg";
import pinterest from "./assets/social/icon-pinterest.svg";
import twitter from "./assets/social/icon-twitter.svg";

interface Result {
   short_link: string;
   original_link: string;
   code: string | number;
}

interface Res {
   result: Result;
}

function App() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [value, setValue] = useState<string>("");
   const [res, setRes] = useState<Res[]>([]);
   //  const linkRef = useRef<HTMLInputElement>(null);

   const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
   };
   const handleMenuOpen = () => {
      setIsMenuOpen(!isMenuOpen);
   };
   const copy = async (link: string) => {
      await navigator.clipboard.writeText(link);
      alert("Text copied");
   };

   const handelFetch = async (link: string) => {
      const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${link}`);
      const data = await res.json();
      if (data.ok === false) return alert(data.error);
      setRes((prevRes: Res[]) => [...prevRes, data]);
      console.log(data);
   };

   const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handelFetch(value);

      setValue("");
   };

   return (
      <div className="main">
         {isMenuOpen ? (
            <div className="menu">
               <ul>
                  <li>Features</li>
                  <li>Pricing</li>
                  <li>Resources</li>
               </ul>
               <div style={{ width: "100%" }}>
                  Login
                  <div className="btn">Sign Up</div>
               </div>
            </div>
         ) : (
            <div></div>
         )}
         <header className="header">
            <div className="wrapper flex-between">
               <div className="flex">
                  <h2 className="header__logo">Shortly</h2>
                  <nav className="header__nav flex">
                     <a href="#" className="header__link">
                        Features
                     </a>
                     <a href="#" className="header__link">
                        Pricing
                     </a>
                     <a href="#" className="header__link">
                        Resources
                     </a>
                  </nav>
               </div>
               <div className="menu__btn" onClick={handleMenuOpen}>
                  menu
               </div>
               <div className="header__btns flex">
                  <div className="header__btn">Login</div>
                  <div className="header__btn btn">Sign Up</div>
               </div>
            </div>
         </header>
         <section className="hero">
            <div className="wrapper flex-between">
               <div className="hero__text">
                  <h1>More than just shorter links</h1>
                  <p className="hero__disc">
                     Build your brand’s recognition and get detailed insights on
                     how your links are performing.
                  </p>
                  <div className="hero__btn btn">Get Started</div>
               </div>
               <div className="hero__img">
                  <img src={hero} alt="" />
               </div>
            </div>
         </section>
         <section className="shrtn bg-gray">
            <div className="wrapper flex-between">
               <form action="" onSubmit={handelSubmit} className="flex form">
                  <input
                     className=""
                     type="text"
                     placeholder="Shorten a link here..."
                     value={value}
                     onChange={handelChange}
                  />
                  <button className="btn" type="submit">
                     Shorten it!
                  </button>
               </form>
               {res?.length === undefined ? (
                  <div>empty</div>
               ) : (
                  <div className="shrtn__container">
                     {res?.map((res: Res) => {
                        const { short_link, original_link } = res.result;
                        const link: string = "http://" + short_link;
                        return (
                           <div
                              key={res.result.code}
                              className="shrtn__box flex-between"
                           >
                              <div className="shrtn__link">{original_link}</div>
                              <div className="shrtn__btns ">
                                 <a target="_blank" href={link}>
                                    {short_link}
                                 </a>
                                 <button
                                    className="shrtn__btn btn"
                                    onClick={() => copy(link)}
                                 >
                                    Copy To Clipboard
                                 </button>
                              </div>
                           </div>
                        );
                     })}
                  </div>
               )}
            </div>
         </section>
         <section className="stats bg-gray">
            <div className="wrapper flex-center">
               <h2>Advanced Statistics</h2>
               <p className="stats__caption">
                  Track how your links are performing across the web with our
                  advanced statistics dashboard.
               </p>
               <div className="stats__container ">
                  <div className="stats__box">
                     <img className="stats__img" src={reco} alt="" />
                     <h3 className="stats__title">Brand Recognition</h3>
                     <p className="stats__text">
                        Boost your brand recognition with each click. Generic
                        links don’t mean a thing. Branded links help instil
                        confidence in your content.
                     </p>
                  </div>

                  <div className="stats__box">
                     <img className="stats__img" src={recs} alt="" />
                     <h3 className="stats__title">Detailed Records</h3>
                     <p className="stats__text">
                        Gain insights into who is clicking your links. Knowing
                        when and where people engage with your content helps
                        inform better decisions.
                     </p>
                  </div>

                  <div className="stats__box">
                     <svg
                        className="stats__img"
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                     >
                        <path
                           fill="#2BD0D0"
                           d="M46.608 6.02a.975.975 0 00-.927-.047l-7.624 3.591a8.283 8.283 0 00-4.728 6.837l-.196 2.436-3.95 6.561v-2.801c0-.01-.006-.017-.006-.027a.974.974 0 00-.046-.284l-1.838-5.514 3.753-7.504a.984.984 0 00-.099-1.03l-5.9-7.867a1.019 1.019 0 00-1.573 0L17.573 8.24a.984.984 0 00-.093 1.03l3.753 7.503-1.838 5.514a.974.974 0 00-.047.284v3.951l-6.127-9.299c-.007-.01-.02-.017-.026-.026a.995.995 0 00-.211-.215c-.02-.013-.036-.03-.056-.042-.02-.013-.022-.02-.035-.027l-3.605-2.085-1.497-2.271L5.628 9.27a.983.983 0 00-1.147-.386L.654 10.227a.983.983 0 00-.491 1.468l2.705 4.107 1.492 2.27.492 4.137a.36.36 0 00.01.04c.004.02.009.041.015.061a.973.973 0 00.116.295c.007.01.007.023.014.033.007.01 14.624 22.165 14.695 22.225A4.87 4.87 0 0024.255 48c.4 0 .8-.05 1.19-.145a4.886 4.886 0 003.028-2.235l13.08-21.698 2.065-1.307a8.343 8.343 0 002.66-2.721 8.259 8.259 0 001.18-4.651l-.383-8.42a.984.984 0 00-.467-.803zm-7.122 17.524l-1.522 2.527-5.054-3.048 1.524-2.527 5.052 3.048zM21.315 38.446V23.58h5.9v5.08l-5.9 9.786zm1.693-20.766h2.515l1.31 3.933h-5.136l1.31-3.933zm1.257-6.885a.983.983 0 110-1.966.983.983 0 010 1.966zm0-8.194l4.75 6.331-3.39 6.78h-.377v-3.13a2.95 2.95 0 10-1.966 0v3.13h-.376l-3.39-6.78 4.75-6.331zM10.53 17.818l-.29.19-3.621 2.387-.333-2.787a.982.982 0 00-.156-.424l-1.081-1.642L6.69 14.46l1.081 1.642a.988.988 0 00.329.31l2.429 1.406zm-6.122-6.826l1.2 1.822-1.642 1.082-1.475-2.232 1.917-.672zm5.249 9.755l2.458-1.624 7.233 10.972v10.726L7.193 22.371l2.464-1.624zm17.135 23.851a2.95 2.95 0 11-5.052-3.048l7.425-12.315h.017v-.027l2.712-4.499 2.527 1.526 2.53 1.52-10.16 16.843zm17.807-25.724a6.353 6.353 0 01-2.028 2.073l-1.747 1.107-2.852-1.717-2.852-1.717.162-2.065a6.318 6.318 0 013.604-5.213L45.18 8.38l.125 2.74a.973.973 0 00-.295.014l-2.382.59a5.986 5.986 0 00-4.425 4.524.983.983 0 001.919.43 4.032 4.032 0 012.977-3.043l2.297-.57.103 2.262a6.304 6.304 0 01-.9 3.548z"
                        />
                     </svg>
                     <h3 className="stats__title">Fully Customizable</h3>
                     <p className="stats__text">
                        Improve brand awareness and content discoverability
                        through customizable links, supercharging audience
                        engagement.
                     </p>
                  </div>
               </div>
            </div>
         </section>
         <section>
            <div className="boost">
               <h2>Boost your link today</h2>
               <button className="btn">Get started</button>
            </div>
         </section>
         <footer>
            <div className="wrapper">
               <h2 className="header__logo">Shortly</h2>
               <ul className="footer__list">
                  <li className="footer__item">Features</li>
                  <li className="footer__item">Link Shortening</li>
                  <li className="footer__item">Branded Links</li>
                  <li className="footer__item">Analytics</li>
               </ul>

               <ul className="footer__list">
                  <li className="footer__item">Resources</li>
                  <li className="footer__item">Blog</li>
                  <li className="footer__item">Developers</li>
                  <li className="footer__item">Support</li>
               </ul>

               <ul className="footer__list">
                  <li className="footer__item">Company</li>
                  <li className="footer__item">Our Team</li>
                  <li className="footer__item">Developers</li>
                  <li className="footer__item"> Careers</li>
                  <li className="footer__item"> About</li>
                  <li className="footer__item"> Contact</li>
               </ul>

               <div className="footer__social">
                  <img src={facebook} alt="" />
                  <img src={twitter} alt="" />
                  <img src={pinterest} alt="" />
                  <img src={instagram} alt="" />
               </div>
            </div>
         </footer>
      </div>
   );
}

export default App;
