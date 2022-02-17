import { Observer } from '@firebase/util'
import firebase from 'firebase/compat/app'

interface AuthProvider {
    providerId: string
  }

  interface MultiFactorUser {
    enrolledFactors: MultiFactorInfo[]
    enroll ( assertion :  MultiFactorAssertion ,  displayName ? :  string | null ) : Promise < void >
    getSession ( ) : Promise < any >
    unenroll ( option :  MultiFactorInfo | string ) : Promise < void >
  }

  interface MultiFactorInfo {
    displayName: string | null
    enrollmentTime: string
    factorId: string
    uid: string
  }

  interface MultiFactorAssertion {
    factorId: string
  }

  interface IdTokenResult {
    authTime: string
    claims: {}
    expirationTime: string
    issuedAtTime: string
    signInProvider: string | null
    signInSecondFactor: string | null
    token: string
  }

  interface UserInfo {
    displayName: string | null
    email: string | null
    phoneNumber: string | null
    photoURL: string | null
    providerId: string
    uid: string
  }

  interface AuthCredential {
    providerId: string
    signInMethod: string
    toJSON ( ) : Object
    fromJSON ( json :  Object | string ) : AuthCredential | null
  }

  interface UserMetadata {
    creationTime: string
    lastSignInTime: string
  }

  interface AdditionalUserInfo {
    isNewUser: boolean; profile: Object | null; providerId: string; username?: string | null
  }

  interface UserCredential {
    additionalUserInfo?: AdditionalUserInfo | null; credential: AuthCredential | null; operationType?: string | null; user: User | null
  }

  interface ApplicationVerifier {
    type: string
    verify ( ) : Promise < string >
  }

  interface ConfirmationResult {
    verificationId: string
    confirm ( verificationCode :  string ) : Promise < UserCredential >
  }

  interface ActionCodeSettings {
    android?: { installApp?: boolean; minimumVersion?: string; packageName: string }; dynamicLinkDomain?: string; handleCodeInApp?: boolean; iOS?: { bundleId: string }; url: string
  }

  interface Config {
    apiHost: string
    apiKey: string
    apiScheme: string
    authDomain?: string
    sdkClientVersion: string
    tokenApiHost: string
  }

  interface User {
    displayName: string | null
    email: string | null
    emailVerified: boolean
    isAnonymous: boolean
    metadata: UserMetadata
    multiFactor: MultiFactorUser
    phoneNumber: string | null
    photoURL: string | null
    providerData: UserInfo[]
    providerId: string
    refreshToken: string
    tenantId: string | null
    uid: string
    delete ( ) : Promise < void >
    getIdToken ( forceRefresh ? :  boolean ) : Promise < string >
    getIdTokenResult ( forceRefresh ? :  boolean ) : Promise < IdTokenResult >
    linkAndRetrieveDataWithCredential ( credential :  AuthCredential ) : Promise < UserCredential >
    linkWithCredential ( credential :  AuthCredential ) : Promise < UserCredential >
    linkWithPhoneNumber ( phoneNumber :  string ,  applicationVerifier :  ApplicationVerifier ) : Promise < ConfirmationResult >
    linkWithPopup ( provider :  AuthProvider ) : Promise < UserCredential >
    linkWithRedirect ( provider :  AuthProvider ) : Promise < void >
    reauthenticateAndRetrieveDataWithCredential ( credential :  AuthCredential ) : Promise < UserCredential >
    reauthenticateWithCredential ( credential :  AuthCredential ) : Promise < UserCredential >
    reauthenticateWithPhoneNumber ( phoneNumber :  string ,  applicationVerifier :  ApplicationVerifier ) : Promise < ConfirmationResult >
    reauthenticateWithPopup ( provider :  AuthProvider ) : Promise < UserCredential >
    reauthenticateWithRedirect ( provider :  AuthProvider ) : Promise < void >
    reload ( ) : Promise < void >
    sendEmailVerification ( actionCodeSettings ? :  ActionCodeSettings | null ) : Promise < void >
    toJSON ( ) : Object
    unlink ( providerId :  string ) : Promise < User >
    updateEmail ( newEmail :  string ) : Promise < void >
    updatePassword ( newPassword :  string ) : Promise < void >
    updatePhoneNumber ( phoneCredential :  AuthCredential ) : Promise < void >
    updateProfile ( profile :  { displayName ?: string | null ; photoURL ?: string | null } ) : Promise < void >
    verifyBeforeUpdateEmail ( newEmail :  string ,  actionCodeSettings ? :  ActionCodeSettings | null ) : Promise < void >

  }

  export interface firebaseAuth {

      config: Config
      applyActionCode ( code :  string ) : Promise < void >
      checkActionCode ( code :  string ) : Promise < any >
      confirmPasswordReset ( code :  string ,  newPassword :  string ) : Promise < void >
      createUserWithEmailAndPassword ( email :  string ,  password :  string ) : Promise < any >
      fetchSignInMethodsForEmail ( email :  string ) : Promise < Array < string > >
      getRedirectResult ( ) : Promise < any >
      isSignInWithEmailLink ( emailLink :  string ) : boolean
      sendPasswordResetEmail ( email :  string ) : Promise < void >
      onAuthStateChanged ( nextOrany :  any  | ( ( a :  any | null ) => any ) ,  error ? :  ( a :  Error ) => any ,  completed ? :  firebase.Unsubscribe ) : firebase.Unsubscribe
      onIdTokenChanged ( nextOrObserver :  Observer < any > | ( ( a :  User | null ) => any ) ,  error ? :  ( a :  Error ) => any ,  completed ? :  firebase.Unsubscribe ) : firebase.Unsubscribe
      sendSignInLinkToEmail ( email :  string, actionCodeSetting:any ) : Promise < void >
      setPersistence ( persistence :  any ) : Promise < void >
      signInAndRetrieveDataWithCredential ( credential :  any ) : Promise < any >
      signInAnonymously ( ) : Promise < any >
      signInWithCustomToken ( token :  string ) : Promise < any >
      signInWithEmailAndPassword ( email :  string ,  password :  string ) : Promise < any >
      signInWithEmailLink ( email :  string ,  emailLink ? :  string ) : Promise < any >
      signInWithPhoneNumber ( phoneNumber :  string ,  applicationVerifier :  any ) : Promise < any >
      signInWithRedirect ( provider :  any ) : Promise < void >
      signOut ( ) : Promise < void >
      updateCurrentUser ( user :  any | null ) : Promise < void >
      useEmulator ( url :  string ) : void
      verifyPasswordResetCode ( code :  string ) : Promise < string >
      useDeviceLanguage ( ) : void
      currentUser: any,
      app: any,
      emulatorConfig: any | null
      languageCode: string | null
      name: string
      settings: any
      tenantId: string | null

  }