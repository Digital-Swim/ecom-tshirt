import { useState } from "react";

export default function useInput(initialVal){

    const [val, setVAlue] = useState(initialVal)

    return [

        { value: val, onchange:e => setVAlue(e.target.value)}, 

        () => setVAlue()

    ]

}