export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="error-message" role="alert">
      <strong>We could not load this section.</strong>
      <span>{message}</span>
    </div>
  );
}
