import { useState } from "react";

export function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3> Waht do you need for your 😎 trip?</h3>
      <select
        onChange={(e) => setQuantity(Number(e.target.value))}
        value={quantity}
      >
        {
          /*Array.from({ lenght: 20 } , (_, i) => i + 1)  NOT working*/
          /*Array.from([1, 2, 3, 4, 5, 6, 7], (_, i) => i + 1) working but whats the point*/ [
            1, 2, 3, 4, 5, 6, 7, 8,
          ].map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))
        }
        {/*<option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>*/}
      </select>
      <input
        type="text"
        placeholder="Item.."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button> Add</button>
    </form>
  );
}
