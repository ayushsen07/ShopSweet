function SweetList({ sweets, onPurchase }) {
  return (
    <div>
      <h3>Sweets</h3>
      <ul>
        {sweets.map((s) => (
          <li key={s._id}>
            {s.name} - {s.category} - ₹{s.price} - Qty: {s.quantity}{" "}
            <button
              disabled={s.quantity === 0}
              onClick={() => onPurchase(s._id)}
            >
              {s.quantity === 0 ? "Out of stock" : "Purchase 1"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SweetList;
