import StarRating from "./StartRating";
import { FaTrash } from "react-icons/fa";

const Color = ({ id, title, color, rating, onRemove = f => f }) => {
    return (
        <section>
            <h1>{title}</h1>
            <button onClick={() => onRemove(id)}>
                <FaTrash />
            </button>
            <div style={{ height: 50, backgroundColor: color }} />
            <StarRating selectedStars={rating} ></StarRating>
        </section>
    )
}

export default function ColorList({ colors = [], onRemoveColor = f => f }) {
    if (!colors.length) return <div>No Colors Listed.</div>;
    return (
        <div>
            {
                colors.map(color => <Color key={color.id} {...color} onRemove={onRemoveColor} />)
            }
        </div>
    );
}