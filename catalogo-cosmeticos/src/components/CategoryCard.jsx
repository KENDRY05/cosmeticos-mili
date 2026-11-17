import "./CategoryCard.css";

function CategoryCard({ categoria }) {
  return (
    <article className="categoria-card">
      <h3>{categoria.nombre}</h3>
    </article>
  );
}

export default CategoryCard;