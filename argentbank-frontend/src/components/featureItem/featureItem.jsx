import "./featureItem.scss";

function FeatureItem({ icon, title, children }) {
  return (
    <div className="feature-item">
      <img src={icon} alt={title} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{children}</p>
    </div>
  );
}

export default FeatureItem;
