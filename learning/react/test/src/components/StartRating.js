import { FaStar } from "react-icons/fa";

const Star = ({ selected = false, onSelect = f => f }) => (
    <FaStar color={selected ? "red" : "grey"} onClick={onSelect} />
);
const createArray = length => [...Array(length)]

export default function StarRating({ style = {}, totalStars = 5, selectedStars = 0 }) {
    return <>
        <div style={{ padding: '5px', ...style }} >
            {createArray(totalStars).map((n, i) => <Star key={i} selected={i < selectedStars} ></Star>)}
        </div>
        <p>
            {selectedStars} of {totalStars} stars
        </p>
    </>
}