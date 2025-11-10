import { useEffect, useMemo, useState } from "react";




const useForceRender = () => {
    const [, force] = useState()
    useEffect(() => {
        window.addEventListener("keydown", force)
        return () => window.removeEventListener("keydown", force)
    }, [])
}

export default function Checkbox({ children = "" }) {
    useForceRender()

    const words = useMemo(() => children.split(" "), [children]);
    const fn = () => {
        console.log("hello")
    }

    const [val, set] = useState("");
    const [phrase, setPhrase] = useState("example phrase");
    const [count, setCount] = useState(0)
    const createPhrase = () => {
        setPhrase(val);
        set("");
    };

    useEffect(() => {
        console.log(`fresh render, function`);
        fn()
    }, [fn])


    useEffect(() => {
        console.log(`fresh render`);
    }, [words]);

    useEffect(() => {
        console.log(`typing "${val}"`);
    }, [val]);

    useEffect(() => {
        console.log(`saved phrase: "${phrase}"`);
    }, [phrase]);

    return (
        <>
            <label>Favorite phrase:</label>
            <input
                value={val}
                placeholder={phrase}
                onChange={e => set(e.target.value)}
            />
            <button onClick={createPhrase}>send</button>
            <p>{count}</p>
        </>
    )
}