//useState() allows for a variable to be defiened, changed and
//used later. The entire component will update when this state 
//changed without use of other hooks like useMemo()


//useEffect() allows for the user to run lines of code 
//whenever the component is mounted, updated, or unmounted.
//useEffect can be conditionally called to the change of a 
//certain state or states.


//useMemo() caches a function so that i will only be updated 
//when a certain state or states changes. When using 
//useEffect() for certain states that are object types, 
//wrap them in useMemo() to be able to use them due to 
//referential inequality


//useRef() is very simmilar to useState() but it
//does not rerender the component and returns an
//object. EX: const refCount = useRef(0) returns
// { current: 0 }. We can use useRef() variables
//in useEffects without causing an infinite
//loop

