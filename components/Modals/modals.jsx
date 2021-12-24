import React from 'react'
import {logIn, signUp} from '../../Scripts/firebaseauth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../Scripts/firebaseconfig'
import setLocalStorage from '../../Scripts/Cache/localStorage'
import {sendPasswordReset, changeDisplayName, createPost, changeCurrency} from '../../Scripts/firebaseauth'

const Modals = () => {

    const [user] = useAuthState(auth)

    const handleSubmit = e => {

        //Prevent Page reload
        e.preventDefault()
    }

    function onclickChangeCurrencyBtn(e) {

        changeCurrency(e)
        setLocalStorage()
    }

    return (
        <React.Fragment>
            {/* //Sign Up Modal */}
            <div id="modal-signup" className="modal">
                <div className="modal-content">
                    <h4>Sign up</h4><br />
                    <form id="signup-form" onSubmit={handleSubmit}>
                        <div className="input-field">
                            <input type="text" id="signup-displayname" required />
                            <label htmlFor="signup-password">Display Name</label>
                        </div>
                        <div className="input-field">
                            <input type="email" id="signup-email" required />
                            <label htmlFor="signup-email">Email address</label>
                        </div>
                        <div className="input-field">
                            <input type="password" id="signup-password" required />
                            <label htmlFor="signup-password">Choose password</label>
                        </div>
                        <div className="input-field">
                            <select className="currency" name="currency">
                            <option>Select currency</option>
                            <option value="AFN">AFN - Afghan Afghani - ؋</option>
                            <option value="ALL">ALL - Albanian Lek - Lek</option>
                            <option value="DZD">DZD - Algerian Dinar - دج</option>
                            <option value="AOA">AOA - Angolan Kwanza - Kz</option>
                            <option value="ARS">ARS - Argentine Peso - $</option>
                            <option value="AMD">AMD - Armenian Dram - ֏</option>
                            <option value="AWG">AWG - Aruban Florin - ƒ</option>
                            <option value="AUD">AUD - Australian Dollar - $</option>
                            <option value="AZN">AZN - Azerbaijani Manat - m</option>
                            <option value="BSD">BSD - Bahamian Dollar - B$</option>
                            <option value="BHD">BHD - Bahraini Dinar - .د.ب</option>
                            <option value="BDT">BDT - Bangladeshi Taka - ৳</option>
                            <option value="BBD">BBD - Barbadian Dollar - Bds$</option>
                            <option value="BYR">BYR - Belarusian Ruble - Br</option>
                            <option value="BEF">BEF - Belgian Franc - fr</option>
                            <option value="BZD">BZD - Belize Dollar - $</option>
                            <option value="BMD">BMD - Bermudan Dollar - $</option>
                            <option value="BTN">BTN - Bhutanese Ngultrum - Nu.</option>
                            <option value="BTC">BTC - Bitcoin - ฿</option>
                            <option value="BOB">BOB - Bolivian Boliviano - Bs.</option>
                            <option value="BAM">BAM - Bosnia-Herzegovina Convertible Mark - KM</option>
                            <option value="BWP">BWP - Botswanan Pula - P</option>
                            <option value="BRL">BRL - Brazilian Real - R$</option>
                            <option value="GBP">GBP - British Pound Sterling - £</option>
                            <option value="BND">BND - Brunei Dollar - B$</option>
                            <option value="BGN">BGN - Bulgarian Lev - Лв.</option>
                            <option value="BIF">BIF - Burundian Franc - FBu</option>
                            <option value="KHR">KHR - Cambodian Riel - KHR</option>
                            <option value="CAD">CAD - Canadian Dollar - $</option>
                            <option value="CVE">CVE - Cape Verdean Escudo - $</option>
                            <option value="KYD">KYD - Cayman Islands Dollar - $</option>
                            <option value="XOF">XOF - CFA Franc BCEAO - CFA</option>
                            <option value="XAF">XAF - CFA Franc BEAC - FCFA</option>
                            <option value="XPF">XPF - CFP Franc - ₣</option>
                            <option value="CLP">CLP - Chilean Peso - $</option>
                            <option value="CNY">CNY - Chinese Yuan - ¥</option>
                            <option value="COP">COP - Colombian Peso - $</option>
                            <option value="KMF">KMF - Comorian Franc - CF</option>
                            <option value="CDF">CDF - Congolese Franc - FC</option>
                            <option value="CRC">CRC - Costa Rican ColÃ³n - ₡</option>
                            <option value="HRK">HRK - Croatian Kuna - kn</option>
                            <option value="CUC">CUC - Cuban Convertible Peso - $, CUC</option>
                            <option value="CZK">CZK - Czech Republic Koruna - Kč</option>
                            <option value="DKK">DKK - Danish Krone - Kr.</option>
                            <option value="DJF">DJF - Djiboutian Franc - Fdj</option>
                            <option value="DOP">DOP - Dominican Peso - $</option>
                            <option value="XCD">XCD - East Caribbean Dollar - $</option>
                            <option value="EGP">EGP - Egyptian Pound - ج.م</option>
                            <option value="ERN">ERN - Eritrean Nakfa - Nfk</option>
                            <option value="EEK">EEK - Estonian Kroon - kr</option>
                            <option value="ETB">ETB - Ethiopian Birr - Nkf</option>
                            <option value="EUR">EUR - Euro - €</option>
                            <option value="FKP">FKP - Falkland Islands Pound - £</option>
                            <option value="FJD">FJD - Fijian Dollar - FJ$</option>
                            <option value="GMD">GMD - Gambian Dalasi - D</option>
                            <option value="GEL">GEL - Georgian Lari - ლ</option>
                            <option value="DEM">DEM - German Mark - DM</option>
                            <option value="GHS">GHS - Ghanaian Cedi - GH₵</option>
                            <option value="GIP">GIP - Gibraltar Pound - £</option>
                            <option value="GRD">GRD - Greek Drachma - ₯, Δρχ, Δρ</option>
                            <option value="GTQ">GTQ - Guatemalan Quetzal - Q</option>
                            <option value="GNF">GNF - Guinean Franc - FG</option>
                            <option value="GYD">GYD - Guyanaese Dollar - $</option>
                            <option value="HTG">HTG - Haitian Gourde - G</option>
                            <option value="HNL">HNL - Honduran Lempira - L</option>
                            <option value="HKD">HKD - Hong Kong Dollar - $</option>
                            <option value="HUF">HUF - Hungarian Forint - Ft</option>
                            <option value="ISK">ISK - Icelandic KrÃ³na - kr</option>
                            <option value="INR">INR - Indian Rupee - ₹</option>
                            <option value="IDR">IDR - Indonesian Rupiah - Rp</option>
                            <option value="IRR">IRR - Iranian Rial - ﷼</option>
                            <option value="IQD">IQD - Iraqi Dinar - د.ع</option>
                            <option value="ILS">ILS - Israeli New Sheqel - ₪</option>
                            <option value="ITL">ITL - Italian Lira - L,£</option>
                            <option value="JMD">JMD - Jamaican Dollar - J$</option>
                            <option value="JPY">JPY - Japanese Yen - ¥</option>
                            <option value="JOD">JOD - Jordanian Dinar - ا.د</option>
                            <option value="KZT">KZT - Kazakhstani Tenge - лв</option>
                            <option value="KES">KES - Kenyan Shilling - KSh</option>
                            <option value="KWD">KWD - Kuwaiti Dinar - ك.د</option>
                            <option value="KGS">KGS - Kyrgystani Som - лв</option>
                            <option value="LAK">LAK - Laotian Kip - ₭</option>
                            <option value="LVL">LVL - Latvian Lats - Ls</option>
                            <option value="LBP">LBP - Lebanese Pound - £</option>
                            <option value="LSL">LSL - Lesotho Loti - L</option>
                            <option value="LRD">LRD - Liberian Dollar - $</option>
                            <option value="LYD">LYD - Libyan Dinar - د.ل</option>
                            <option value="LTL">LTL - Lithuanian Litas - Lt</option>
                            <option value="MOP">MOP - Macanese Pataca - $</option>
                            <option value="MKD">MKD - Macedonian Denar - ден</option>
                            <option value="MGA">MGA - Malagasy Ariary - Ar</option>
                            <option value="MWK">MWK - Malawian Kwacha - MK</option>
                            <option value="MYR">MYR - Malaysian Ringgit - RM</option>
                            <option value="MVR">MVR - Maldivian Rufiyaa - Rf</option>
                            <option value="MRO">MRO - Mauritanian Ouguiya - MRU</option>
                            <option value="MUR">MUR - Mauritian Rupee - ₨</option>
                            <option value="MXN">MXN - Mexican Peso - $</option>
                            <option value="MDL">MDL - Moldovan Leu - L</option>
                            <option value="MNT">MNT - Mongolian Tugrik - ₮</option>
                            <option value="MAD">MAD - Moroccan Dirham - MAD</option>
                            <option value="MZM">MZM - Mozambican Metical - MT</option>
                            <option value="MMK">MMK - Myanmar Kyat - K</option>
                            <option value="NAD">NAD - Namibian Dollar - $</option>
                            <option value="NPR">NPR - Nepalese Rupee - ₨</option>
                            <option value="ANG">ANG - Netherlands Antillean Guilder - ƒ</option>
                            <option value="TWD">TWD - New Taiwan Dollar - $</option>
                            <option value="NZD">NZD - New Zealand Dollar - $</option>
                            <option value="NIO">NIO - Nicaraguan CÃ³rdoba - C$</option>
                            <option value="NGN">NGN - Nigerian Naira - ₦</option>
                            <option value="KPW">KPW - North Korean Won - ₩</option>
                            <option value="NOK">NOK - Norwegian Krone - kr</option>
                            <option value="OMR">OMR - Omani Rial - .ع.ر</option>
                            <option value="PKR">PKR - Pakistani Rupee - ₨</option>
                            <option value="PAB">PAB - Panamanian Balboa - B/.</option>
                            <option value="PGK">PGK - Papua New Guinean Kina - K</option>
                            <option value="PYG">PYG - Paraguayan Guarani - ₲</option>
                            <option value="PEN">PEN - Peruvian Nuevo Sol - S/.</option>
                            <option value="PHP">PHP - Philippine Peso - ₱</option>
                            <option value="PLN">PLN - Polish Zloty - zł</option>
                            <option value="QAR">QAR - Qatari Rial - ق.ر</option>
                            <option value="RON">RON - Romanian Leu - lei</option>
                            <option value="RUB">RUB - Russian Ruble - ₽</option>
                            <option value="RWF">RWF - Rwandan Franc - FRw</option>
                            <option value="SVC">SVC - Salvadoran ColÃ³n - ₡</option>
                            <option value="WST">WST - Samoan Tala - SAT</option>
                            <option value="SAR">SAR - Saudi Riyal - ﷼</option>
                            <option value="RSD">RSD - Serbian Dinar - din</option>
                            <option value="SCR">SCR - Seychellois Rupee - SRe</option>
                            <option value="SLL">SLL - Sierra Leonean Leone - Le</option>
                            <option value="SGD">SGD - Singapore Dollar - $</option>
                            <option value="SKK">SKK - Slovak Koruna - Sk</option>
                            <option value="SBD">SBD - Solomon Islands Dollar - Si$</option>
                            <option value="SOS">SOS - Somali Shilling - Sh.so.</option>
                            <option value="ZAR">ZAR - South African Rand - R</option>
                            <option value="KRW">KRW - South Korean Won - ₩</option>
                            <option value="XDR">XDR - Special Drawing Rights - SDR</option>
                            <option value="LKR">LKR - Sri Lankan Rupee - Rs</option>
                            <option value="SHP">SHP - St. Helena Pound - £</option>
                            <option value="SDG">SDG - Sudanese Pound - .س.ج</option>
                            <option value="SRD">SRD - Surinamese Dollar - $</option>
                            <option value="SZL">SZL - Swazi Lilangeni - E</option>
                            <option value="SEK">SEK - Swedish Krona - kr</option>
                            <option value="CHF">CHF - Swiss Franc - CHf</option>
                            <option value="SYP">SYP - Syrian Pound - LS</option>
                            <option value="STD">STD - São Tomé and Príncipe Dobra - Db</option>
                            <option value="TJS">TJS - Tajikistani Somoni - SM</option>
                            <option value="TZS">TZS - Tanzanian Shilling - TSh</option>
                            <option value="THB">THB - Thai Baht - ฿</option>
                            <option value="TOP">TOP - Tongan pa'anga - $</option>
                            <option value="TTD">TTD - Trinidad & Tobago Dollar - $</option>
                            <option value="TND">TND - Tunisian Dinar - ت.د</option>
                            <option value="TRY">TRY - Turkish Lira - ₺</option>
                            <option value="TMT">TMT - Turkmenistani Manat - T</option>
                            <option value="UGX">UGX - Ugandan Shilling - USh</option>
                            <option value="UAH">UAH - Ukrainian Hryvnia - ₴</option>
                            <option value="AED">AED - United Arab Emirates Dirham - إ.د</option>
                            <option value="UYU">UYU - Uruguayan Peso - $</option>
                            <option value="USD">USD - US Dollar - $</option>
                            <option value="UZS">UZS - Uzbekistan Som - лв</option>
                            <option value="VUV">VUV - Vanuatu Vatu - VT</option>
                            <option value="VEF">VEF - Venezuelan BolÃ­var - Bs</option>
                            <option value="VND">VND - Vietnamese Dong - ₫</option>
                            <option value="YER">YER - Yemeni Rial - ﷼</option>
                            <option value="ZMK">ZMK - Zambian Kwacha - ZK</option>
                            </select>
                        </div>
                        <button type='submit' className="btn yellow darken-2 z-depth-0 center-align waves-effect waves-green" onClick={signUp}>Sign up</button>
                        <p className="error pink-text center-align"></p>
                    </form>
                </div>
            </div>
            {/* //Login Modal */}
            <div id="modal-login" className="modal">
                <div className="modal-content">
                    <h4>Login</h4><br />
                    <form id="login-form" onSubmit={handleSubmit}>
                        <div className="input-field">
                            <input type="email" id="login-email" required />
                            <label htmlFor="login-email">Email address</label>
                        </div>
                        <div className="input-field">
                            <input type="password" id="login-password" required />
                            <label htmlFor="login-password">Your password</label>
                        </div>
                        <ul className="collapsible">
                            <li>
                                <div className="collapsible-header teal-text">Reset Password</div>
                                <div className="collapsible-body">
                                    <div className='forgot-password-form'>
                                        <div className="input-field">
                                            <input type="email" id='forgot-password-email' />
                                            <label htmlFor="forgot-password-email">Email</label>
                                        </div>
                                        <button className="btn yellow darken-2 z-depth-0" onClick={sendPasswordReset}>Send reset email</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <button className="btn yellow darken-2 z-depth-0" onClick={logIn}>Login</button>
                    </form>
                </div>
            </div>
            {/* //Account Modal */}
            <div id="modal-account" className="modal">
                <div className="modal-content">
                    <h4>Account</h4>
                    <h6>
                        {user ? user.displayName : null}
                    </h6>
                    <h6>
                        {user ? user.email : null}
                    </h6>
                    <br />
                    <ul className="collapsible">
                        <li>
                            <div className="collapsible-header teal-text">Reset Password</div>
                            <div className="collapsible-body">
                                <div className='forgot-password-form'>
                                    <div className="input-field">
                                        <input type="email" id='forgot-password-email' />
                                        <label htmlFor="forgot-password-email">Email</label>
                                    </div>
                                    <button className="btn yellow darken-2 z-depth-0" onClick={sendPasswordReset}>Send reset email</button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="collapsible-header teal-text">Change Display Name</div>
                            <div className="collapsible-body">
                                <div className='forgot-password-form'>
                                        <label htmlFor="forgot-password-email">Display name</label>
                                        <input type="email" id='forgot-password-email' placeholder={user ? user.displayName : null} />
                                    <button className="btn yellow darken-2 z-depth-0" onClick={changeDisplayName}>Change</button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="collapsible-header teal-text">Change Currency</div>
                            <div className="collapsible-body">
                                <div className='forgot-password-form'>
                                    <select id="currency" name="currency">
                                        <option>Select currency</option>
                                        <option value="AFN">AFN - Afghan Afghani - ؋</option>
                                        <option value="ALL">ALL - Albanian Lek - Lek</option>
                                        <option value="DZD">DZD - Algerian Dinar - دج</option>
                                        <option value="AOA">AOA - Angolan Kwanza - Kz</option>
                                        <option value="ARS">ARS - Argentine Peso - $</option>
                                        <option value="AMD">AMD - Armenian Dram - ֏</option>
                                        <option value="AWG">AWG - Aruban Florin - ƒ</option>
                                        <option value="AUD">AUD - Australian Dollar - $</option>
                                        <option value="AZN">AZN - Azerbaijani Manat - m</option>
                                        <option value="BSD">BSD - Bahamian Dollar - B$</option>
                                        <option value="BHD">BHD - Bahraini Dinar - .د.ب</option>
                                        <option value="BDT">BDT - Bangladeshi Taka - ৳</option>
                                        <option value="BBD">BBD - Barbadian Dollar - Bds$</option>
                                        <option value="BYR">BYR - Belarusian Ruble - Br</option>
                                        <option value="BZD">BZD - Belize Dollar - $</option>
                                        <option value="BMD">BMD - Bermudan Dollar - $</option>
                                        <option value="BOB">BOB - Bolivian Boliviano - Bs.</option>
                                        <option value="BAM">BAM - Bosnia-Herzegovina Convertible Mark - KM</option>
                                        <option value="BWP">BWP - Botswanan Pula - P</option>
                                        <option value="BRL">BRL - Brazilian Real - R$</option>
                                        <option value="GBP">GBP - British Pound Sterling - £</option>
                                        <option value="BND">BND - Brunei Dollar - B$</option>
                                        <option value="BGN">BGN - Bulgarian Lev - Лв.</option>
                                        <option value="BIF">BIF - Burundian Franc - FBu</option>
                                        <option value="KHR">KHR - Cambodian Riel - KHR</option>
                                        <option value="CAD">CAD - Canadian Dollar - $</option>
                                        <option value="CVE">CVE - Cape Verdean Escudo - $</option>
                                        <option value="XOF">XOF - CFA Franc BCEAO - CFA</option>
                                        <option value="XAF">XAF - CFA Franc BEAC - FCFA</option>
                                        <option value="XPF">XPF - CFP Franc - ₣</option>
                                        <option value="CLP">CLP - Chilean Peso - $</option>
                                        <option value="CNY">CNY - Chinese Yuan - ¥</option>
                                        <option value="COP">COP - Colombian Peso - $</option>
                                        <option value="KMF">KMF - Comorian Franc - CF</option>
                                        <option value="CDF">CDF - Congolese Franc - FC</option>
                                        <option value="CRC">CRC - Costa Rican ColÃ³n - ₡</option>
                                        <option value="HRK">HRK - Croatian Kuna - kn</option>
                                        <option value="CZK">CZK - Czech Republic Koruna - Kč</option>
                                        <option value="DKK">DKK - Danish Krone - Kr.</option>
                                        <option value="DJF">DJF - Djiboutian Franc - Fdj</option>
                                        <option value="DOP">DOP - Dominican Peso - $</option>
                                        <option value="XCD">XCD - East Caribbean Dollar - $</option>
                                        <option value="EGP">EGP - Egyptian Pound - ج.م</option>
                                        <option value="ERN">ERN - Eritrean Nakfa - Nfk</option>
                                        <option value="ETB">ETB - Ethiopian Birr - Nkf</option>
                                        <option value="EUR">EUR - Euro - €</option>
                                        <option value="FJD">FJD - Fijian Dollar - FJ$</option>
                                        <option value="GMD">GMD - Gambian Dalasi - D</option>
                                        <option value="GEL">GEL - Georgian Lari - ლ</option>
                                        <option value="GHS">GHS - Ghanaian Cedi - GH₵</option>
                                        <option value="GIP">GIP - Gibraltar Pound - £</option>
                                        <option value="GTQ">GTQ - Guatemalan Quetzal - Q</option>
                                        <option value="GNF">GNF - Guinean Franc - FG</option>
                                        <option value="GYD">GYD - Guyanaese Dollar - $</option>
                                        <option value="HTG">HTG - Haitian Gourde - G</option>
                                        <option value="HNL">HNL - Honduran Lempira - L</option>
                                        <option value="HKD">HKD - Hong Kong Dollar - $</option>
                                        <option value="HUF">HUF - Hungarian Forint - Ft</option>
                                        <option value="ISK">ISK - Icelandic KrÃ³na - kr</option>
                                        <option value="INR">INR - Indian Rupee - ₹</option>
                                        <option value="IDR">IDR - Indonesian Rupiah - Rp</option>
                                        <option value="IRR">IRR - Iranian Rial - ﷼</option>
                                        <option value="IQD">IQD - Iraqi Dinar - د.ع</option>
                                        <option value="ILS">ILS - Israeli New Sheqel - ₪</option>
                                        <option value="JMD">JMD - Jamaican Dollar - J$</option>
                                        <option value="JPY">JPY - Japanese Yen - ¥</option>
                                        <option value="JOD">JOD - Jordanian Dinar - ا.د</option>
                                        <option value="KZT">KZT - Kazakhstani Tenge - лв</option>
                                        <option value="KES">KES - Kenyan Shilling - KSh</option>
                                        <option value="KWD">KWD - Kuwaiti Dinar - ك.د</option>
                                        <option value="KGS">KGS - Kyrgystani Som - лв</option>
                                        <option value="LAK">LAK - Laotian Kip - ₭</option>
                                        <option value="LBP">LBP - Lebanese Pound - £</option>
                                        <option value="LSL">LSL - Lesotho Loti - L</option>
                                        <option value="LRD">LRD - Liberian Dollar - $</option>
                                        <option value="LYD">LYD - Libyan Dinar - د.ل</option>
                                        <option value="MOP">MOP - Macanese Pataca - $</option>
                                        <option value="MKD">MKD - Macedonian Denar - ден</option>
                                        <option value="MGA">MGA - Malagasy Ariary - Ar</option>
                                        <option value="MWK">MWK - Malawian Kwacha - MK</option>
                                        <option value="MYR">MYR - Malaysian Ringgit - RM</option>
                                        <option value="MVR">MVR - Maldivian Rufiyaa - Rf</option>
                                        <option value="MRO">MRO - Mauritanian Ouguiya - MRU</option>
                                        <option value="MUR">MUR - Mauritian Rupee - ₨</option>
                                        <option value="MXN">MXN - Mexican Peso - $</option>
                                        <option value="MDL">MDL - Moldovan Leu - L</option>
                                        <option value="MNT">MNT - Mongolian Tugrik - ₮</option>
                                        <option value="MAD">MAD - Moroccan Dirham - MAD</option>
                                        <option value="MMK">MMK - Myanmar Kyat - K</option>
                                        <option value="NAD">NAD - Namibian Dollar - $</option>
                                        <option value="NPR">NPR - Nepalese Rupee - ₨</option>
                                        <option value="ANG">ANG - Netherlands Antillean Guilder - ƒ</option>
                                        <option value="TWD">TWD - New Taiwan Dollar - $</option>
                                        <option value="NZD">NZD - New Zealand Dollar - $</option>
                                        <option value="NIO">NIO - Nicaraguan CÃ³rdoba - C$</option>
                                        <option value="NGN">NGN - Nigerian Naira - ₦</option>
                                        <option value="NOK">NOK - Norwegian Krone - kr</option>
                                        <option value="OMR">OMR - Omani Rial - .ع.ر</option>
                                        <option value="PKR">PKR - Pakistani Rupee - ₨</option>
                                        <option value="PAB">PAB - Panamanian Balboa - B/.</option>
                                        <option value="PGK">PGK - Papua New Guinean Kina - K</option>
                                        <option value="PYG">PYG - Paraguayan Guarani - ₲</option>
                                        <option value="PEN">PEN - Peruvian Nuevo Sol - S/.</option>
                                        <option value="PHP">PHP - Philippine Peso - ₱</option>
                                        <option value="PLN">PLN - Polish Zloty - zł</option>
                                        <option value="QAR">QAR - Qatari Rial - ق.ر</option>
                                        <option value="RON">RON - Romanian Leu - lei</option>
                                        <option value="RUB">RUB - Russian Ruble - ₽</option>
                                        <option value="RWF">RWF - Rwandan Franc - FRw</option>
                                        <option value="SVC">SVC - Salvadoran ColÃ³n - ₡</option>
                                        <option value="WST">WST - Samoan Tala - SAT</option>
                                        <option value="SAR">SAR - Saudi Riyal - ﷼</option>
                                        <option value="RSD">RSD - Serbian Dinar - din</option>
                                        <option value="SCR">SCR - Seychellois Rupee - SRe</option>
                                        <option value="SLL">SLL - Sierra Leonean Leone - Le</option>
                                        <option value="SGD">SGD - Singapore Dollar - $</option>
                                        <option value="SBD">SBD - Solomon Islands Dollar - Si$</option>
                                        <option value="SOS">SOS - Somali Shilling - Sh.so.</option>
                                        <option value="ZAR">ZAR - South African Rand - R</option>
                                        <option value="KRW">KRW - South Korean Won - ₩</option>
                                        <option value="LKR">LKR - Sri Lankan Rupee - Rs</option>
                                        <option value="SDG">SDG - Sudanese Pound - .س.ج</option>
                                        <option value="SRD">SRD - Surinamese Dollar - $</option>
                                        <option value="SZL">SZL - Swazi Lilangeni - E</option>
                                        <option value="SEK">SEK - Swedish Krona - kr</option>
                                        <option value="CHF">CHF - Swiss Franc - CHf</option>
                                        <option value="SYP">SYP - Syrian Pound - LS</option>
                                        <option value="TJS">TJS - Tajikistani Somoni - SM</option>
                                        <option value="TZS">TZS - Tanzanian Shilling - TSh</option>
                                        <option value="THB">THB - Thai Baht - ฿</option>
                                        <option value="TOP">TOP - Tongan pa'anga - $</option>
                                        <option value="TTD">TTD - Trinidad & Tobago Dollar - $</option>
                                        <option value="TND">TND - Tunisian Dinar - ت.د</option>
                                        <option value="TRY">TRY - Turkish Lira - ₺</option>
                                        <option value="TMT">TMT - Turkmenistani Manat - T</option>
                                        <option value="UGX">UGX - Ugandan Shilling - USh</option>
                                        <option value="UAH">UAH - Ukrainian Hryvnia - ₴</option>
                                        <option value="AED">AED - United Arab Emirates Dirham - إ.د</option>
                                        <option value="UYU">UYU - Uruguayan Peso - $</option>
                                        <option value="USD">USD - US Dollar - $</option>
                                        <option value="UZS">UZS - Uzbekistan Som - лв</option>
                                        <option value="VUV">VUV - Vanuatu Vatu - VT</option>
                                        <option value="VND">VND - Vietnamese Dong - ₫</option>
                                        <option value="YER">YER - Yemeni Rial - ﷼</option>
                                    </select>
                                    <button className="btn yellow darken-2 z-depth-0" onClick={onclickChangeCurrencyBtn}>Change</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {/* //Create Post Modal */}
            <div id="modal-createpost" className="modal">
                <div className="modal-content">
                    <h4>Create Post</h4>
                    <form id="createpost-form" onSubmit={handleSubmit}>
                        <div className="input-field">
                            <input type="text" id='post-header'/>
                            <label htmlFor="post-header">Post Header</label>
                        </div>
                        <div className="input-field">
                            <input type="text" id='post-body'/>
                            <label htmlFor="post-body">Post Body</label>
                        </div>
                        <div className="input-field">
                            <input type="number" id='post-price'/>
                            <label htmlFor="post-price">Price</label>
                        </div>
                        <div className="input-field">
                            <input type="file" id='post-image'/>
                        </div>
                        <button className='btn yellow darken-2 z-depth-0' onClick={createPost}>Post</button>
                    </form>
                </div>
            </div>
            {/* Buy Modal */}
            <div id="modal-buy" className="modal">
                <div className="modal-content">
                    <h4>Checkout</h4>
                    <form id='checkout-form' onSubmit={handleSubmit}>
                        <div className="input-field">
                            <input type="text" id='first-name' style={{width: '48%'}}/>
                            <label htmlFor="country">First Name</label>
                            <input type="text" id='last-name' style={{width: '48%', float: 'right'}}/>
                            <label style={{marginLeft: '54%'}} htmlFor="country">Last Name</label>
                        </div>
                        <div className="input-field">
                            <select id="country" name="country">
                                <option>Select country</option>
                                <option value="AF">Afghanistan</option>
                                <option value="AX">Aland Islands</option>
                                <option value="AL">Albania</option>
                                <option value="DZ">Algeria</option>
                                <option value="AS">American Samoa</option>
                                <option value="AD">Andorra</option>
                                <option value="AO">Angola</option>
                                <option value="AI">Anguilla</option>
                                <option value="AQ">Antarctica</option>
                                <option value="AG">Antigua and Barbuda</option>
                                <option value="AR">Argentina</option>
                                <option value="AM">Armenia</option>
                                <option value="AW">Aruba</option>
                                <option value="AU">Australia</option>
                                <option value="AT">Austria</option>
                                <option value="AZ">Azerbaijan</option>
                                <option value="BS">Bahamas</option>
                                <option value="BH">Bahrain</option>
                                <option value="BD">Bangladesh</option>
                                <option value="BB">Barbados</option>
                                <option value="BY">Belarus</option>
                                <option value="BE">Belgium</option>
                                <option value="BZ">Belize</option>
                                <option value="BJ">Benin</option>
                                <option value="BM">Bermuda</option>
                                <option value="BT">Bhutan</option>
                                <option value="BO">Bolivia</option>
                                <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                                <option value="BA">Bosnia and Herzegovina</option>
                                <option value="BW">Botswana</option>
                                <option value="BV">Bouvet Island</option>
                                <option value="BR">Brazil</option>
                                <option value="IO">British Indian Ocean Territory</option>
                                <option value="BN">Brunei Darussalam</option>
                                <option value="BG">Bulgaria</option>
                                <option value="BF">Burkina Faso</option>
                                <option value="BI">Burundi</option>
                                <option value="KH">Cambodia</option>
                                <option value="CM">Cameroon</option>
                                <option value="CA">Canada</option>
                                <option value="CV">Cape Verde</option>
                                <option value="KY">Cayman Islands</option>
                                <option value="CF">Central African Republic</option>
                                <option value="TD">Chad</option>
                                <option value="CL">Chile</option>
                                <option value="CN">China</option>
                                <option value="CX">Christmas Island</option>
                                <option value="CC">Cocos (Keeling) Islands</option>
                                <option value="CO">Colombia</option>
                                <option value="KM">Comoros</option>
                                <option value="CG">Congo</option>
                                <option value="CD">Congo, Democratic Republic of the Congo</option>
                                <option value="CK">Cook Islands</option>
                                <option value="CR">Costa Rica</option>
                                <option value="CI">Cote D'Ivoire</option>
                                <option value="HR">Croatia</option>
                                <option value="CU">Cuba</option>
                                <option value="CW">Curacao</option>
                                <option value="CY">Cyprus</option>
                                <option value="CZ">Czech Republic</option>
                                <option value="DK">Denmark</option>
                                <option value="DJ">Djibouti</option>
                                <option value="DM">Dominica</option>
                                <option value="DO">Dominican Republic</option>
                                <option value="EC">Ecuador</option>
                                <option value="EG">Egypt</option>
                                <option value="SV">El Salvador</option>
                                <option value="GQ">Equatorial Guinea</option>
                                <option value="ER">Eritrea</option>
                                <option value="EE">Estonia</option>
                                <option value="ET">Ethiopia</option>
                                <option value="FK">Falkland Islands (Malvinas)</option>
                                <option value="FO">Faroe Islands</option>
                                <option value="FJ">Fiji</option>
                                <option value="FI">Finland</option>
                                <option value="FR">France</option>
                                <option value="GF">French Guiana</option>
                                <option value="PF">French Polynesia</option>
                                <option value="TF">French Southern Territories</option>
                                <option value="GA">Gabon</option>
                                <option value="GM">Gambia</option>
                                <option value="GE">Georgia</option>
                                <option value="DE">Germany</option>
                                <option value="GH">Ghana</option>
                                <option value="GI">Gibraltar</option>
                                <option value="GR">Greece</option>
                                <option value="GL">Greenland</option>
                                <option value="GD">Grenada</option>
                                <option value="GP">Guadeloupe</option>
                                <option value="GU">Guam</option>
                                <option value="GT">Guatemala</option>
                                <option value="GG">Guernsey</option>
                                <option value="GN">Guinea</option>
                                <option value="GW">Guinea-Bissau</option>
                                <option value="GY">Guyana</option>
                                <option value="HT">Haiti</option>
                                <option value="HM">Heard Island and Mcdonald Islands</option>
                                <option value="VA">Holy See (Vatican City State)</option>
                                <option value="HN">Honduras</option>
                                <option value="HK">Hong Kong</option>
                                <option value="HU">Hungary</option>
                                <option value="IS">Iceland</option>
                                <option value="IN">India</option>
                                <option value="ID">Indonesia</option>
                                <option value="IR">Iran, Islamic Republic of</option>
                                <option value="IQ">Iraq</option>
                                <option value="IE">Ireland</option>
                                <option value="IM">Isle of Man</option>
                                <option value="IL">Israel</option>
                                <option value="IT">Italy</option>
                                <option value="JM">Jamaica</option>
                                <option value="JP">Japan</option>
                                <option value="JE">Jersey</option>
                                <option value="JO">Jordan</option>
                                <option value="KZ">Kazakhstan</option>
                                <option value="KE">Kenya</option>
                                <option value="KI">Kiribati</option>
                                <option value="KP">Korea, Democratic People's Republic of</option>
                                <option value="KR">Korea, Republic of</option>
                                <option value="XK">Kosovo</option>
                                <option value="KW">Kuwait</option>
                                <option value="KG">Kyrgyzstan</option>
                                <option value="LA">Lao People's Democratic Republic</option>
                                <option value="LV">Latvia</option>
                                <option value="LB">Lebanon</option>
                                <option value="LS">Lesotho</option>
                                <option value="LR">Liberia</option>
                                <option value="LY">Libyan Arab Jamahiriya</option>
                                <option value="LI">Liechtenstein</option>
                                <option value="LT">Lithuania</option>
                                <option value="LU">Luxembourg</option>
                                <option value="MO">Macao</option>
                                <option value="MK">Macedonia, the Former Yugoslav Republic of</option>
                                <option value="MG">Madagascar</option>
                                <option value="MW">Malawi</option>
                                <option value="MY">Malaysia</option>
                                <option value="MV">Maldives</option>
                                <option value="ML">Mali</option>
                                <option value="MT">Malta</option>
                                <option value="MH">Marshall Islands</option>
                                <option value="MQ">Martinique</option>
                                <option value="MR">Mauritania</option>
                                <option value="MU">Mauritius</option>
                                <option value="YT">Mayotte</option>
                                <option value="MX">Mexico</option>
                                <option value="FM">Micronesia, Federated States of</option>
                                <option value="MD">Moldova, Republic of</option>
                                <option value="MC">Monaco</option>
                                <option value="MN">Mongolia</option>
                                <option value="ME">Montenegro</option>
                                <option value="MS">Montserrat</option>
                                <option value="MA">Morocco</option>
                                <option value="MZ">Mozambique</option>
                                <option value="MM">Myanmar</option>
                                <option value="NA">Namibia</option>
                                <option value="NR">Nauru</option>
                                <option value="NP">Nepal</option>
                                <option value="NL">Netherlands</option>
                                <option value="AN">Netherlands Antilles</option>
                                <option value="NC">New Caledonia</option>
                                <option value="NZ">New Zealand</option>
                                <option value="NI">Nicaragua</option>
                                <option value="NE">Niger</option>
                                <option value="NG">Nigeria</option>
                                <option value="NU">Niue</option>
                                <option value="NF">Norfolk Island</option>
                                <option value="MP">Northern Mariana Islands</option>
                                <option value="NO">Norway</option>
                                <option value="OM">Oman</option>
                                <option value="PK">Pakistan</option>
                                <option value="PW">Palau</option>
                                <option value="PS">Palestinian Territory, Occupied</option>
                                <option value="PA">Panama</option>
                                <option value="PG">Papua New Guinea</option>
                                <option value="PY">Paraguay</option>
                                <option value="PE">Peru</option>
                                <option value="PH">Philippines</option>
                                <option value="PN">Pitcairn</option>
                                <option value="PL">Poland</option>
                                <option value="PT">Portugal</option>
                                <option value="PR">Puerto Rico</option>
                                <option value="QA">Qatar</option>
                                <option value="RE">Reunion</option>
                                <option value="RO">Romania</option>
                                <option value="RU">Russian Federation</option>
                                <option value="RW">Rwanda</option>
                                <option value="BL">Saint Barthelemy</option>
                                <option value="SH">Saint Helena</option>
                                <option value="KN">Saint Kitts and Nevis</option>
                                <option value="LC">Saint Lucia</option>
                                <option value="MF">Saint Martin</option>
                                <option value="PM">Saint Pierre and Miquelon</option>
                                <option value="VC">Saint Vincent and the Grenadines</option>
                                <option value="WS">Samoa</option>
                                <option value="SM">San Marino</option>
                                <option value="ST">Sao Tome and Principe</option>
                                <option value="SA">Saudi Arabia</option>
                                <option value="SN">Senegal</option>
                                <option value="RS">Serbia</option>
                                <option value="CS">Serbia and Montenegro</option>
                                <option value="SC">Seychelles</option>
                                <option value="SL">Sierra Leone</option>
                                <option value="SG">Singapore</option>
                                <option value="SX">Sint Maarten</option>
                                <option value="SK">Slovakia</option>
                                <option value="SI">Slovenia</option>
                                <option value="SB">Solomon Islands</option>
                                <option value="SO">Somalia</option>
                                <option value="ZA">South Africa</option>
                                <option value="GS">South Georgia and the South Sandwich Islands</option>
                                <option value="SS">South Sudan</option>
                                <option value="ES">Spain</option>
                                <option value="LK">Sri Lanka</option>
                                <option value="SD">Sudan</option>
                                <option value="SR">Suriname</option>
                                <option value="SJ">Svalbard and Jan Mayen</option>
                                <option value="SZ">Swaziland</option>
                                <option value="SE">Sweden</option>
                                <option value="CH">Switzerland</option>
                                <option value="SY">Syrian Arab Republic</option>
                                <option value="TW">Taiwan, Province of China</option>
                                <option value="TJ">Tajikistan</option>
                                <option value="TZ">Tanzania, United Republic of</option>
                                <option value="TH">Thailand</option>
                                <option value="TL">Timor-Leste</option>
                                <option value="TG">Togo</option>
                                <option value="TK">Tokelau</option>
                                <option value="TO">Tonga</option>
                                <option value="TT">Trinidad and Tobago</option>
                                <option value="TN">Tunisia</option>
                                <option value="TR">Turkey</option>
                                <option value="TM">Turkmenistan</option>
                                <option value="TC">Turks and Caicos Islands</option>
                                <option value="TV">Tuvalu</option>
                                <option value="UG">Uganda</option>
                                <option value="UA">Ukraine</option>
                                <option value="AE">United Arab Emirates</option>
                                <option value="GB">United Kingdom</option>
                                <option value="US">United States</option>
                                <option value="UM">United States Minor Outlying Islands</option>
                                <option value="UY">Uruguay</option>
                                <option value="UZ">Uzbekistan</option>
                                <option value="VU">Vanuatu</option>
                                <option value="VE">Venezuela</option>
                                <option value="VN">Viet Nam</option>
                                <option value="VG">Virgin Islands, British</option>
                                <option value="VI">Virgin Islands, U.s.</option>
                                <option value="WF">Wallis and Futuna</option>
                                <option value="EH">Western Sahara</option>
                                <option value="YE">Yemen</option>
                                <option value="ZM">Zambia</option>
                                <option value="ZW">Zimbabwe</option>
                            </select>
                        </div>
                        <div className="input-field">
                            <input type="text" id='city'/>
                            <label htmlFor="country">City</label>
                        </div>
                        <div className="input-field">
                            <input type="text" id='zip-code'/>
                            <label htmlFor="country">Zip Code</label>
                        </div>
                        <div className="input-field">
                            <input type="text" id='adress'/>
                            <label htmlFor="country">Adress</label>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Modals


