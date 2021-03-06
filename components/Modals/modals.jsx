import React from 'react'
import {logIn, signUp} from '../../Scripts/firebaseauth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../Scripts/firebaseconfig'
import setLocalStorage from '../../Scripts/Cache/localStorage'
import {sendPasswordReset, changeDisplayName, createPost, changeCurrency} from '../../Scripts/firebaseauth'
import SearchBar from '../SearchBar'

const Modals = () => {

    const [user] = useAuthState(auth)

    function handleSubmit(e) {

        //Prevent Page reload
        e.preventDefault()
    }

    function onclickChangeCurrencyBtn(e) {

        changeCurrency(e)
        setLocalStorage(e)
    }


    return (
        <React.Fragment>
            <>
                {/* //Account Modal */}
                <div id="modal-account" className="modal rounded-lg">
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
                                            <label htmlFor="forgot-password-email 2">Email</label>
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
                                            <input type="email" id='forgot-password-email 3' placeholder={user ? user.displayName : null} />
                                        <button className="btn yellow darken-2 z-depth-0" onClick={changeDisplayName}>Change</button>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="collapsible-header teal-text">Change Currency</div>
                                <div className="collapsible-body">
                                    <div className='forgot-password-form'>
                                    <select className="currency" name="currency">
                                <option>Select currency</option>
                                <option value="AFN">AFN - Afghan Afghani - ??</option>
                                <option value="ALL">ALL - Albanian Lek - Lek</option>
                                <option value="DZD">DZD - Algerian Dinar - ????</option>
                                <option value="AOA">AOA - Angolan Kwanza - Kz</option>
                                <option value="ARS">ARS - Argentine Peso - $</option>
                                <option value="AMD">AMD - Armenian Dram - ??</option>
                                <option value="AWG">AWG - Aruban Florin - ??</option>
                                <option value="AUD">AUD - Australian Dollar - $</option>
                                <option value="AZN">AZN - Azerbaijani Manat - m</option>
                                <option value="BSD">BSD - Bahamian Dollar - B$</option>
                                <option value="BHD">BHD - Bahraini Dinar - .??.??</option>
                                <option value="BDT">BDT - Bangladeshi Taka - ???</option>
                                <option value="BBD">BBD - Barbadian Dollar - Bds$</option>
                                <option value="BYR">BYR - Belarusian Ruble - Br</option>
                                <option value="BEF">BEF - Belgian Franc - fr</option>
                                <option value="BZD">BZD - Belize Dollar - $</option>
                                <option value="BMD">BMD - Bermudan Dollar - $</option>
                                <option value="BTN">BTN - Bhutanese Ngultrum - Nu.</option>
                                <option value="BTC">BTC - Bitcoin - ???</option>
                                <option value="BOB">BOB - Bolivian Boliviano - Bs.</option>
                                <option value="BAM">BAM - Bosnia-Herzegovina Convertible Mark - KM</option>
                                <option value="BWP">BWP - Botswanan Pula - P</option>
                                <option value="BRL">BRL - Brazilian Real - R$</option>
                                <option value="GBP">GBP - British Pound Sterling - ??</option>
                                <option value="BND">BND - Brunei Dollar - B$</option>
                                <option value="BGN">BGN - Bulgarian Lev - ????.</option>
                                <option value="BIF">BIF - Burundian Franc - FBu</option>
                                <option value="KHR">KHR - Cambodian Riel - KHR</option>
                                <option value="CAD">CAD - Canadian Dollar - $</option>
                                <option value="CVE">CVE - Cape Verdean Escudo - $</option>
                                <option value="KYD">KYD - Cayman Islands Dollar - $</option>
                                <option value="XOF">XOF - CFA Franc BCEAO - CFA</option>
                                <option value="XAF">XAF - CFA Franc BEAC - FCFA</option>
                                <option value="XPF">XPF - CFP Franc - ???</option>
                                <option value="CLP">CLP - Chilean Peso - $</option>
                                <option value="CNY">CNY - Chinese Yuan - ??</option>
                                <option value="COP">COP - Colombian Peso - $</option>
                                <option value="KMF">KMF - Comorian Franc - CF</option>
                                <option value="CDF">CDF - Congolese Franc - FC</option>
                                <option value="CRC">CRC - Costa Rican Col????n - ???</option>
                                <option value="HRK">HRK - Croatian Kuna - kn</option>
                                <option value="CUC">CUC - Cuban Convertible Peso - $, CUC</option>
                                <option value="CZK">CZK - Czech Republic Koruna - K??</option>
                                <option value="DKK">DKK - Danish Krone - Kr.</option>
                                <option value="DJF">DJF - Djiboutian Franc - Fdj</option>
                                <option value="DOP">DOP - Dominican Peso - $</option>
                                <option value="XCD">XCD - East Caribbean Dollar - $</option>
                                <option value="EGP">EGP - Egyptian Pound - ??.??</option>
                                <option value="ERN">ERN - Eritrean Nakfa - Nfk</option>
                                <option value="EEK">EEK - Estonian Kroon - kr</option>
                                <option value="ETB">ETB - Ethiopian Birr - Nkf</option>
                                <option value="EUR">EUR - Euro - ???</option>
                                <option value="FKP">FKP - Falkland Islands Pound - ??</option>
                                <option value="FJD">FJD - Fijian Dollar - FJ$</option>
                                <option value="GMD">GMD - Gambian Dalasi - D</option>
                                <option value="GEL">GEL - Georgian Lari - ???</option>
                                <option value="DEM">DEM - German Mark - DM</option>
                                <option value="GHS">GHS - Ghanaian Cedi - GH???</option>
                                <option value="GIP">GIP - Gibraltar Pound - ??</option>
                                <option value="GRD">GRD - Greek Drachma - ???, ??????, ????</option>
                                <option value="GTQ">GTQ - Guatemalan Quetzal - Q</option>
                                <option value="GNF">GNF - Guinean Franc - FG</option>
                                <option value="GYD">GYD - Guyanaese Dollar - $</option>
                                <option value="HTG">HTG - Haitian Gourde - G</option>
                                <option value="HNL">HNL - Honduran Lempira - L</option>
                                <option value="HKD">HKD - Hong Kong Dollar - $</option>
                                <option value="HUF">HUF - Hungarian Forint - Ft</option>
                                <option value="ISK">ISK - Icelandic Kr????na - kr</option>
                                <option value="INR">INR - Indian Rupee - ???</option>
                                <option value="IDR">IDR - Indonesian Rupiah - Rp</option>
                                <option value="IRR">IRR - Iranian Rial - ???</option>
                                <option value="IQD">IQD - Iraqi Dinar - ??.??</option>
                                <option value="ILS">ILS - Israeli New Sheqel - ???</option>
                                <option value="ITL">ITL - Italian Lira - L,??</option>
                                <option value="JMD">JMD - Jamaican Dollar - J$</option>
                                <option value="JPY">JPY - Japanese Yen - ??</option>
                                <option value="JOD">JOD - Jordanian Dinar - ??.??</option>
                                <option value="KZT">KZT - Kazakhstani Tenge - ????</option>
                                <option value="KES">KES - Kenyan Shilling - KSh</option>
                                <option value="KWD">KWD - Kuwaiti Dinar - ??.??</option>
                                <option value="KGS">KGS - Kyrgystani Som - ????</option>
                                <option value="LAK">LAK - Laotian Kip - ???</option>
                                <option value="LVL">LVL - Latvian Lats - Ls</option>
                                <option value="LBP">LBP - Lebanese Pound - ??</option>
                                <option value="LSL">LSL - Lesotho Loti - L</option>
                                <option value="LRD">LRD - Liberian Dollar - $</option>
                                <option value="LYD">LYD - Libyan Dinar - ??.??</option>
                                <option value="LTL">LTL - Lithuanian Litas - Lt</option>
                                <option value="MOP">MOP - Macanese Pataca - $</option>
                                <option value="MKD">MKD - Macedonian Denar - ??????</option>
                                <option value="MGA">MGA - Malagasy Ariary - Ar</option>
                                <option value="MWK">MWK - Malawian Kwacha - MK</option>
                                <option value="MYR">MYR - Malaysian Ringgit - RM</option>
                                <option value="MVR">MVR - Maldivian Rufiyaa - Rf</option>
                                <option value="MRO">MRO - Mauritanian Ouguiya - MRU</option>
                                <option value="MUR">MUR - Mauritian Rupee - ???</option>
                                <option value="MXN">MXN - Mexican Peso - $</option>
                                <option value="MDL">MDL - Moldovan Leu - L</option>
                                <option value="MNT">MNT - Mongolian Tugrik - ???</option>
                                <option value="MAD">MAD - Moroccan Dirham - MAD</option>
                                <option value="MZM">MZM - Mozambican Metical - MT</option>
                                <option value="MMK">MMK - Myanmar Kyat - K</option>
                                <option value="NAD">NAD - Namibian Dollar - $</option>
                                <option value="NPR">NPR - Nepalese Rupee - ???</option>
                                <option value="ANG">ANG - Netherlands Antillean Guilder - ??</option>
                                <option value="TWD">TWD - New Taiwan Dollar - $</option>
                                <option value="NZD">NZD - New Zealand Dollar - $</option>
                                <option value="NIO">NIO - Nicaraguan C????rdoba - C$</option>
                                <option value="NGN">NGN - Nigerian Naira - ???</option>
                                <option value="KPW">KPW - North Korean Won - ???</option>
                                <option value="NOK">NOK - Norwegian Krone - kr</option>
                                <option value="OMR">OMR - Omani Rial - .??.??</option>
                                <option value="PKR">PKR - Pakistani Rupee - ???</option>
                                <option value="PAB">PAB - Panamanian Balboa - B/.</option>
                                <option value="PGK">PGK - Papua New Guinean Kina - K</option>
                                <option value="PYG">PYG - Paraguayan Guarani - ???</option>
                                <option value="PEN">PEN - Peruvian Nuevo Sol - S/.</option>
                                <option value="PHP">PHP - Philippine Peso - ???</option>
                                <option value="PLN">PLN - Polish Zloty - z??</option>
                                <option value="QAR">QAR - Qatari Rial - ??.??</option>
                                <option value="RON">RON - Romanian Leu - lei</option>
                                <option value="RUB">RUB - Russian Ruble - ???</option>
                                <option value="RWF">RWF - Rwandan Franc - FRw</option>
                                <option value="SVC">SVC - Salvadoran Col????n - ???</option>
                                <option value="WST">WST - Samoan Tala - SAT</option>
                                <option value="SAR">SAR - Saudi Riyal - ???</option>
                                <option value="RSD">RSD - Serbian Dinar - din</option>
                                <option value="SCR">SCR - Seychellois Rupee - SRe</option>
                                <option value="SLL">SLL - Sierra Leonean Leone - Le</option>
                                <option value="SGD">SGD - Singapore Dollar - $</option>
                                <option value="SKK">SKK - Slovak Koruna - Sk</option>
                                <option value="SBD">SBD - Solomon Islands Dollar - Si$</option>
                                <option value="SOS">SOS - Somali Shilling - Sh.so.</option>
                                <option value="ZAR">ZAR - South African Rand - R</option>
                                <option value="KRW">KRW - South Korean Won - ???</option>
                                <option value="XDR">XDR - Special Drawing Rights - SDR</option>
                                <option value="LKR">LKR - Sri Lankan Rupee - Rs</option>
                                <option value="SHP">SHP - St. Helena Pound - ??</option>
                                <option value="SDG">SDG - Sudanese Pound - .??.??</option>
                                <option value="SRD">SRD - Surinamese Dollar - $</option>
                                <option value="SZL">SZL - Swazi Lilangeni - E</option>
                                <option value="SEK">SEK - Swedish Krona - kr</option>
                                <option value="CHF">CHF - Swiss Franc - CHf</option>
                                <option value="SYP">SYP - Syrian Pound - LS</option>
                                <option value="STD">STD - S??o Tom?? and Pr??ncipe Dobra - Db</option>
                                <option value="TJS">TJS - Tajikistani Somoni - SM</option>
                                <option value="TZS">TZS - Tanzanian Shilling - TSh</option>
                                <option value="THB">THB - Thai Baht - ???</option>
                                <option value="TOP">TOP - Tongan pa'anga - $</option>
                                <option value="TTD">TTD - Trinidad & Tobago Dollar - $</option>
                                <option value="TND">TND - Tunisian Dinar - ??.??</option>
                                <option value="TRY">TRY - Turkish Lira - ???</option>
                                <option value="TMT">TMT - Turkmenistani Manat - T</option>
                                <option value="UGX">UGX - Ugandan Shilling - USh</option>
                                <option value="UAH">UAH - Ukrainian Hryvnia - ???</option>
                                <option value="AED">AED - United Arab Emirates Dirham - ??.??</option>
                                <option value="UYU">UYU - Uruguayan Peso - $</option>
                                <option value="USD">USD - US Dollar - $</option>
                                <option value="UZS">UZS - Uzbekistan Som - ????</option>
                                <option value="VUV">VUV - Vanuatu Vatu - VT</option>
                                <option value="VEF">VEF - Venezuelan Bol????var - Bs</option>
                                <option value="VND">VND - Vietnamese Dong - ???</option>
                                <option value="YER">YER - Yemeni Rial - ???</option>
                                <option value="ZMK">ZMK - Zambian Kwacha - ZK</option>
                                    </select>
                                        <button className="btn yellow darken-2 z-depth-0" onClick={onclickChangeCurrencyBtn}>Change</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* //Create Post Modal */}
                <div id="modal-createpost" className="modal rounded-lg">
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
                                <input type="file" className='post-image' accept='image/x-png,image/gif,image/jpeg'/>
                            </div>
                            <div className="input-field">
                                <input type="text" id='condition'/>
                                <label htmlFor="condition">Card Condition</label>
                            </div>
                            <button className='btn yellow darken-2 z-depth-0' onClick={createPost}>Post</button>
                        </form>
                    </div>
                </div>
                {/* Search modal */}
                <div id="modal-search" className="modal rounded-lg">
                    <div className="modal-content">
                        <h1 className='grid place-items-center my-10 w-full'>
                            <span className='text-lg'>Search</span>
                        </h1>
                        <div className="lg:mx-32 md:mx-16 sm:mx-10 ">
                            <SearchBar placeholder='Find Cards...' />
                        </div>
                    </div>
                </div>
            </>
            <>
                {/* //Sign Up Modal */}
                <div id="modal-signup" className='modal rounded-lg'>
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
                                <input type="file" className='post-image' accept='image/x-png,image/gif,image/jpeg'/>
                            </div>
                            <div className="input-field">
                                <select className="currency" name="currency">
                                <option>Select currency</option>
                                <option value="AFN">AFN - Afghan Afghani - ??</option>
                                <option value="ALL">ALL - Albanian Lek - Lek</option>
                                <option value="DZD">DZD - Algerian Dinar - ????</option>
                                <option value="AOA">AOA - Angolan Kwanza - Kz</option>
                                <option value="ARS">ARS - Argentine Peso - $</option>
                                <option value="AMD">AMD - Armenian Dram - ??</option>
                                <option value="AWG">AWG - Aruban Florin - ??</option>
                                <option value="AUD">AUD - Australian Dollar - $</option>
                                <option value="AZN">AZN - Azerbaijani Manat - m</option>
                                <option value="BSD">BSD - Bahamian Dollar - B$</option>
                                <option value="BHD">BHD - Bahraini Dinar - .??.??</option>
                                <option value="BDT">BDT - Bangladeshi Taka - ???</option>
                                <option value="BBD">BBD - Barbadian Dollar - Bds$</option>
                                <option value="BYR">BYR - Belarusian Ruble - Br</option>
                                <option value="BEF">BEF - Belgian Franc - fr</option>
                                <option value="BZD">BZD - Belize Dollar - $</option>
                                <option value="BMD">BMD - Bermudan Dollar - $</option>
                                <option value="BTN">BTN - Bhutanese Ngultrum - Nu.</option>
                                <option value="BTC">BTC - Bitcoin - ???</option>
                                <option value="BOB">BOB - Bolivian Boliviano - Bs.</option>
                                <option value="BAM">BAM - Bosnia-Herzegovina Convertible Mark - KM</option>
                                <option value="BWP">BWP - Botswanan Pula - P</option>
                                <option value="BRL">BRL - Brazilian Real - R$</option>
                                <option value="GBP">GBP - British Pound Sterling - ??</option>
                                <option value="BND">BND - Brunei Dollar - B$</option>
                                <option value="BGN">BGN - Bulgarian Lev - ????.</option>
                                <option value="BIF">BIF - Burundian Franc - FBu</option>
                                <option value="KHR">KHR - Cambodian Riel - KHR</option>
                                <option value="CAD">CAD - Canadian Dollar - $</option>
                                <option value="CVE">CVE - Cape Verdean Escudo - $</option>
                                <option value="KYD">KYD - Cayman Islands Dollar - $</option>
                                <option value="XOF">XOF - CFA Franc BCEAO - CFA</option>
                                <option value="XAF">XAF - CFA Franc BEAC - FCFA</option>
                                <option value="XPF">XPF - CFP Franc - ???</option>
                                <option value="CLP">CLP - Chilean Peso - $</option>
                                <option value="CNY">CNY - Chinese Yuan - ??</option>
                                <option value="COP">COP - Colombian Peso - $</option>
                                <option value="KMF">KMF - Comorian Franc - CF</option>
                                <option value="CDF">CDF - Congolese Franc - FC</option>
                                <option value="CRC">CRC - Costa Rican Col????n - ???</option>
                                <option value="HRK">HRK - Croatian Kuna - kn</option>
                                <option value="CUC">CUC - Cuban Convertible Peso - $, CUC</option>
                                <option value="CZK">CZK - Czech Republic Koruna - K??</option>
                                <option value="DKK">DKK - Danish Krone - Kr.</option>
                                <option value="DJF">DJF - Djiboutian Franc - Fdj</option>
                                <option value="DOP">DOP - Dominican Peso - $</option>
                                <option value="XCD">XCD - East Caribbean Dollar - $</option>
                                <option value="EGP">EGP - Egyptian Pound - ??.??</option>
                                <option value="ERN">ERN - Eritrean Nakfa - Nfk</option>
                                <option value="EEK">EEK - Estonian Kroon - kr</option>
                                <option value="ETB">ETB - Ethiopian Birr - Nkf</option>
                                <option value="EUR">EUR - Euro - ???</option>
                                <option value="FKP">FKP - Falkland Islands Pound - ??</option>
                                <option value="FJD">FJD - Fijian Dollar - FJ$</option>
                                <option value="GMD">GMD - Gambian Dalasi - D</option>
                                <option value="GEL">GEL - Georgian Lari - ???</option>
                                <option value="DEM">DEM - German Mark - DM</option>
                                <option value="GHS">GHS - Ghanaian Cedi - GH???</option>
                                <option value="GIP">GIP - Gibraltar Pound - ??</option>
                                <option value="GRD">GRD - Greek Drachma - ???, ??????, ????</option>
                                <option value="GTQ">GTQ - Guatemalan Quetzal - Q</option>
                                <option value="GNF">GNF - Guinean Franc - FG</option>
                                <option value="GYD">GYD - Guyanaese Dollar - $</option>
                                <option value="HTG">HTG - Haitian Gourde - G</option>
                                <option value="HNL">HNL - Honduran Lempira - L</option>
                                <option value="HKD">HKD - Hong Kong Dollar - $</option>
                                <option value="HUF">HUF - Hungarian Forint - Ft</option>
                                <option value="ISK">ISK - Icelandic Kr????na - kr</option>
                                <option value="INR">INR - Indian Rupee - ???</option>
                                <option value="IDR">IDR - Indonesian Rupiah - Rp</option>
                                <option value="IRR">IRR - Iranian Rial - ???</option>
                                <option value="IQD">IQD - Iraqi Dinar - ??.??</option>
                                <option value="ILS">ILS - Israeli New Sheqel - ???</option>
                                <option value="ITL">ITL - Italian Lira - L,??</option>
                                <option value="JMD">JMD - Jamaican Dollar - J$</option>
                                <option value="JPY">JPY - Japanese Yen - ??</option>
                                <option value="JOD">JOD - Jordanian Dinar - ??.??</option>
                                <option value="KZT">KZT - Kazakhstani Tenge - ????</option>
                                <option value="KES">KES - Kenyan Shilling - KSh</option>
                                <option value="KWD">KWD - Kuwaiti Dinar - ??.??</option>
                                <option value="KGS">KGS - Kyrgystani Som - ????</option>
                                <option value="LAK">LAK - Laotian Kip - ???</option>
                                <option value="LVL">LVL - Latvian Lats - Ls</option>
                                <option value="LBP">LBP - Lebanese Pound - ??</option>
                                <option value="LSL">LSL - Lesotho Loti - L</option>
                                <option value="LRD">LRD - Liberian Dollar - $</option>
                                <option value="LYD">LYD - Libyan Dinar - ??.??</option>
                                <option value="LTL">LTL - Lithuanian Litas - Lt</option>
                                <option value="MOP">MOP - Macanese Pataca - $</option>
                                <option value="MKD">MKD - Macedonian Denar - ??????</option>
                                <option value="MGA">MGA - Malagasy Ariary - Ar</option>
                                <option value="MWK">MWK - Malawian Kwacha - MK</option>
                                <option value="MYR">MYR - Malaysian Ringgit - RM</option>
                                <option value="MVR">MVR - Maldivian Rufiyaa - Rf</option>
                                <option value="MRO">MRO - Mauritanian Ouguiya - MRU</option>
                                <option value="MUR">MUR - Mauritian Rupee - ???</option>
                                <option value="MXN">MXN - Mexican Peso - $</option>
                                <option value="MDL">MDL - Moldovan Leu - L</option>
                                <option value="MNT">MNT - Mongolian Tugrik - ???</option>
                                <option value="MAD">MAD - Moroccan Dirham - MAD</option>
                                <option value="MZM">MZM - Mozambican Metical - MT</option>
                                <option value="MMK">MMK - Myanmar Kyat - K</option>
                                <option value="NAD">NAD - Namibian Dollar - $</option>
                                <option value="NPR">NPR - Nepalese Rupee - ???</option>
                                <option value="ANG">ANG - Netherlands Antillean Guilder - ??</option>
                                <option value="TWD">TWD - New Taiwan Dollar - $</option>
                                <option value="NZD">NZD - New Zealand Dollar - $</option>
                                <option value="NIO">NIO - Nicaraguan C????rdoba - C$</option>
                                <option value="NGN">NGN - Nigerian Naira - ???</option>
                                <option value="KPW">KPW - North Korean Won - ???</option>
                                <option value="NOK">NOK - Norwegian Krone - kr</option>
                                <option value="OMR">OMR - Omani Rial - .??.??</option>
                                <option value="PKR">PKR - Pakistani Rupee - ???</option>
                                <option value="PAB">PAB - Panamanian Balboa - B/.</option>
                                <option value="PGK">PGK - Papua New Guinean Kina - K</option>
                                <option value="PYG">PYG - Paraguayan Guarani - ???</option>
                                <option value="PEN">PEN - Peruvian Nuevo Sol - S/.</option>
                                <option value="PHP">PHP - Philippine Peso - ???</option>
                                <option value="PLN">PLN - Polish Zloty - z??</option>
                                <option value="QAR">QAR - Qatari Rial - ??.??</option>
                                <option value="RON">RON - Romanian Leu - lei</option>
                                <option value="RUB">RUB - Russian Ruble - ???</option>
                                <option value="RWF">RWF - Rwandan Franc - FRw</option>
                                <option value="SVC">SVC - Salvadoran Col????n - ???</option>
                                <option value="WST">WST - Samoan Tala - SAT</option>
                                <option value="SAR">SAR - Saudi Riyal - ???</option>
                                <option value="RSD">RSD - Serbian Dinar - din</option>
                                <option value="SCR">SCR - Seychellois Rupee - SRe</option>
                                <option value="SLL">SLL - Sierra Leonean Leone - Le</option>
                                <option value="SGD">SGD - Singapore Dollar - $</option>
                                <option value="SKK">SKK - Slovak Koruna - Sk</option>
                                <option value="SBD">SBD - Solomon Islands Dollar - Si$</option>
                                <option value="SOS">SOS - Somali Shilling - Sh.so.</option>
                                <option value="ZAR">ZAR - South African Rand - R</option>
                                <option value="KRW">KRW - South Korean Won - ???</option>
                                <option value="XDR">XDR - Special Drawing Rights - SDR</option>
                                <option value="LKR">LKR - Sri Lankan Rupee - Rs</option>
                                <option value="SHP">SHP - St. Helena Pound - ??</option>
                                <option value="SDG">SDG - Sudanese Pound - .??.??</option>
                                <option value="SRD">SRD - Surinamese Dollar - $</option>
                                <option value="SZL">SZL - Swazi Lilangeni - E</option>
                                <option value="SEK">SEK - Swedish Krona - kr</option>
                                <option value="CHF">CHF - Swiss Franc - CHf</option>
                                <option value="SYP">SYP - Syrian Pound - LS</option>
                                <option value="STD">STD - S??o Tom?? and Pr??ncipe Dobra - Db</option>
                                <option value="TJS">TJS - Tajikistani Somoni - SM</option>
                                <option value="TZS">TZS - Tanzanian Shilling - TSh</option>
                                <option value="THB">THB - Thai Baht - ???</option>
                                <option value="TOP">TOP - Tongan pa'anga - $</option>
                                <option value="TTD">TTD - Trinidad & Tobago Dollar - $</option>
                                <option value="TND">TND - Tunisian Dinar - ??.??</option>
                                <option value="TRY">TRY - Turkish Lira - ???</option>
                                <option value="TMT">TMT - Turkmenistani Manat - T</option>
                                <option value="UGX">UGX - Ugandan Shilling - USh</option>
                                <option value="UAH">UAH - Ukrainian Hryvnia - ???</option>
                                <option value="AED">AED - United Arab Emirates Dirham - ??.??</option>
                                <option value="UYU">UYU - Uruguayan Peso - $</option>
                                <option value="USD">USD - US Dollar - $</option>
                                <option value="UZS">UZS - Uzbekistan Som - ????</option>
                                <option value="VUV">VUV - Vanuatu Vatu - VT</option>
                                <option value="VEF">VEF - Venezuelan Bol????var - Bs</option>
                                <option value="VND">VND - Vietnamese Dong - ???</option>
                                <option value="YER">YER - Yemeni Rial - ???</option>
                                <option value="ZMK">ZMK - Zambian Kwacha - ZK</option>
                                </select>
                            </div>
                            <button type='submit' className="btn yellow darken-2 z-depth-0 center-align waves-effect waves-green" onClick={signUp}>Sign up</button>
                            <p className="error pink-text center-align"></p>
                        </form>
                    </div>
                </div>
                {/* //Login Modal */}
                <div id="modal-login" className="modal rounded-lg">
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
                                                <input type="email" id='forgot-password-email 1' />
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
            </>
        </React.Fragment>
    )
}

export default Modals


