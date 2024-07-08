function ErrorMessage({ Error }) {
  return (
    <div className="AllMovieListContainer d-flex justify-content-center align-items-center">
      <p className="loading_text">💀{Error}</p>
    </div>
  );
}

export default ErrorMessage;
